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
  description: string;
  type: string;
  manager: string;
  members: number;
  memberList: string[];
  aiAgents: string[];
  aiWorkspaceAccess: string[];
  permissions: string[];
  status: string;
};
const [groups, setGroups] = useState<Group[]>([
  {
    id: "GRP-001",
    name: "Executive Leadership",
    description: "Executive leadership team with strategic AI workspaces.",
    type: "Executive",
    manager: "John Doe",
    members: 8,
    memberList: [
  "John Doe",
  "Sarah Ahmed",
  "Michael Brown",
  "Emma Wilson",
  "David Smith",
  "James Lee",
  "Olivia Clark",
  "Sophia White",
],
    aiAgents: [
      "Executive Agent",
      "Finance Agent",
    ],
    aiWorkspaceAccess: [
      "Executive AI",
      "Finance AI",
    ],
    permissions: [
  "AI Workspace",
  "Knowledge",
  "Reports",
  "Approvals",
],
    status: t.Active,
  },
   

  {
    id: "GRP-002",
    name: "Human Resources",
    description: "Human resources department and employee operations.",
    type: "Department",
    manager: "Sarah Ahmed",
    members: 24,
    memberList: [
  "Sarah Ahmed",
  "Nora Ali",
  "Omar Hassan",
  "Mona Ibrahim",
],

    aiAgents: [
      "HR Agent",
    ],
    aiWorkspaceAccess: [
      "HR AI",
      "Knowledge AI",
    ],
    permissions: [
  "AI Workspace",
  "Knowledge",
],

    status: t.Active,
  },

  {
    id: "GRP-003",
    name: "IT Operations",
    description: "IT infrastructure, security and enterprise systems.",
    type: "Department",
    manager: "Michael Brown",
    members: 17,
    memberList: [
  "Michael Brown",
  "Adam Scott",
  "Daniel Green",
  "Robert Hall",
],

    aiAgents: [
      "IT Agent",
      "Security Agent",
    ],
    aiWorkspaceAccess: [
      "IT AI",
      "Security AI",
    ],
    permissions: [
  "AI Workspace",
  "Security",
  "Workflows",
],
    status: t.Active,
  },
]);

const [search, setSearch] = useState("");

const [typeFilter, setTypeFilter] = useState("");

const [statusFilter, setStatusFilter] = useState("");

const [viewOpen, setViewOpen] = useState(false);

const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

const [createOpen, setCreateOpen] = useState(false);

const [editOpen, setEditOpen] = useState(false);

const [editGroup, setEditGroup] = useState<Group>({
  id: "",
  name: "",
  description: "",
  type: "Department",
  manager: "",
  members: 0,
  memberList: [],
  aiAgents: [],
  aiWorkspaceAccess: [],
  permissions: [],
  status: t.Active,
});
const [newGroup, setNewGroup] = useState({
  name: "",
  description: "",
  type: "Department",
  manager: "",
  members: 0,
  memberList: [] as string[],
  aiAgents: [] as string[],
  aiWorkspaceAccess: [] as string[],
  permissions: [] as string[],
  status: t.Active,
});

const executiveGroups = groups.filter(
  (group) => group.type === "Executive"
).length;

const departmentGroups = groups.filter(
  (group) => group.type === "Department"
).length;

const totalAgents = groups.reduce(
  (total, group) => total + group.aiAgents.length,
  0
);

const filteredGroups = groups.filter((group) => {

  const matchesSearch =
    group.name.toLowerCase().includes(search.toLowerCase()) ||
    group.manager.toLowerCase().includes(search.toLowerCase()) ||
    group.description.toLowerCase().includes(search.toLowerCase());

  const matchesType =
    typeFilter === "" ||
    group.type === typeFilter;

  const matchesStatus =
    statusFilter === "" ||
    group.status === statusFilter;

  return (
    matchesSearch &&
    matchesType &&
    matchesStatus
  );

});

const handleCreateGroup = () => {

  if (
    newGroup.name.trim() === "" ||
    newGroup.manager.trim() === ""
  ) {

    return;

  }

  setGroups([
    ...groups,
    {
  id: `GRP-${String(groups.length + 1).padStart(3, "0")}`,
  name: newGroup.name,
  description: newGroup.description,
  type: newGroup.type,
  manager: newGroup.manager,
  members: newGroup.members,
  memberList: newGroup.memberList,
  aiAgents: newGroup.aiAgents,
  aiWorkspaceAccess: newGroup.aiWorkspaceAccess,
  permissions: newGroup.permissions,
  status: newGroup.status,
}
  ]);

  setNewGroup({
  name: "",
  description: "",
  type: "Department",
  manager: "",
  members: 0,
  memberList: [],
  aiAgents: [],
  aiWorkspaceAccess: [],
  permissions: [],
  status: t.Active,
});

  setCreateOpen(false);

};

const handleSaveGroup = () => {

  if (selectedGroup === null) return;

  const updatedGroups = [...groups];

  updatedGroups[selectedGroup] = editGroup;

  setGroups(updatedGroups);

  setEditOpen(false);

};

const handleDeleteGroup = (index: number) => {

  const updatedGroups = groups.filter(
    (_, i) => i !== index
  );

  setGroups(updatedGroups);

};
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

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <Card>

    <CardContent className="p-6">

      <p className="text-sm text-muted-foreground">

        {t.ExecutiveGroup}

      </p>

      <h2 className="text-2xl font-bold mt-2">

        {executiveGroups}

      </h2>

    </CardContent>

  </Card>

  <Card>

    <CardContent className="p-6">

      <p className="text-sm text-muted-foreground">

        {t.DepartmentGroup}

      </p>

      <h2 className="text-2xl font-bold mt-2">

        {departmentGroups}

      </h2>

    </CardContent>

  </Card>

  <Card>

    <CardContent className="p-6">

      <p className="text-sm text-muted-foreground">

        {t.AssignedAIAgents}

      </p>

      <h2 className="text-2xl font-bold mt-2">

        {totalAgents}

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

      <Button
  onClick={() => {

    setNewGroup({
      name: "",
      description: "",
      type: "Department",
      manager: "",
      members: 0,
      memberList: [],
      aiAgents: [],
      aiWorkspaceAccess: [],
      permissions: [],
      status: t.Active,
    });
    setCreateOpen(true);

  }}
>

  {t.CreateGroup}

</Button>

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

        {filteredGroups.map((group) =>(

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

      <DropdownMenuItem
  onClick={() => {

    setSelectedGroup(groups.indexOf(group));

   setEditGroup({
  id: group.id,
  name: group.name,
  description: group.description,
  type: group.type,
  manager: group.manager,
  members: group.members,
  memberList: group.memberList,
  aiAgents: group.aiAgents,
  aiWorkspaceAccess: group.aiWorkspaceAccess,
  permissions: group.permissions,
  status: group.status,
});
    setEditOpen(true);

  }}
>

  <Pencil className="w-4 h-4 mr-2" />

  {t.EditGroup}

</DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={() => {

          setSelectedGroup(groups.indexOf(group));

          setViewOpen(true);

        }}
      >

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

      <DropdownMenuItem
          className="text-red-500"
          onClick={() => handleDeleteGroup(groups.indexOf(group))}>

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

<div className="col-span-2">

  <p className="text-sm text-muted-foreground mb-2">

    {t.GroupMembers}

  </p>

  <div className="flex flex-wrap gap-2">

    {groups[selectedGroup].memberList.map((member) => (

      <span
        key={member}
        className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs"
      >

        {member}

      </span>

    ))}

  </div>

</div>

</div>

            </div>

          )}

        </DialogContent>

      </Dialog>

<Dialog
  open={createOpen}
  onOpenChange={setCreateOpen}
>

  <DialogContent className="max-w-2xl">

    <DialogHeader>

      <DialogTitle>

        {t.CreateGroup}

      </DialogTitle>

    </DialogHeader>

    <div className="grid grid-cols-2 gap-5 mt-4">

      <input
  className="rounded-lg border border-border bg-background p-3"
  placeholder={t.Name}
  value={newGroup.name}
  onChange={(e) =>
    setNewGroup({
      ...newGroup,
      name: e.target.value,
    })
  }
/>

<textarea
  className="col-span-2 rounded-lg border border-border bg-background p-3 min-h-[100px]"
  placeholder={t.GroupDescription}
  value={newGroup.description}
  onChange={(e) =>
    setNewGroup({
      ...newGroup,
      description: e.target.value,
    })
  }
/>

<input
  className="rounded-lg border border-border bg-background p-3"
  placeholder={t.Manager}
  value={newGroup.manager}
  onChange={(e) =>
    setNewGroup({
      ...newGroup,
      manager: e.target.value,
    })
  }
/>

      <select
        className="rounded-lg border border-border bg-background p-3"
        value={newGroup.type}
        onChange={(e) =>
          setNewGroup({
            ...newGroup,
            type: e.target.value,
          })
        }
      >

        <option value="Department">
          {t.DepartmentGroup}
        </option>

        <option value="Executive">
          {t.ExecutiveGroup}
        </option>

        <option value="Project">
          {t.ProjectGroup}
        </option>

        <option value="AI">
          {t.AIGroup}
        </option>

      </select>

  <input
  type="number"
  className="rounded-lg border border-border bg-background p-3"
  placeholder={t.TotalMembers}
  value={newGroup.members}
  onChange={(e) =>
    setNewGroup({
      ...newGroup,
      members: Number(e.target.value),
    })
  }
/>

<input
  className="col-span-2 rounded-lg border border-border bg-background p-3"
  placeholder={t.AIWorkspaceAccess}
  value={newGroup.aiWorkspaceAccess.join(", ")}
  onChange={(e) =>
    setNewGroup({
      ...newGroup,
      aiWorkspaceAccess: e.target.value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    })
  }
/>

    </div>

    <div className="flex justify-end gap-3 mt-6">

      <Button
        variant="outline"
        onClick={() => setCreateOpen(false)}
      >

        {t.Cancel}

      </Button>

      <Button
        onClick={handleCreateGroup}>

        {t.CreateGroup}
     </Button>

    </div>

  </DialogContent>

</Dialog>

<Dialog
  open={editOpen}
  onOpenChange={setEditOpen}
>

  <DialogContent className="max-w-2xl">

    <DialogHeader>

      <DialogTitle>

        {t.EditGroup}

      </DialogTitle>

    </DialogHeader>

    <div className="grid grid-cols-2 gap-5 mt-4">

      <input
        className="rounded-lg border border-border bg-background p-3"
        placeholder={t.Name}
        value={editGroup.name}
        onChange={(e) =>
          setEditGroup({
            ...editGroup,
            name: e.target.value,
          })
        }
      />

      <input
        className="rounded-lg border border-border bg-background p-3"
        placeholder={t.Manager}
        value={editGroup.manager}
        onChange={(e) =>
          setEditGroup({
            ...editGroup,
            manager: e.target.value,
          })
        }
      />

      <select
        className="rounded-lg border border-border bg-background p-3"
        value={editGroup.type}
        onChange={(e) =>
          setEditGroup({
            ...editGroup,
            type: e.target.value,
          })
        }
      >

        <option value="Department">
          {t.DepartmentGroup}
        </option>

        <option value="Executive">
          {t.ExecutiveGroup}
        </option>

        <option value="Project">
          {t.ProjectGroup}
        </option>

        <option value="AI">
          {t.AIGroup}
        </option>

      </select>

      <input
  type="number"
  className="rounded-lg border border-border bg-background p-3"
  placeholder={t.TotalMembers}
  value={editGroup.members}
  onChange={(e) =>
    setEditGroup({
      ...editGroup,
      members: Number(e.target.value),
    })
  }
/>

<textarea
  className="col-span-2 rounded-lg border border-border bg-background p-3 min-h-[120px]"
  placeholder={t.GroupMembers}
  value={editGroup.memberList.join("\n")}
  onChange={(e) =>
    setEditGroup({
      ...editGroup,
      memberList: e.target.value
        .split("\n")
        .map((member) => member.trim())
        .filter(Boolean),
    })
  }
/>

<textarea
  className="col-span-2 rounded-lg border border-border bg-background p-3 min-h-[100px]"
  placeholder={t.AssignedAIAgents}
  value={editGroup.aiAgents.join("\n")}
  onChange={(e) =>
    setEditGroup({
      ...editGroup,
      aiAgents: e.target.value
        .split("\n")
        .map((agent) => agent.trim())
        .filter(Boolean),
    })
  }
/>

<textarea
  className="col-span-2 rounded-lg border border-border bg-background p-3 min-h-[100px]"
  placeholder={t.AIWorkspaceAccess}
  value={editGroup.aiWorkspaceAccess.join("\n")}
  onChange={(e) =>
    setEditGroup({
      ...editGroup,
      aiWorkspaceAccess: e.target.value
        .split("\n")
        .map((workspace) => workspace.trim())
        .filter(Boolean),
    })
  }
/>

<textarea
  className="col-span-2 rounded-lg border border-border bg-background p-3 min-h-[100px]"
  placeholder={t.GroupPermissions}
  value={editGroup.permissions.join("\n")}
  onChange={(e) =>
    setEditGroup({
      ...editGroup,
      permissions: e.target.value
        .split("\n")
        .map((permission) => permission.trim())
        .filter(Boolean),
    })
  }
/>

    </div>

    <div className="flex justify-end gap-3 mt-6">

      <Button
        variant="outline"
        onClick={() => setEditOpen(false)}
      >

        {t.Cancel}

      </Button>

      <Button
        onClick={handleSaveGroup}
      >

        {t.SaveChanges}

      </Button>

    </div>

  </DialogContent>

</Dialog>

</div>

);

}