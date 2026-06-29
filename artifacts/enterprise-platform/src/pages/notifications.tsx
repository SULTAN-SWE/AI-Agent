import React from "react";
import { useListNotifications, useMarkNotificationRead } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, BellOff, CheckCheck, AlertTriangle, Info, Zap } from "lucide-react";

const severityIcon = (s: string) => {
  if (s === "critical") return <AlertTriangle className="w-4 h-4 text-destructive" />;
  if (s === "warning") return <AlertTriangle className="w-4 h-4 text-accent" />;
  return <Info className="w-4 h-4 text-primary" />;
};

const severityClass = (s: string) => {
  if (s === "critical") return "border-destructive/30 bg-destructive/5";
  if (s === "warning") return "border-accent/30 bg-accent/5";
  return "border-primary/20 bg-primary/5";
};

export default function Notifications() {
  const { data: notifications, isLoading, refetch } = useListNotifications();
  const markRead = useMarkNotificationRead();

  const unread = notifications?.filter(n => n.status === "unread") ?? [];
  const read = notifications?.filter(n => n.status !== "unread") ?? [];

  const handleMarkRead = (id: number) => {
    markRead.mutate({ id } as any, { onSuccess: () => refetch() });
  };

  const handleMarkAll = () => {
    unread.forEach(n => markRead.mutate({ id: n.id } as any));
    setTimeout(() => refetch(), 500);
  };

  if (isLoading) return (
    <div className="space-y-4">
      {[1,2,3,4].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            Notification Center
          </h2>
          <p className="text-muted-foreground">Reminders, escalations, and system alerts</p>
        </div>
        {unread.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAll} className="gap-2">
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </Button>
        )}
      </div>

      {unread.length > 0 && (
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              Unread <Badge className="ml-1 bg-accent text-accent-foreground">{unread.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {unread.map(n => (
              <div key={n.id} className={`flex items-start gap-4 p-4 rounded-lg border ${severityClass(n.severity ?? "info")}`}>
                {severityIcon(n.severity ?? "info")}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm">{n.title}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="outline" className="text-[10px] capitalize">{n.channel}</Badge>
                    <button
                      onClick={() => handleMarkRead(n.id)}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark as read
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-muted-foreground flex items-center gap-2">
            <BellOff className="w-4 h-4" /> Read
          </CardTitle>
          <CardDescription>Previously acknowledged notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {read.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No read notifications yet.</p>
          ) : (
            read.map(n => (
              <div key={n.id} className="flex items-start gap-4 p-4 rounded-lg border border-border/30 bg-muted/20 opacity-60">
                {severityIcon(n.severity ?? "info")}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-sm">{n.title}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
