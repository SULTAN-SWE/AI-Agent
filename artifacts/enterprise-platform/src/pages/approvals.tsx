import React from "react";
import { useListApprovals, useDecideApproval, getListApprovalsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Clock } from "lucide-react";

export default function Approvals() {
  const queryClient = useQueryClient();
  const { data: pending, isLoading: loadingPending } = useListApprovals({ status: 'pending' });
  const { data: decided, isLoading: loadingDecided } = useListApprovals({ status: 'decided' });
  
  const decideMutation = useDecideApproval();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedApprovalId, setSelectedApprovalId] = React.useState<number | null>(null);
  const [decisionType, setDecisionType] = React.useState<'approve' | 'reject'>('approve');
  const [note, setNote] = React.useState("");

  const handleOpenDialog = (id: number, type: 'approve' | 'reject') => {
    setSelectedApprovalId(id);
    setDecisionType(type);
    setNote("");
    setDialogOpen(true);
  };

  const submitDecision = async () => {
    if (!selectedApprovalId) return;
    
    try {
      await decideMutation.mutateAsync({
        id: selectedApprovalId,
        data: { decision: decisionType, note }
      });
      
      toast({ 
        title: `Approval ${decisionType === 'approve' ? 'Granted' : 'Rejected'}`,
      });
      
      queryClient.invalidateQueries({ queryKey: getListApprovalsQueryKey() });
      setDialogOpen(false);
    } catch (err) {
      toast({ title: "Action Failed", variant: "destructive" });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20">Approved</Badge>;
      case 'rejected': return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">Rejected</Badge>;
      default: return <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Approval Center</h2>
        <p className="text-muted-foreground mt-1">Review and manage cross-departmental requests requiring authorization.</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 bg-card border border-border/50">
          <TabsTrigger value="pending">Pending Action</TabsTrigger>
          <TabsTrigger value="decided">Decided</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          {loadingPending ? (
            <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}</div>
          ) : pending?.length === 0 ? (
            <div className="text-center py-12 bg-card/30 rounded-xl border border-border/50 border-dashed">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">All caught up</h3>
              <p className="text-muted-foreground">No pending approvals require your attention.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending?.map(approval => (
                <Card key={approval.id} className="border-border/50 bg-card/60 backdrop-blur">
                  <CardContent className="p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-background/50 text-[10px] uppercase tracking-wider">{approval.requestModule}</Badge>
                        <span className="text-xs text-muted-foreground">{new Date(approval.createdAt).toLocaleString()}</span>
                      </div>
                      <h4 className="font-semibold">{approval.requestTitle}</h4>
                      <p className="text-sm text-muted-foreground">Role required: <span className="capitalize">{approval.approverRole}</span></p>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                      <Button 
                        variant="outline" 
                        className="w-full md:w-auto text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                        onClick={() => handleOpenDialog(approval.id, 'reject')}
                      >
                        <X className="w-4 h-4 mr-1.5" /> Reject
                      </Button>
                      <Button 
                        className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleOpenDialog(approval.id, 'approve')}
                      >
                        <Check className="w-4 h-4 mr-1.5" /> Approve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="decided" className="mt-6">
          {loadingDecided ? (
            <div className="space-y-4">{[1,2].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}</div>
          ) : decided?.length === 0 ? (
            <div className="text-center py-12 bg-card/30 rounded-xl border border-border/50 border-dashed">
              <p className="text-muted-foreground">No decided approvals found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {decided?.map(approval => (
                <Card key={approval.id} className="border-border/50 bg-card/40 opacity-80">
                  <CardContent className="p-5 flex flex-col md:flex-row gap-4 items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(approval.status)}
                        <Badge variant="outline" className="bg-transparent text-[10px] uppercase tracking-wider">{approval.requestModule}</Badge>
                      </div>
                      <h4 className="font-medium text-foreground/80">{approval.requestTitle}</h4>
                      {approval.decisionNote && (
                        <p className="text-sm text-muted-foreground italic mt-2 border-l-2 border-border pl-3 py-1">"{approval.decisionNote}"</p>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0 text-right">
                      Decided: {approval.decidedAt ? new Date(approval.decidedAt).toLocaleString() : 'N/A'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border/50">
          <DialogHeader>
            <DialogTitle>{decisionType === 'approve' ? 'Approve Request' : 'Reject Request'}</DialogTitle>
            <DialogDescription>
              You can optionally provide a note explaining your decision.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea 
              placeholder="Add a note (optional)..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={decideMutation.isPending}>Cancel</Button>
            <Button 
              onClick={submitDecision} 
              disabled={decideMutation.isPending}
              className={decisionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-destructive hover:bg-destructive/90 text-white'}
            >
              {decideMutation.isPending ? "Saving..." : "Confirm Decision"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
