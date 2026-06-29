import React from "react";
import { useListAuditLog } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";

export default function Security() {
  const { data: logs, isLoading } = useListAuditLog({ limit: 100 });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div><Skeleton className="h-8 w-48 mb-2" /><Skeleton className="h-4 w-96" /></div>
        <Skeleton className="h-[600px] rounded-xl w-full" />
      </div>
    );
  }

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'create': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'update': return 'text-accent bg-accent/10 border-accent/20';
      case 'delete': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'approve': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'reject': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-destructive">
          <ShieldAlert className="w-6 h-6" />
          Security & Audit
        </h2>
        <p className="text-muted-foreground mt-1">Immutable audit trail of all platform activities and access events.</p>
      </div>

      <Card className="border-border/50 bg-card/30 backdrop-blur overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-card/50 pb-4">
          <CardTitle className="text-lg">Event Log</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-card/50">
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="w-[180px] font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">Actor</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                  <TableHead className="font-semibold">Target</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs?.map((log) => (
                  <TableRow key={log.id} className="border-border/50 border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString(undefined, { 
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit', second: '2-digit'
                      })}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                          {log.actor.charAt(0).toUpperCase()}
                        </div>
                        {log.actor}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${getActionColor(log.action)}`}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">{log.target}</TableCell>
                    <TableCell className="text-sm text-foreground/80 max-w-[300px] truncate" title={log.detail}>
                      {log.detail}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
