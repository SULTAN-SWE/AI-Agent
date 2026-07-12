import { useState } from "react";

import {
  MoreVertical,
  Eye,
  Pencil,
  Users,
  Bot,
  Shield,
  Trash2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useLanguage } from "@/lib/language-context";

export default function GroupsPage() {

const { t } = useLanguage();
type Group = {
  id: string;
  name: string;
  type: string;
  manager: string;
  members: number;
  aiAgents: string[];
  aiWorkspaceAccess: string[];
  status: string;
};

const [groups, setGroups] = useState<Group[]>([
  {
    id: "GRP-001",
    name: "Executive Leadership",
    type: "Executive",
    manager: "John Doe",
    members: 8,
    aiAgents: [
      "Executive Agent",
      "Finance Agent",
    ],
    aiWorkspaceAccess: [
      "Executive AI",
      "Finance AI",
    ],
    status: t.Active,
  },
   

  {
    id: "GRP-002",
    name: "Human Resources",
    type: "Department",
    manager: "Sarah Ahmed",
    members: 24,
    aiAgents: [
      "HR Agent",
    ],
    aiWorkspaceAccess: [
      "HR AI",
      "Knowledge AI",
    ],
    status: t.Active,
  },

  {
    id: "GRP-003",
    name: "IT Operations",
    type: "Department",
    manager: "Michael Brown",
    members: 17,
    aiAgents: [
      "IT Agent",
      "Security Agent",
    ],
    aiWorkspaceAccess: [
      "IT AI",
      "Security AI",
    ],
    status: t.Active,
  },
]);

const [search, setSearch] = useState("");

const [typeFilter, setTypeFilter] = useState("");

const [statusFilter, setStatusFilter] = useState("");

const [viewOpen, setViewOpen] = useState(false);

const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
console.log("🔥🔥🔥 GROUPS PAGE RENDERED 🔥🔥🔥");


  return (

    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">

          {t.GroupManagement}

        </h1>

        <p className="text-muted-foreground mt-2">

          {t.GroupManagementDescription}

        </p>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card>

        <CardContent className="p-6">

            <p className="text-sm text-muted-foreground">

            {t.TotalGroups}

            </p>

            <h2 className="text-3xl font-bold mt-2">

            {groups.length}

            </h2>

        </CardContent>

        </Card>

        <Card>

        <CardContent className="p-6">

            <p className="text-sm text-muted-foreground">

            {t.ActiveGroups}

            </p>

            <h2 className="text-3xl font-bold mt-2 text-emerald-500">

            {groups.filter(group => group.status === t.Active).length}

            </h2>

        </CardContent>

        </Card>

        <Card>

        <CardContent className="p-6">

            <p className="text-sm text-muted-foreground">

            {t.AIGroups}

            </p>

            <h2 className="text-3xl font-bold mt-2">

            {
                groups.filter(
                group => group.aiAgents.length > 0
                ).length
            }

            </h2>

        </CardContent>

        </Card>

        <Card>

        <CardContent className="p-6">

            <p className="text-sm text-muted-foreground">

            {t.TotalMembers}

            </p>

            <h2 className="text-3xl font-bold mt-2">

            {
                groups.reduce(
                (total, group) => total + group.members,
                0
                )
            }

            </h2>

        </CardContent>

        </Card>

      </div>

      <Card className="border-border bg-card">

        <CardContent className="p-5">

          <div className="flex flex-col xl:flex-row gap-4">

            <input
              className="flex-1 rounded-lg border border-border bg-background p-3"
              placeholder={t.SearchGroups}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="rounded-lg border border-border bg-background px-4 py-3"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >

              <option value="">
                {t.GroupType}
              </option>

              <option value="Executive">
                {t.ExecutiveGroup}
              </option>

              <option value="Department">
                {t.DepartmentGroup}
              </option>

              <option value="Project">
                {t.ProjectGroup}
              </option>

              <option value="AI">
                {t.AIGroup}
              </option>

            </select>

            <select
              className="rounded-lg border border-border bg-background px-4 py-3"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >

              <option value="">
                {t.Status}
              </option>

              <option value={t.Active}>
                {t.Active}
              </option>

              <option value={t.Disabled}>
                {t.Disabled}
              </option>

            </select>

            <button
              className="rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition"
            >

              {t.CreateGroup}

            </button>

          </div>

        </CardContent>

      </Card>

      <Card className="border-border bg-card">

  <CardContent className="p-0 overflow-x-auto">

    <table className="w-full">

      <thead className="border-b border-border bg-muted/40">

        <tr>

          <th className="p-4 w-12">

            <input type="checkbox" />

          </th>

          <th className="p-4 text-left">

            {t.Name}

          </th>

          <th className="p-4 text-left">

            {t.GroupType}

          </th>

          <th className="p-4 text-left">

            {t.TotalMembers}

          </th>

          <th className="p-4 text-left">

            {t.AssignedAIAgents}

          </th>

          <th className="p-4 text-left">

            {t.Manager}

          </th>

          <th className="p-4 text-left">

            {t.Status}

          </th>

          <th className="p-4 text-center">

            {t.Actions}

          </th>

        </tr>

      </thead>

      <tbody>

        {groups.map((group) => (

          <tr
            key={group.id}
            className="border-b border-border hover:bg-muted/30 transition"
          >

            <td className="p-4">

              <input type="checkbox" />

            </td>

            <td className="p-4">

              <div>

                <p className="font-medium">

                  {group.name}

                </p>

                <p className="text-xs text-muted-foreground">

                  {group.id}

                </p>

              </div>

            </td>

            <td className="p-4">

              <span className="rounded-lg bg-primary/10 text-primary px-3 py-1 text-xs">

                {group.type}

              </span>

            </td>

            <td className="p-4">

              {group.members}

            </td>

            <td className="p-4">

              <div className="flex flex-wrap gap-2">

                {group.aiAgents.map((agent) => (

                  <span
                    key={agent}
                    className="rounded-full bg-violet-500/10 text-violet-600 px-3 py-1 text-xs"
                  >

                    {agent}

                  </span>

                ))}

              </div>

            </td>

            <td className="p-4">

              {group.manager}

            </td>

            <td className="p-4">

              <span className="rounded-full bg-emerald-500/10 text-emerald-500 px-3 py-1 text-xs">

                {group.status}

              </span>

            </td>

            <td className="p-4 text-center">

  <DropdownMenu>

    <DropdownMenuTrigger asChild>

      <Button
        variant="ghost"
        size="icon"
      >

        <MoreVertical className="w-4 h-4" />

      </Button>

    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">

      <DropdownMenuItem
        onClick={() => {

          setSelectedGroup(groups.indexOf(group));

          setViewOpen(true);

        }}
      >

        <Eye className="w-4 h-4 mr-2" />

        {t.ViewGroup}

</DropdownMenuItem>

      <DropdownMenuItem>

        <Pencil className="w-4 h-4 mr-2" />

        {t.EditGroup}

      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem>

        <Users className="w-4 h-4 mr-2" />

        {t.ManageMembers}

      </DropdownMenuItem>

      <DropdownMenuItem>

        <Bot className="w-4 h-4 mr-2" />

        {t.ManageAIAgents}

      </DropdownMenuItem>

      <DropdownMenuItem>

        <Shield className="w-4 h-4 mr-2" />

        {t.ManagePermissions}

      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="text-red-500">

        <Trash2 className="w-4 h-4 mr-2" />

        {t.DeleteGroup}

      </DropdownMenuItem>

    </DropdownMenuContent>

  </DropdownMenu>

</td>

          </tr>

        ))}

      </tbody>

    </table>

  </CardContent>

</Card>

          <Dialog
        open={viewOpen}
        onOpenChange={setViewOpen}
      >

        <DialogContent className="max-w-3xl">

          <DialogHeader>

            <DialogTitle>

              {t.ViewGroup}

            </DialogTitle>

          </DialogHeader>

          {selectedGroup !== null && (

            <div className="space-y-6">

              <div>

                <h2 className="text-2xl font-bold">

                  {groups[selectedGroup].name}

                </h2>

                <p className="text-muted-foreground">

                  {groups[selectedGroup].id}

                </p>

              </div>

              <div className="grid grid-cols-2 gap-6">

  <div>

    <p className="text-sm text-muted-foreground">

      {t.GroupType}

    </p>

    <span className="rounded-lg bg-primary/10 text-primary px-3 py-1 text-xs">

      {groups[selectedGroup].type}

    </span>

  </div>

  <div>

    <p className="text-sm text-muted-foreground">

      {t.Manager}

    </p>

    <span className="rounded-lg bg-muted px-3 py-1 text-xs">

      {groups[selectedGroup].manager}

    </span>

  </div>

  <div>

    <p className="text-sm text-muted-foreground">

      {t.TotalMembers}

    </p>

    <span className="rounded-lg bg-muted px-3 py-1 text-xs">

      {groups[selectedGroup].members}

    </span>

  </div>

  <div>

    <p className="text-sm text-muted-foreground">

      {t.Status}

    </p>

    <span className="rounded-full bg-emerald-500/10 text-emerald-500 px-3 py-1 text-xs">

      {groups[selectedGroup].status}

    </span>

  </div>

  <div className="col-span-2">

    <p className="text-sm text-muted-foreground mb-2">

      {t.AssignedAIAgents}

    </p>

    <div className="flex flex-wrap gap-2">

      {groups[selectedGroup].aiAgents.map((agent) => (

        <span
          key={agent}
          className="rounded-full bg-violet-500/10 text-violet-600 px-3 py-1 text-xs"
        >

          {agent}

        </span>

      ))}

    </div>

  </div>

  <div className="col-span-2">

    <p className="text-sm text-muted-foreground mb-2">

      {t.AIWorkspaceAccess}

    </p>

    <div className="flex flex-wrap gap-2">

      {groups[selectedGroup].aiWorkspaceAccess.map((workspace) => (

        <span
          key={workspace}
          className="rounded-full bg-indigo-500/10 text-indigo-600 px-3 py-1 text-xs"
        >

          {workspace}

        </span>

      ))}

    </div>

  </div>

</div>

            </div>

          )}

        </DialogContent>

      </Dialog>

    </div>

  );

}