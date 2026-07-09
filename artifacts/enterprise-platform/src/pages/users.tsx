  import {
    Users,
    UserPlus,
    Search,
    Shield,
    Briefcase,
    MoreVertical,
  } from "lucide-react";
  import { useEffect, useState } from "react";

  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";

  import { Card, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useLanguage } from "@/lib/language-context";
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } 
  from "@/components/ui/dropdown-menu";
  import { useToast } from "@/hooks/use-toast";

  export default function UsersPage() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
    role: "Employee",
    status: t.Active,
    login: "",
    updatedAt: "Today",
  });

 type User = {
  employeeId: string;
  manager?: string;
  createdAt: string;
  updatedBy?: string;
  notes?: string;
  tags?: string[];
  automationLevel?: string;

  personalAIAssistant?: string;

  aiProductivityScore?: number;

  aiRiskLevel?: string;

  aiDecisionAuthority?: string;

  aiSkills?: string[];

  aiAgents?: string[];

  aiTrustScore?: number;

  aiRecommendations?: string[];

  aiTimeline?: string[];

  aiUsage?: {
    commandsExecuted: number;
    automationsTriggered: number;
    hoursSaved: number;
    lastInteraction: string;
  };

  aiPermissions?: {
    executeWorkflows: boolean;
    approveDecisions: boolean;
    deployAgents: boolean;
    trainModels: boolean;
    enterpriseKnowledge: boolean;
  };
  aiWorkspaceAccess?: string[];
  aiCertifications?: string[];
  aiLearningProgress?: number;
  aiWorkflowHistory?: string[];
  aiDecisionHistory?: string[];
  aiExpertiseLevel?: string;
  aiCollaborationNetwork?: string[];
  aiAssistantPreferences?: {

  preferredLanguage: string;

  responseStyle: string;

  defaultWorkspace: string;

  notifications: boolean;

};
  aiMemorySummary?: string[];
  name: string;
  email: string;
  department: string;
  role: string;
  status: string;
  login: string;
  updatedAt: string;
  lockReason?: string;
  forcePasswordChange?: boolean;
  accountExpiration?: string;
  mfaEnabled?: boolean;
  deleted?: boolean;
  groups?: string[];
};
  type EditUser = {
        name: string;
        email: string;
        department: string;
        role: string;
        status: string;
        login: string;
      };

  const [editUser, setEditUser] = useState<EditUser>({
    name: "",
    email: "",
    department: "",
    role: "Employee",
    status: t.Active,
    login: "",
  });

  const [users, setUsers] = useState<User[]>([
    {
      name: "John Doe",
      employeeId: "EMP-1001",
      manager: "CEO",
      email: "john@nexus.ai",
      department: "Operations",
      role: "Manager",
      status: t.Active,
      login: "2 min ago",
      updatedAt: "Today",
      createdAt: "12 Jan 2024",
      updatedBy: "Administrator",
      notes: "Team lead for Operations.",
      tags: ["Executive", "AI Champion"],
      automationLevel: t.Autonomous,
      personalAIAssistant: "Nexus Executive Copilot",
      aiProductivityScore: 97,
      aiRiskLevel: t.LowRisk,
      aiDecisionAuthority: t.AutonomousExecution,
      aiSkills: [
        "Workflow Automation",
        "Executive Reporting",
        "Decision Support",
      ],
      aiWorkspaceAccess: [
        "Executive AI",
        "Operations AI",
      ],
      aiCertifications: [
      "Enterprise AI",
      "Workflow Automation",
      "Executive Decision Support",
    ],
      aiLearningProgress: 98,
      aiWorkflowHistory: [
      "Approved Procurement Workflow",
      "Generated Executive Report",
      "Created Operations Dashboard",
    ],
    aiDecisionHistory: [
    "Approved procurement request",
    "Escalated contract for legal review",
    "Delegated budget approval",
    ], 
      aiExpertiseLevel: t.Expert,
      aiCollaborationNetwork: [
      "Finance AI",
      "Legal AI",
      "Executive AI",
    ],
    aiAssistantPreferences: {
    preferredLanguage: "English",
    responseStyle: "Professional",
    defaultWorkspace: "Executive AI",
    notifications: true,
  },
    aiMemorySummary: [
    "Frequently collaborates with Finance AI.",
    "Prefers executive summaries.",
    "Frequently generates KPI dashboards.",
  ],
      aiAgents: ["Operations Agent", "Executive Agent"],
      aiTrustScore: 98,
      aiUsage: {
      commandsExecuted: 425,
      automationsTriggered: 87,
      hoursSaved: 146,
      lastInteraction: "Today 14:32",
        },

      aiRecommendations: [
      "Eligible for autonomous approvals.",
      ],
      aiTimeline: [
      "Generated monthly operations report.",
      "Approved procurement workflow.",
      "Escalated finance approval.",
    ],
      aiPermissions: {
      executeWorkflows: true,
      approveDecisions: true,
      deployAgents: true,
      trainModels: true,
      enterpriseKnowledge: true,
    },
    },
    {
      name: "Sarah Ahmed",
      employeeId: "EMP-1002",
      manager: "John Doe",
      email: "sarah@nexus.ai",
      department: "HR",
      role: "Administrator",
      status: t.Active,
      login: "10 min ago",
      updatedAt: "Today",
      createdAt: "08 Feb 2024",
      updatedBy: "Administrator",
      notes: "Primary HR administrator.",
      tags: ["HR", "Approver"],
      automationLevel: t.Assisted,
      personalAIAssistant: "Nexus HR Copilot",
      aiProductivityScore: 89,
      aiRiskLevel: t.MediumRisk,
      aiDecisionAuthority: t.RequireApproval,
      aiSkills: [
      "HR Automation",
      "Employee Onboarding",
      "Knowledge Search",
    ],
      aiWorkspaceAccess: [
      "HR AI",
      "Knowledge AI",
    ],
    aiCertifications: [
      "HR AI",
      "AI Governance",
    ],
    aiLearningProgress: 89,
    aiWorkflowHistory: [
    "Completed HR Onboarding",
    "Generated HR Summary",
  ],
    aiDecisionHistory: [
      "Approved leave request",
      "Escalated employee grievance",
    ],
      aiExpertiseLevel: t.Advanced,
      aiCollaborationNetwork: [
      "HR AI",
      "Knowledge AI",
      "Operations AI",
    ],
    aiAssistantPreferences: {
      preferredLanguage: "English",
      responseStyle: "Friendly",
      defaultWorkspace: "HR AI",
      notifications: true,
    },
    aiMemorySummary: [
    "Frequently handles HR onboarding.",
    "Uses Knowledge AI daily.",
    "Prefers detailed employee reports.",
  ],
      aiAgents: ["HR Agent"],
      aiTrustScore: 91,
      aiUsage: {
      commandsExecuted: 188,
      automationsTriggered: 41,
      hoursSaved: 59,
      lastInteraction: "Today 11:10",
    },
      aiRecommendations: [
      "Enable AI model training permission.",
      "Assign Finance AI Agent.",
    ],
      aiTimeline: [
      "Processed HR onboarding workflow.",
      "Answered HR knowledge request.",
    ],
      aiPermissions: {
      executeWorkflows: true,
      approveDecisions: true,
      deployAgents: false,
      trainModels: false,
      enterpriseKnowledge: true,
    },

    },
    {
      name: "Michael Brown",
      employeeId: "EMP-1003",
      manager: "John Doe",
      email: "michael@nexus.ai",
      department: "IT",
      role: "Employee",
      status: t.Pending,
      login: "-",
      updatedAt: "Yesterday",
      createdAt: "20 Mar 2024",
      updatedBy: "HR Manager",
      notes: "Pending onboarding completion.",
      tags: ["Pending"],
      automationLevel: t.Manual,
      personalAIAssistant: "Nexus IT Copilot",
      aiProductivityScore: 71,
      aiRiskLevel: t.LowRisk,
      aiDecisionAuthority: t.SuggestOnly,
      aiSkills: [
        "IT Support",
        "Device Provisioning",
      ],
      aiWorkspaceAccess: [
        "IT AI",
      ],
      aiCertifications: [
      "IT Automation",
    ],
      aiLearningProgress: 54,
      aiWorkflowHistory: [
      "Provisioned IT Account",
    ],
      aiDecisionHistory: [
      "Suggested password reset",
    ],
      aiExpertiseLevel: t.Intermediate,
      aiCollaborationNetwork: [
      "IT AI",
      "Security AI",
    ],
    aiAssistantPreferences: {
    preferredLanguage: "English",
    responseStyle: "Technical",
    defaultWorkspace: "IT AI",
    notifications: false,
  },
    aiMemorySummary: [
    "Frequently provisions enterprise devices.",
    "Works mainly with IT AI.",
    "Often requests security reports.",
  ],
      aiAgents: ["IT Agent"],
      aiTrustScore: 74,
      aiUsage: {
      commandsExecuted: 32,
      automationsTriggered: 6,
      hoursSaved: 9,
      lastInteraction: "Yesterday 16:20",
      },
      aiRecommendations: [
      "Complete AI onboarding.",
      "Increase automation level.",
      "Enable MFA.",
    ],
    aiTimeline: [
    "Completed AI onboarding.",
  ],
      aiPermissions: {
      executeWorkflows: false,
      approveDecisions: false,
      deployAgents: false,
      trainModels: false,
      enterpriseKnowledge: true,
    },

    },
  ]);

    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [bulkRoleOpen, setBulkRoleOpen] = useState(false);
    const [bulkRole, setBulkRole] = useState("Employee");
    const [bulkDepartmentOpen, setBulkDepartmentOpen] = useState(false);
    const [bulkDepartment, setBulkDepartment] = useState("Operations");
    const [sortConfig, setSortConfig] = useState<{
  key: keyof User;
  direction: "asc" | "desc";
}>({
  key: "name",
  direction: "asc",
});

const [visibleColumns, setVisibleColumns] = useState({

  name: true,

  email: true,

  department: true,

  role: true,

  status: true,

  login: true,

});

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [currentPage, setCurrentPage] = useState(1);

    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

    const [lockReason, setLockReason] = useState("");
    const totalUsers = users.length;

    const activeUsers = users.filter(
      (user) => user.status === t.Active
    ).length;

    const pendingUsers = users.filter(
      (user) => user.status === t.Pending
    ).length;

    const administratorUsers = users.filter(
      (user) => user.role === "Administrator"
    ).length;

    const disabledUsers = users.filter(
      (user) => user.status === t.Disabled
    ).length;

    const filteredUsers = users
  .filter((user) => {

    if (user.deleted) {

      return false;

    }

    const value = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.department.toLowerCase().includes(value) ||
      user.role.toLowerCase().includes(value) ||
      user.status.toLowerCase().includes(value);

    const matchesDepartment =
      departmentFilter === "" ||
      departmentFilter === "all" ||
      user.department === departmentFilter;

    const matchesRole =
      roleFilter === "" ||
      roleFilter === "all" ||
      user.role === roleFilter;

    const matchesStatus =
      statusFilter === "" ||
      statusFilter === "all" ||
      user.status === statusFilter;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesRole &&
      matchesStatus
    );

  })
  .sort((a, b) => {

    const first = String(a[sortConfig.key]).toLowerCase();
    const second = String(b[sortConfig.key]).toLowerCase();

    return sortConfig.direction === "asc"
      ? first.localeCompare(second)
      : second.localeCompare(first);

  });

const totalPages = Math.max(
  1,
  Math.ceil(filteredUsers.length / rowsPerPage)
);

const paginatedUsers = filteredUsers.slice(

  (currentPage - 1) * rowsPerPage,

  currentPage * rowsPerPage,

);

useEffect(() => {

  setCurrentPage(1);

}, [

  search,

  departmentFilter,

  roleFilter,

  statusFilter,

  rowsPerPage,

]);
  const handleCreateUser = () => {

    if (
    newUser.name.trim() === "" ||
    newUser.email.trim() === "" ||
    newUser.department.trim() === ""
  ) {

    toast({
    title: t.ValidationError,
    description: t.RequiredFieldsMessage,
    variant: "destructive",
    });

    return;
  }

    const emailExists = users.some(
    (user) =>
      user.email.toLowerCase() ===
      newUser.email.toLowerCase()
  );

  if (emailExists) {

    toast({
      title: t.EmailAlreadyExists,
      description: t.EmailAlreadyExistsDescription,
      variant: "destructive",
    });

    return;

  }
  setUsers([
  ...users,
  {
    employeeId: `EMP-${users.length + 1001}`,
  ...newUser,
  login: "Just now",
  createdAt: "Today",
  updatedAt: "Today",
  },
]);

setNewUser({
  name: "",
  email: "",
  department: "",
  role: "Employee",
  status: t.Active,
  login: "",
  updatedAt: "Today",
});

  toast({
    title: t.UserCreated,
    description: t.UserCreatedDescription,
  });

  setOpen(false);

  };
    const handleSaveUser = () => {

    if (selectedUser === null) return;

    if (
    editUser.name.trim() === "" ||
    editUser.email.trim() === "" ||
    editUser.department.trim() === ""
  ) {

    toast({
      title: t.ValidationError,
      description: t.RequiredFieldsMessage,
      variant: "destructive",
    });

    return;

  }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(editUser.email)) {

      toast({
        title: t.InvalidEmail,
        description: t.InvalidEmailDescription,
        variant: "destructive",
      });

      return;

    }
    
    const emailExists = users.some(
    (user, index) =>
      index !== selectedUser &&
      user.email.toLowerCase() ===
        editUser.email.toLowerCase()
  );

  if (emailExists) {

    toast({
      title: t.EmailAlreadyExists,
      description: t.EmailAlreadyExistsDescription,
      variant: "destructive",
    });

    return;

  }

    const updatedUsers = [...users];

    updatedUsers[selectedUser] = {
      ...updatedUsers[selectedUser],
      name: editUser.name,
      email: editUser.email,
      department: editUser.department,
      role: editUser.role,
      status: editUser.status,
      login: editUser.login,
    };

    setUsers(updatedUsers);

  toast({
    title: t.UserUpdated,
    description: t.UserUpdatedDescription,
  });

  setEditOpen(false);

  };

  const handleDeleteUser = () => {

  if (selectedUser === null) return;

  const updatedUsers = [...users];

  updatedUsers[selectedUser] = {

    ...updatedUsers[selectedUser],

    deleted: true,

  };

  setUsers(updatedUsers);

  toast({

    title: t.UserDeleted,

    description: t.UserDeletedDescription,

  });

  setSelectedUser(null);

  setDeleteOpen(false);

};
  const handleDisableUser = (index: number) => {

  const updatedUsers = [...users];

  const isDisabling =
    updatedUsers[index].status === t.Active;

  updatedUsers[index] = {

    ...updatedUsers[index],

    status: isDisabling
      ? t.Disabled
      : t.Active,

    lockReason: isDisabling
      ? lockReason
      : "",

  };

  setUsers(updatedUsers);

  toast({

    title: isDisabling
      ? t.UserDisabled
      : t.UserEnabled,

    description: isDisabling
      ? t.UserDisabledDescription
      : t.UserEnabledDescription,

  });

};

  const handleResetPassword = () => {

    toast({
      title: t.PasswordReset,
      description: t.PasswordResetSent,
    });

  };


  return (
      <div className="space-y-8 animate-in fade-in duration-500">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">
            {t.UserManagement}
          </h1>

          <p className="text-muted-foreground mt-2">
            {t.UserManagementDescription}
          </p>

        </div>

        {/* Summary */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card className="border-border bg-card">
            <CardContent className="p-6 flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  {t.TotalUsers}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalUsers}
                </h2>

              </div>

              <Users className="w-10 h-10 text-primary" />

            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6 flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  {t.ActiveUsers}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-emerald-500">
                  {activeUsers}
                </h2>

              </div>

              <Shield className="w-10 h-10 text-emerald-500" />

            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6 flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  {t.PendingInvitations}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-yellow-500">
                  {pendingUsers}
                </h2>

              </div>

              <UserPlus className="w-10 h-10 text-yellow-500" />

            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6 flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  {t.Administrators}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {administratorUsers}
                </h2>

              </div>

              <Briefcase className="w-10 h-10 text-primary" />

            </CardContent>
          </Card>

        </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

    <Card>

      <CardContent className="p-5">

        <p className="text-sm text-muted-foreground">

          {t.LastSynchronization}

        </p>

        <h3 className="text-lg font-semibold mt-2">

          2 {t.MinutesAgo}

        </h3>

      </CardContent>

    </Card>

    <Card>

    <CardContent className="p-5">

      <p className="text-sm text-muted-foreground">

        {t.LastUserCreated}

      </p>

      <h3 className="text-lg font-semibold mt-2">

        {users.length > 0
          ? users[users.length - 1].name
          : "-"}

      </h3>

    </CardContent>

  </Card>

    <Card>

      <CardContent className="p-5">

        <p className="text-sm text-muted-foreground">

          {t.ActiveSessions}

        </p>

        <h3 className="text-lg font-semibold mt-2">

          81

        </h3>

      </CardContent>

    </Card>

    <Card>

    <CardContent className="p-5">

      <p className="text-sm text-muted-foreground">

        {t.LockedAccounts}

      </p>

      <h3 className="text-lg font-semibold mt-2 text-red-500">

        {disabledUsers}

      </h3>

    </CardContent>

  </Card>

  </div>

        <Card className="border-border bg-card">
          

          <CardContent className="p-5">

            <div className="flex flex-col xl:flex-row gap-4">

              <div className="relative flex-1">

                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

                <Input
                className="pl-10"
                placeholder={t.SearchUsers}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
              </div>

              <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >

              <SelectTrigger className="w-[180px]">

                <SelectValue
                  placeholder={t.Department}
                />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="all">
                  {t.Department}
                </SelectItem>

                <SelectItem value="Operations">
                  Operations
                </SelectItem>

                <SelectItem value="HR">
                  HR
                </SelectItem>

                <SelectItem value="Finance">
                  Finance
                </SelectItem>

                <SelectItem value="IT">
                  IT
                </SelectItem>

              </SelectContent>

            </Select>

            <select
              className="rounded-lg border border-border bg-background px-4 py-2"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}>

              <option value="">{t.Role}</option>

              <option value="Employee">{t.Employee}</option>

              <option value="Manager">{t.Manager}</option>

              <option value="Executive">{t.Executive}</option>

              <option value="Administrator">{t.Administrator}</option>

            </select>

            <select
              className="rounded-lg border border-border bg-background px-4 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>

              <option value="">{t.Status}</option>

              <option value={t.Active}>{t.Active}</option>

              <option value={t.Pending}>{t.Pending}</option>

              <option value={t.Disabled}>{t.Disabled}</option>

            </select>
    <div className="flex gap-2">

  <DropdownMenu>

    <DropdownMenuTrigger asChild>

      <Button variant="outline">

        {t.Columns}

      </Button>

    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">

      <DropdownMenuItem
  onClick={() =>
    setVisibleColumns({
      ...visibleColumns,
      name: !visibleColumns.name,
    })
  }
>

  {visibleColumns.name ? "✓" : ""} {t.Name}

</DropdownMenuItem>

      <DropdownMenuItem
  onClick={() =>
    setVisibleColumns({
      ...visibleColumns,
      email: !visibleColumns.email,
    })
  }
>

  {visibleColumns.email ? "✓" : ""} {t.Email}

</DropdownMenuItem>

      <DropdownMenuItem
        onClick={() =>
          setVisibleColumns({
            ...visibleColumns,
            department: !visibleColumns.department,
          })
        }
      >

        {visibleColumns.department ? "✓" : ""} {t.Department}

      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() =>
          setVisibleColumns({
            ...visibleColumns,
            role: !visibleColumns.role,
          })
        }
      >

        {visibleColumns.role ? "✓" : ""} {t.Role}

      </DropdownMenuItem>

      <DropdownMenuItem
          onClick={() =>
            setVisibleColumns({
              ...visibleColumns,
              status: !visibleColumns.status,
            })
          }
        >

          {visibleColumns.status ? "✓" : ""} {t.Status}

        </DropdownMenuItem>

      <DropdownMenuItem
          onClick={() =>
            setVisibleColumns({
              ...visibleColumns,
              login: !visibleColumns.login,
            })
          }
        >

          {visibleColumns.login ? "✓" : ""} {t.LastLogin}

        </DropdownMenuItem>

    </DropdownMenuContent>

  </DropdownMenu>

  <Button
    variant="outline"
    onClick={() => {

      document
        .getElementById("csv-upload")
        ?.click();

    }}
  >

    {t.ImportCSV}

  </Button>

  <Button
  variant="outline"
  onClick={() => {

    const headers = [
      "Name",
      "Email",
      "Department",
      "Role",
      "Status",
      "Last Login",
    ];

    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      user.department,
      user.role,
      user.status,
      user.login,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "users.csv";

    link.click();

    URL.revokeObjectURL(url);

  }}
>

  {t.ExportCSV}

</Button>

</div>

<input
  id="csv-upload"
  type="file"
  accept=".csv"
  className="hidden"
  onChange={(event) => {

    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

  const csvText = reader.result as string;

  const rows = csvText
    .split("\n")
    .map((row) => row.trim())
    .filter((row) => row.length > 0);

  const importedUsers: User[] = rows
  .slice(1)
  .map((row) => {

    const [
      name,
      email,
      department,
      role,
      status,
      login,
    ] = row.split(",");

    return {
        employeeId: `EMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: name.trim(),
        email: email.trim(),
        department: department.trim(),
        role: role.trim(),
        status: status.trim(),
        login: login.trim(),
        createdAt: "Today",
        updatedAt: "Today",
      };

  });

const existingEmails = new Set(
  users.map((user) => user.email.toLowerCase())
);

const uniqueUsers = importedUsers.filter((user) => {

  return !existingEmails.has(
    user.email.toLowerCase()
  );

});

setUsers((currentUsers) => [
  ...currentUsers,
  ...uniqueUsers,
]);

toast({
  title: t.UsersImported,
  description: t.UsersImportedDescription,
});

if (uniqueUsers.length !== importedUsers.length) {

  toast({
    title: t.DuplicateUsersSkipped,
    description: t.DuplicateUsersSkippedDescription,
    variant: "destructive",
  });

}

event.target.value = "";

};
    reader.readAsText(file);

  }}
/>

</CardContent>

</Card>

        {selectedUsers.length > 0 && (

    <Card className="border-primary/30 bg-primary/5">

      <CardContent className="p-4 flex items-center justify-between">

        <p className="font-medium">

          {selectedUsers.length} {t.SelectedUsers}

        </p>

        <div className="flex gap-3">

          <Button
          variant="outline"
          onClick={() => {

            const updatedUsers = [...users];

            selectedUsers.forEach((index) => {

              updatedUsers[index] = {
                ...updatedUsers[index],
                status:
                  updatedUsers[index].status === t.Active
                    ? t.Disabled
                    : t.Active,
              };

            });

            setUsers(updatedUsers);

            setSelectedUsers([]);

            toast({
              title: t.UserUpdated,
              description: t.UserUpdatedDescription,
            });

          }}
        >

          {t.DisableUser}

        </Button>

          <Button
            variant="destructive"
            onClick={() => {

              setUsers(
                users.filter(
                  (_, index) =>
                    !selectedUsers.includes(index)
                )
              );

              setSelectedUsers([]);

              toast({
                title: t.UserDeleted,
                description: t.UserDeletedDescription,
              });

            }}
          >

    {t.Delete}

  </Button>

  <Button
  variant="outline"
  onClick={() => {

    setBulkRoleOpen(true);

  }}
>

  {t.AssignRole}

</Button>

<Button
  variant="outline"
  onClick={() => {

    setBulkDepartmentOpen(true);

  }}
>

  {t.AssignDepartment}

</Button>

<Button
  variant="ghost"
  onClick={() => setSelectedUsers([])}
>

  {t.ClearSelection}

</Button>

        </div>

      </CardContent>

    </Card>

)}
 
  
        <Card className="border-border bg-card">
    <CardContent className="p-0 overflow-x-auto">

      <table className="w-full">

        <thead className="border-b border-border bg-muted/40">

    <tr className="text-left">

      {visibleColumns.name && (

  <th
    className="p-4 cursor-pointer select-none"
    onClick={() =>
      setSortConfig({
        key: "name",
        direction:
          sortConfig.key === "name" &&
          sortConfig.direction === "asc"
            ? "desc"
            : "asc",
      })
    }
  >

    <div className="flex items-center gap-2">

      <span>{t.Name}</span>

      {sortConfig.key === "name" && (

        <span className="text-xs text-muted-foreground">

          {sortConfig.direction === "asc"
            ? "▲"
            : "▼"}

        </span>

      )}

    </div>

  </th>


  

)}
      {visibleColumns.email && (

  <th
    className="p-4 cursor-pointer select-none"
    onClick={() =>
      setSortConfig({
        key: "email",
        direction:
          sortConfig.key === "email" &&
          sortConfig.direction === "asc"
            ? "desc"
            : "asc",
      })
    }
  >

    <div className="flex items-center gap-2">

      <span>{t.Email}</span>

      {sortConfig.key === "email" && (

        <span className="text-xs text-muted-foreground">

          {sortConfig.direction === "asc"
            ? "▲"
            : "▼"}

        </span>

      )}

    </div>

  </th>
      )}

{visibleColumns.department && (

  <th
    className="p-4 cursor-pointer select-none"
    onClick={() =>
      setSortConfig({
        key: "department",
        direction:
          sortConfig.key === "department" &&
          sortConfig.direction === "asc"
            ? "desc"
            : "asc",
      })
    }
  >

    <div className="flex items-center gap-2">

      <span>{t.Department}</span>

      {sortConfig.key === "department" && (

        <span className="text-xs text-muted-foreground">

          {sortConfig.direction === "asc"
            ? "▲"
            : "▼"}

        </span>

      )}

    </div>

  </th>

)}
    {visibleColumns.role && (

  <th
    className="p-4 cursor-pointer select-none"
    onClick={() =>
      setSortConfig({
        key: "role",
        direction:
          sortConfig.key === "role" &&
          sortConfig.direction === "asc"
            ? "desc"
            : "asc",
      })
    }
  >

    <div className="flex items-center gap-2">

      <span>{t.Role}</span>

      {sortConfig.key === "role" && (

        <span className="text-xs text-muted-foreground">

          {sortConfig.direction === "asc"
            ? "▲"
            : "▼"}

        </span>

      )}

    </div>

  </th>

)}
    {visibleColumns.status && (

  <th
    className="p-4 cursor-pointer select-none"
    onClick={() =>
      setSortConfig({
        key: "status",
        direction:
          sortConfig.key === "status" &&
          sortConfig.direction === "asc"
            ? "desc"
            : "asc",
      })
    }
  >

    <div className="flex items-center gap-2">

      <span>{t.Status}</span>

      {sortConfig.key === "status" && (

        <span className="text-xs text-muted-foreground">

          {sortConfig.direction === "asc"
            ? "▲"
            : "▼"}

        </span>

      )}

    </div>

  </th>

)}
  {visibleColumns.login && (

  <th
    className="p-4 cursor-pointer select-none"
    onClick={() =>
      setSortConfig({
        key: "login",
        direction:
          sortConfig.key === "login" &&
          sortConfig.direction === "asc"
            ? "desc"
            : "asc",
      })
    }
  >

    <div className="flex items-center gap-2">

      <span>{t.LastLogin}</span>

      {sortConfig.key === "login" && (

        <span className="text-xs text-muted-foreground">

          {sortConfig.direction === "asc"
            ? "▲"
            : "▼"}

        </span>

      )}

    </div>

  </th>

)}
      <th className="p-4 text-center">{t.Actions}</th>

    </tr>

  </thead>

        <tbody>

    {filteredUsers.length === 0 ? (

      <tr>

        <td
          colSpan={7}
          className="text-center py-16 text-muted-foreground"
        >

          <div className="flex flex-col items-center gap-3">

            <Users className="w-12 h-12 opacity-40" />

            <h3 className="text-lg font-semibold">

              {t.NoUsersFound}

            </h3>

            <p>

              {t.TryAnotherSearch}

            </p>

          </div>

        </td>

      </tr>

    ) : (

      paginatedUsers.map((user, index) => (

        <tr
            key={user.email}
            className="border-b border-border hover:bg-muted/30 transition"
          >

            <td className="p-4 w-12">

    <input
      type="checkbox"
      className="h-4 w-4 rounded border-border"
      checked={selectedUsers.includes(index)}
      onChange={() => {

        if (selectedUsers.includes(index)) {

          setSelectedUsers(
            selectedUsers.filter(
              (selectedIndex) =>
                selectedIndex !== index
            )
          );

        } else {

          setSelectedUsers([
            ...selectedUsers,
            index,
          ]);

        }

      }}
    />

  </td>

            {visibleColumns.name && (

            <td className="p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">

                  {user.name.charAt(0)}

                </div>

                <span>{user.name}</span>

              </div>

            </td>

          )}

              {visibleColumns.email && (

            <td className="p-4">

              <div className="text-sm">

                <div className="font-medium">

                  {user.email}

                </div>

                <div className="text-muted-foreground text-xs">

                  {t.EnterpriseAccount}

                </div>

              </div>

            </td>

          )} 

              {visibleColumns.department && (

            <td className="p-4">

              <span className="rounded-lg bg-muted px-3 py-1 text-xs">

                {user.department}

              </span>

            </td>

          )}

              {visibleColumns.role && (

            <td className="p-4">

              <span className="rounded-lg bg-primary/10 text-primary px-3 py-1 text-xs font-medium">

                {user.role}

              </span>

            </td>

)}

              {visibleColumns.status && (

              <td className="p-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.status === t.Active
                      ? "bg-emerald-500/10 text-emerald-500"
                      : user.status === t.Pending
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {user.status}
                </span>

              </td>

)}

              {visibleColumns.login && (

              <td className="p-4">

                {user.login}

              </td>

            )}

              <td className="p-4 text-center">

                <DropdownMenu>

                <DropdownMenuTrigger asChild>

              <Button variant="ghost" size="icon">

                <MoreVertical className="w-4 h-4" />

              </Button>

              </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <DropdownMenuItem
            onClick={() => {

              setSelectedUser(index);

              setViewOpen(true);

            }}
          >

            {t.ViewUser}

          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {

              setSelectedUser(index);

              setEditUser({
                name: user.name,
                email: user.email,
                department: user.department,
                role: user.role,
                status: user.status,
                login: user.login,
              });

              setEditOpen(true);

            }}
          >

            {t.EditUser}

          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleResetPassword}>

              {t.ResetPassword}

          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleDisableUser(index)}>
                {t.DisableUser}
              </DropdownMenuItem>

            <DropdownMenuSeparator/>

            <>
  {!user.deleted ? (

    <DropdownMenuItem
      className="text-red-500"
      onClick={() => {

        setSelectedUser(index);

        setDeleteOpen(true);

      }}
    >

      {t.DeleteUser}

    </DropdownMenuItem>

  ) : (

    <DropdownMenuItem
      onClick={() => {

        const updatedUsers = [...users];

        updatedUsers[index] = {

          ...updatedUsers[index],

          deleted: false,

        };

        setUsers(updatedUsers);

        toast({

          title: t.UserRestored,

          description: t.UserRestoredDescription,

        });

      }}
    >

      {t.RestoreUser}

    </DropdownMenuItem>

  )}
</>

          
              </DropdownMenuContent>

            </DropdownMenu>

              </td>

            </tr>

          )))}

        </tbody>

      </table>

    </CardContent>
  </Card>

  <div className="flex items-center justify-between mt-6">

    <p className="text-sm text-muted-foreground">

  {t.Showing}{" "}

  {filteredUsers.length === 0
    ? 0
    : (currentPage - 1) * rowsPerPage + 1}

  {" – "}

  {Math.min(
    currentPage * rowsPerPage,
    filteredUsers.length
  )}

  {" "}

  {t.Of}{" "}

  {filteredUsers.length}

  {" "}

  {t.Users}

</p>

    <div className="flex items-center gap-4">

  <span className="text-sm">

    {t.RowsPerPage}

  </span>

  <Select
    value={rowsPerPage.toString()}
    onValueChange={(value) => {

      setRowsPerPage(Number(value));

      setCurrentPage(1);

    }}
  >

    <SelectTrigger className="w-24">

      <SelectValue />

    </SelectTrigger>

    <SelectContent>

      <SelectItem value="10">10</SelectItem>

      <SelectItem value="25">25</SelectItem>

      <SelectItem value="50">50</SelectItem>

      <SelectItem value="100">100</SelectItem>

    </SelectContent>

  </Select>

  <Button
    variant="outline"
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage((page) => page - 1)
    }
  >

    {t.Previous}

  </Button>

  <Button
  variant="outline"
  disabled={currentPage === totalPages}
  onClick={() =>
    setCurrentPage((page) => page + 1)
  }
>

  {t.Next}

</Button>

<div className="flex items-center gap-2">

  {Array.from(
    { length: totalPages },
    (_, index) => (

      <Button
        key={index + 1}
        variant={
          currentPage === index + 1
            ? "default"
            : "outline"
        }
        size="sm"
        onClick={() =>
          setCurrentPage(index + 1)
        }
      >

        {index + 1}

      </Button>

    )
  )}

</div>
</div>

  </div>

    <Dialog open={open} onOpenChange={setOpen}>

    <DialogContent className="max-w-2xl">

      <DialogHeader>

        <DialogTitle>
          {t.AddUser}
        </DialogTitle>

      </DialogHeader>

      <div className="grid grid-cols-2 gap-5 mt-4">

        <Input
            placeholder={t.FullName}
            value={newUser.name}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                name: e.target.value,
              })
            }
          />

        <Input
          placeholder={t.Email}
          value={newUser.email}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              email: e.target.value,
            })
          }
        />

        <Input
          placeholder={t.Department}
          value={newUser.department}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              department: e.target.value,
            })
          }
        />

        <select
          className="rounded-lg border border-border bg-background p-3"
          value={newUser.role}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              role: e.target.value,
            })
          }
        >

          <option value="Employee">{t.Employee}</option>
          <option value="Manager">{t.Manager}</option>
          <option value="Administrator">{t.Administrator}</option>
          <option value="Executive">{t.Executive}</option>

        </select>

        <Input
          type="password"
          placeholder={t.Password}
        />

        <Input
          type="password"
          placeholder={t.ConfirmPassword}
        />

      </div>

      <DialogFooter className="mt-6">

        <Button
            variant="outline"
            onClick={() => {

      setNewUser({
      name: "",
      email: "",
      department: "",
      role: "Employee",
      status: t.Active,
      login: "",
      updatedAt: "Today",
    });

              setOpen(false);

            }}
          >
            {t.Cancel}
          </Button>

        <Button onClick={handleCreateUser}>
          {t.CreateUser}
        </Button>

      </DialogFooter>

    </DialogContent>

  </Dialog>

  <Dialog open={editOpen} onOpenChange={setEditOpen}>

    <DialogContent className="max-w-2xl">

      <DialogHeader>

        <DialogTitle>
          {t.EditUser}
        </DialogTitle>

      </DialogHeader>

      <div className="grid grid-cols-2 gap-5 mt-4">

        <Input
          value={editUser.name}
          onChange={(e) =>
            setEditUser({
              ...editUser,
              name: e.target.value,
            })
          }
        />

        <Input
          value={editUser.email}
          onChange={(e) =>
            setEditUser({
              ...editUser,
              email: e.target.value,
            })
          }
        />

        <Input
          value={editUser.department}
          onChange={(e) =>
            setEditUser({
              ...editUser,
              department: e.target.value,
            })
          }
        />

        <select
          className="rounded-lg border border-border bg-background p-3"
          value={editUser.role}
          onChange={(e) =>
            setEditUser({
              ...editUser,
              role: e.target.value,
            })
          }
        >

          <option value="Employee">{t.Employee}</option>
          <option value="Manager">{t.Manager}</option>
          <option value="Administrator">{t.Administrator}</option>
          <option value="Executive">{t.Executive}</option>

        </select>

      </div>

      <DialogFooter className="mt-6">

        <Button
          variant="outline"
          onClick={() => {

            if (selectedUser !== null) {

              setEditUser({
                name: users[selectedUser].name,
                email: users[selectedUser].email,
                department: users[selectedUser].department,
                role: users[selectedUser].role,
                status: users[selectedUser].status,
                login: users[selectedUser].login,
              });

            }

            setEditOpen(false);

          }}
        >
          {t.Cancel}
        </Button>

        <Button onClick={handleSaveUser}>
          {t.SaveChanges}
          </Button>

      </DialogFooter>

    </DialogContent>

      </Dialog>
      <Dialog 
      
      open={viewOpen}

      onOpenChange={setViewOpen}
      >

        <DialogContent className="max-w-xl">

      <DialogHeader>

        <DialogTitle>
          
          {t.ViewUser}
        </DialogTitle>
      </DialogHeader>
        {selectedUser !== null && (

        <div className="space-y-6">

          <div className="flex items-center justify-between">

  <div className="flex items-center gap-4">

    <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">

  {profilePhoto ? (

    <img
      src={profilePhoto}
      alt={users[selectedUser].name}
      className="w-full h-full object-cover"
    />

  ) : (

    <span className="text-2xl font-bold text-primary">

      {users[selectedUser].name.charAt(0)}

    </span>

  )}

</div>

    <div>

      <h2 className="text-xl font-bold">

        {users[selectedUser].name}

      </h2>

      <p className="text-muted-foreground">

        {users[selectedUser].email}

      </p>

    </div>

  </div>
<div className="flex flex-col gap-2">

  <input
    id="profile-photo-upload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(event) => {

      const file = event.target.files?.[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {

        setProfilePhoto(reader.result as string);

      };

      reader.readAsDataURL(file);

    }}
  />

  <Button
    variant="outline"
    size="sm"
    onClick={() => {

      document
        .getElementById("profile-photo-upload")
        ?.click();

    }}
  >

    {t.UploadProfilePhoto}

  </Button>

  {profilePhoto && (

    <Button
      variant="ghost"
      size="sm"
      onClick={() => setProfilePhoto(null)}
    >

      {t.RemoveProfilePhoto}

    </Button>

  )}

</div>

</div>

          <h3 className="text-sm font-semibold">

            {t.AccountInformation}

          </h3>

          <div className="grid grid-cols-2 gap-6">

  <div>

  <p className="text-sm text-muted-foreground">

    {t.EmployeeID}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    {users[selectedUser].employeeId}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.Department}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    {users[selectedUser].department}

  </span>

</div>

  <div>

  <p className="text-sm text-muted-foreground">

    {t.Role}

  </p>

  <span className="rounded-lg bg-primary/10 text-primary px-3 py-1 text-xs font-medium">

    {users[selectedUser].role}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.ManagerName}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    {users[selectedUser].manager ?? "-"}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.AutomationLevel}

  </p>

  <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">

    {users[selectedUser].automationLevel}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.PersonalAIAssistant}

  </p>

  <span className="rounded-lg bg-violet-500/10 text-violet-600 px-3 py-1 text-xs font-medium">

    {users[selectedUser].personalAIAssistant ?? "-"}

  </span>

</div>
<div>

  <p className="text-sm text-muted-foreground">

    {t.AITrustScore}

  </p>

  <span className="rounded-full bg-emerald-500/10 text-emerald-600 px-3 py-1 text-xs font-semibold">

    {users[selectedUser].aiTrustScore}%

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.AIProductivityScore}

  </p>

  <span className="rounded-full bg-blue-500/10 text-blue-600 px-3 py-1 text-xs font-semibold">

    {users[selectedUser].aiProductivityScore}%

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.AIRiskLevel}

  </p>

  <span className="rounded-full bg-orange-500/10 text-orange-600 px-3 py-1 text-xs font-semibold">

    {users[selectedUser].aiRiskLevel}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.AIDecisionAuthority}

  </p>

  <span className="rounded-lg bg-primary/10 text-primary px-3 py-1 text-xs font-medium">

    {users[selectedUser].aiDecisionAuthority}

  </span>

</div>
<div>

  <p className="text-sm text-muted-foreground">

    {t.AIExpertiseLevel}

  </p>

  <span className="rounded-full bg-sky-500/10 text-sky-600 px-3 py-1 text-xs font-semibold">

    {users[selectedUser].aiExpertiseLevel}

  </span>

</div>

<div className="col-span-2">

  <p className="text-sm text-muted-foreground mb-2">

    {t.AICollaborationNetwork}

  </p>

  <div className="flex flex-wrap gap-2">

    {(users[selectedUser].aiCollaborationNetwork ?? []).map((team) => (

      <span
        key={team}
        className="rounded-full bg-pink-500/10 text-pink-600 px-3 py-1 text-xs font-medium"
      >

        {team}

      </span>

    ))}

  </div>

</div>

  <div>

    <p className="text-sm text-muted-foreground">

      {t.Status}

    </p>

    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        users[selectedUser].status === t.Active
          ? "bg-emerald-500/10 text-emerald-500"
          : users[selectedUser].status === t.Pending
          ? "bg-yellow-500/10 text-yellow-500"
          : "bg-red-500/10 text-red-500"
      }`}
    >
      {users[selectedUser].status}
    </span>

  </div>

  <div>

  <p className="text-sm text-muted-foreground">

    {t.LastLogin}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    {users[selectedUser].login}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.AccountCreated}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    {users[selectedUser].createdAt}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.LastModifiedBy}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    {users[selectedUser].updatedBy ?? "-"}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.LastModifiedDate}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    {users[selectedUser].updatedAt}

  </span>

</div>

<div className="col-span-2">

  <p className="text-sm text-muted-foreground mb-2">

    {t.Groups}

  </p>

  <div className="flex flex-wrap gap-2">

    {users[selectedUser].groups &&
    users[selectedUser].groups!.length > 0 ? (

      users[selectedUser].groups!.map((group) => (

        <span
          key={group}
          className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium"
        >

          {group}

        </span>

      ))

    ) : (

      <span className="text-xs text-muted-foreground">

        {t.NoGroups}

      </span>

    )}

  </div>

</div>

<div className="col-span-2">

  <p className="text-sm text-muted-foreground mb-2">

    {t.AssignedAIAgents}

  </p>

  <div className="flex flex-wrap gap-2">

    {(users[selectedUser].aiAgents ?? []).map((agent) => (

      <span
        key={agent}
        className="rounded-full bg-violet-500/10 text-violet-600 px-3 py-1 text-xs font-medium"
      >

        {agent}

      </span>

    ))}

  </div>

</div>

<div className="col-span-2">

  <p className="text-sm text-muted-foreground mb-2">

    {t.AISkills}

  </p>

  <div className="flex flex-wrap gap-2">

    {(users[selectedUser].aiSkills ?? []).map((skill) => (

      <span
        key={skill}
        className="rounded-full bg-cyan-500/10 text-cyan-600 px-3 py-1 text-xs font-medium"
      >

        {skill}

      </span>

    ))}

  </div>

</div>

<div className="col-span-2">

  <p className="text-sm text-muted-foreground mb-2">

    {t.AIWorkspaceAccess}

  </p>

  <div className="flex flex-wrap gap-2">

    {(users[selectedUser].aiWorkspaceAccess ?? []).map((workspace) => (

      <span
        key={workspace}
        className="rounded-full bg-indigo-500/10 text-indigo-600 px-3 py-1 text-xs font-medium"
      >

        {workspace}

      </span>

    ))}

  </div>

</div>

<div className="col-span-2">

  <p className="text-sm text-muted-foreground mb-2">

    {t.AICertifications}

  </p>

  <div className="flex flex-wrap gap-2">

    {(users[selectedUser].aiCertifications ?? []).map((certification) => (

      <span
        key={certification}
        className="rounded-full bg-emerald-500/10 text-emerald-600 px-3 py-1 text-xs font-medium"
      >

        {certification}

      </span>

    ))}

  </div>

</div>

<div className="col-span-2">

  <p className="text-sm text-muted-foreground mb-2">

    {t.AILearningProgress}

  </p>

  <div className="w-full rounded-full bg-muted h-3">

    <div
      className="h-3 rounded-full bg-primary"
      style={{
        width: `${users[selectedUser].aiLearningProgress ?? 0}%`,
      }}
    />

  </div>

  <p className="text-xs text-muted-foreground mt-2">

    {users[selectedUser].aiLearningProgress}% Complete

  </p>

</div>
</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.SecurityInformation}

  </h3>

  <div className="grid grid-cols-2 gap-6">

    <div>

      <p className="text-sm text-muted-foreground">

        {t.LastPasswordChange}

      </p>

      <span className="rounded-lg bg-muted px-3 py-1 text-xs">

        30 days ago

      </span>

    </div>

    <div>

  <p className="text-sm text-muted-foreground">

    {t.TwoFactorAuthentication}

  </p>

  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      users[selectedUser].mfaEnabled
        ? "bg-emerald-500/10 text-emerald-500"
        : "bg-red-500/10 text-red-500"
    }`}
  >

    {users[selectedUser].mfaEnabled
      ? t.Enabled
      : t.Disabled}

  </span>

</div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.SecurityStatus}

      </p>

      <span className="rounded-full bg-emerald-500/10 text-emerald-500 px-3 py-1 text-xs font-semibold">

        Secure

      </span>

    </div>

    <div>

  <p className="text-sm text-muted-foreground">

    {t.ActiveSessions}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    1

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.PasswordChangeRequired}

  </p>

  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      users[selectedUser].forcePasswordChange
        ? "bg-yellow-500/10 text-yellow-500"
        : "bg-emerald-500/10 text-emerald-500"
    }`}
  >

    {users[selectedUser].forcePasswordChange
      ? "Yes"
      : "No"}

  </span>

</div>

<div>

  <p className="text-sm text-muted-foreground">

    {t.AccountExpiration}

  </p>

  <span className="rounded-lg bg-muted px-3 py-1 text-xs">

    {users[selectedUser].accountExpiration ?? "Never"}

  </span>

</div>

  </div>

</div>

<div className="mt-8">

   <h3 className="text-sm font-semibold mb-4">

    {t.AIAssistantPreferences}

  </h3>

  <div className="grid grid-cols-2 gap-6">

    <div>

      <p className="text-sm text-muted-foreground">

        {t.PreferredLanguage}

      </p>

      <span className="rounded-lg bg-muted px-3 py-1 text-xs">

        {users[selectedUser].aiAssistantPreferences?.preferredLanguage}

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.ResponseStyle}

      </p>

      <span className="rounded-lg bg-muted px-3 py-1 text-xs">

        {users[selectedUser].aiAssistantPreferences?.responseStyle}

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.DefaultWorkspace}

      </p>

      <span className="rounded-lg bg-primary/10 text-primary px-3 py-1 text-xs">

        {users[selectedUser].aiAssistantPreferences?.defaultWorkspace}

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.AINotifications}

      </p>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          users[selectedUser].aiAssistantPreferences?.notifications
            ? "bg-emerald-500/10 text-emerald-500"
            : "bg-red-500/10 text-red-500"
        }`}
      >

        {users[selectedUser].aiAssistantPreferences?.notifications
          ? t.Enabled
          : t.Disabled}

      </span>

    </div>

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AIMemorySummary}

  </h3>

  <div className="space-y-2">

    {(users[selectedUser].aiMemorySummary ?? []).map((memory) => (

      <div
        key={memory}
        className="rounded-lg border border-border bg-muted/40 p-3 text-sm"
      >

        🧠 {memory}

      </div>

    ))}

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AIPermissions}

  </h3>

  <div className="grid grid-cols-2 gap-6">

    <div>

      <p className="text-sm text-muted-foreground">

        {t.PreferredLanguage}

      </p>

      <span className="rounded-lg bg-muted px-3 py-1 text-xs">

        {users[selectedUser].aiAssistantPreferences?.preferredLanguage}

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.ResponseStyle}

      </p>

      <span className="rounded-lg bg-muted px-3 py-1 text-xs">

        {users[selectedUser].aiAssistantPreferences?.responseStyle}

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.DefaultWorkspace}

      </p>

      <span className="rounded-lg bg-primary/10 text-primary px-3 py-1 text-xs">

        {users[selectedUser].aiAssistantPreferences?.defaultWorkspace}

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.AINotifications}

      </p>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          users[selectedUser].aiAssistantPreferences?.notifications
            ? "bg-emerald-500/10 text-emerald-500"
            : "bg-red-500/10 text-red-500"
        }`}
      >

        {users[selectedUser].aiAssistantPreferences?.notifications
          ? t.Enabled
          : t.Disabled}

      </span>

    </div>

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AIPermissions}

  </h3>

  <div className="grid grid-cols-2 gap-4">

    <div>
      {t.CanExecuteAIWorkflows}:{" "}
      {users[selectedUser].aiPermissions?.executeWorkflows ? "✅" : "❌"}
    </div>

    <div>
      {t.CanApproveAIDecisions}:{" "}
      {users[selectedUser].aiPermissions?.approveDecisions ? "✅" : "❌"}
    </div>

    <div>
      {t.CanDeployAIAgents}:{" "}
      {users[selectedUser].aiPermissions?.deployAgents ? "✅" : "❌"}
    </div>

    <div>
      {t.CanTrainAIModels}:{" "}
      {users[selectedUser].aiPermissions?.trainModels ? "✅" : "❌"}
    </div>

    <div className="col-span-2">
      {t.CanAccessEnterpriseKnowledge}:{" "}
      {users[selectedUser].aiPermissions?.enterpriseKnowledge ? "✅" : "❌"}
    </div>

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.LoginActivity}

  </h3>

  <div className="rounded-lg border border-border">

    <div className="flex items-center justify-between border-b p-3">

      <div>

        <p className="font-medium">

          Chrome • Windows

        </p>

        <p className="text-xs text-muted-foreground">

          Today • 192.168.1.10

        </p>

      </div>

      <span className="rounded-full bg-emerald-500/10 text-emerald-500 px-3 py-1 text-xs">

        Success

      </span>

    </div>

    <div className="flex items-center justify-between p-3">

      <div>

        <p className="font-medium">

          Edge • Windows

        </p>

        <p className="text-xs text-muted-foreground">

          Yesterday • 192.168.1.15

        </p>

      </div>

      <span className="rounded-full bg-emerald-500/10 text-emerald-500 px-3 py-1 text-xs">

        Success

      </span>

    </div>

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AIUsageStatistics}

  </h3>

  <div className="grid grid-cols-2 gap-6">

    <div>

      <p className="text-sm text-muted-foreground">

        {t.AICommandsExecuted}

      </p>

      <span className="font-semibold">

        {users[selectedUser].aiUsage?.commandsExecuted}

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.AutomationsTriggered}

      </p>

      <span className="font-semibold">

        {users[selectedUser].aiUsage?.automationsTriggered}

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.HoursSaved}

      </p>

      <span className="font-semibold">

        {users[selectedUser].aiUsage?.hoursSaved} h

      </span>

    </div>

    <div>

      <p className="text-sm text-muted-foreground">

        {t.LastAIInteraction}

      </p>

      <span className="font-semibold">

        {users[selectedUser].aiUsage?.lastInteraction}

      </span>

    </div>

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AIRecommendations}

  </h3>

  {(users[selectedUser].aiRecommendations ?? []).length > 0 ? (

    <div className="space-y-2">

      {users[selectedUser].aiRecommendations!.map((recommendation) => (

        <div
          key={recommendation}
          className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm"
        >

          💡 {recommendation}

        </div>

      ))}

    </div>

  ) : (

    <p className="text-sm text-muted-foreground">

      {t.NoRecommendations}

    </p>

  )}

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AIActivityTimeline}

  </h3>

  <div className="space-y-3">

    {(users[selectedUser].aiTimeline ?? []).map((item) => (

      <div
        key={item}
        className="rounded-lg border border-border bg-muted/40 p-3 text-sm"
      >

        🤖 {item}

      </div>

    ))}

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AIWorkflowHistory}

  </h3>

  <div className="space-y-3">

    {(users[selectedUser].aiWorkflowHistory ?? []).map((workflow) => (

      <div
        key={workflow}
        className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm"
      >

        ⚙️ {workflow}

      </div>

    ))}

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AIDecisionHistory}

  </h3>

  <div className="space-y-3">

    {(users[selectedUser].aiDecisionHistory ?? []).map((decision) => (

      <div
        key={decision}
        className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm"
      >

        🧠 {decision}

      </div>

    ))}

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.UserNotes}

  </h3>

  <textarea
    className="w-full rounded-lg border border-border bg-background p-3 text-sm"
    rows={4}
    value={users[selectedUser].notes ?? ""}
    onChange={(e) => {

      const updatedUsers = [...users];

      updatedUsers[selectedUser] = {

        ...updatedUsers[selectedUser],

        notes: e.target.value,

      };

      setUsers(updatedUsers);

    }}
  />

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.UserTags}

  </h3>

  <div className="flex flex-wrap gap-2">

    {(users[selectedUser].tags ?? []).map((tag) => (

      <span
        key={tag}
        className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium"
      >

        {tag}

      </span>

    ))}

  </div>

</div>

<div className="mt-8">

  <h3 className="text-sm font-semibold mb-4">

    {t.AuditHistory}

  </h3>

  <div className="rounded-lg border border-border">

    <div className="border-b p-3">

  <p className="font-medium">

    {users[selectedUser].lockReason
      ? "User account locked"
      : "User profile updated"}

  </p>

  <p className="text-xs text-muted-foreground">

    {users[selectedUser].lockReason
      ? users[selectedUser].lockReason
      : "Today • Administrator"}

  </p>

</div>

    <div className="border-b p-3">

      <p className="font-medium">

        Password reset requested

      </p>

      <p className="text-xs text-muted-foreground">

        Yesterday • System

      </p>

    </div>

    <div className="p-3">

      <p className="font-medium">

        Account created

      </p>

      <p className="text-xs text-muted-foreground">

        30 days ago • Administrator

      </p>

    </div>

  </div>

</div>

      </div>

      )}

      <div className="border-t pt-6">

    <h3 className="text-sm font-semibold mb-4">

      {t.QuickActions}

    </h3>

    <div className="flex flex-wrap gap-3">

    <Button
      variant="outline"
      onClick={() => {

        if (selectedUser !== null) {

          setEditUser({
            name: users[selectedUser].name,
            email: users[selectedUser].email,
            department: users[selectedUser].department,
            role: users[selectedUser].role,
            status: users[selectedUser].status,
            login: users[selectedUser].login,
          });

        }

        setViewOpen(false);

        setEditOpen(true);

      }}
    >

      {t.EditUser}

    </Button>

    <div className="space-y-3">

  <Button
    variant="outline"
    onClick={() => {

      if (selectedUser === null) return;

      const updatedUsers = [...users];

      updatedUsers[selectedUser] = {

        ...updatedUsers[selectedUser],

        mfaEnabled:
          !updatedUsers[selectedUser].mfaEnabled,

      };

      setUsers(updatedUsers);

    }}
  >

    {selectedUser !== null &&
    users[selectedUser].mfaEnabled
      ? t.DisableMFA
      : t.EnableMFA}

  </Button>

  <Button
    variant="outline"
    onClick={() => {

      toast({

        title: t.SessionsRevoked,

        description: t.SessionsRevokedDescription,

      });

    }}
  >

    {t.SignOutAllSessions}

  </Button>

  <Input
    type="date"
    onChange={(e) => {

      if (selectedUser === null) return;

      const updatedUsers = [...users];

      updatedUsers[selectedUser] = {

        ...updatedUsers[selectedUser],

        accountExpiration: e.target.value,

      };

      setUsers(updatedUsers);

    }}
  />

</div>

    <div className="space-y-3">

  <Input
    placeholder={t.EnterLockReason}
    value={lockReason}
    onChange={(e) =>
      setLockReason(e.target.value)
    }
  />

  <Button
    variant="outline"
    onClick={() => {

      if (selectedUser !== null) {

        handleDisableUser(selectedUser);

        setLockReason("");

      }

    }}
  >

    {selectedUser !== null &&
    users[selectedUser].status === t.Active
      ? t.DisableUser
      : t.EnableUser}

  </Button>

</div>

  </div>

  </div>

      <DialogFooter>

        <Button
          onClick={() => setViewOpen(false)}
        >

          {t.Cancel}

        </Button>

      </DialogFooter>

    </DialogContent>

  </Dialog>

  <Dialog
    open={deleteOpen}
    onOpenChange={setDeleteOpen}
  >

    <DialogContent>

      <DialogHeader>

        <DialogTitle>

          {t.DeleteUser}

        </DialogTitle>

      </DialogHeader>

      <p className="text-muted-foreground">

        {t.DeleteUserConfirmation}

      </p>

      <p className="mt-2 font-semibold">

        {selectedUser !== null &&
          users[selectedUser].name}

      </p>

      <DialogFooter>

        <Button
          variant="outline"
          onClick={() => setDeleteOpen(false)}
        >

          {t.Cancel}

        </Button>

        <Button
          variant="destructive"
          onClick={handleDeleteUser}
        >

          {t.Delete}

        </Button>

      </DialogFooter>

    </DialogContent>

  </Dialog>

<Dialog
  open={bulkRoleOpen}
  onOpenChange={setBulkRoleOpen}
>

  <DialogContent className="max-w-md">

    <DialogHeader>

      <DialogTitle>

        {t.AssignRole}

      </DialogTitle>

    </DialogHeader>

    <Select
      value={bulkRole}
      onValueChange={setBulkRole}
    >

      <SelectTrigger>

        <SelectValue />

      </SelectTrigger>

      <SelectContent>

        <SelectItem value="Employee">

          {t.Employee}

        </SelectItem>

        <SelectItem value="Manager">

          {t.Manager}

        </SelectItem>

        <SelectItem value="Administrator">

          {t.Administrator}

        </SelectItem>

        <SelectItem value="Executive">

          {t.Executive}

        </SelectItem>

      </SelectContent>

    </Select>

    <DialogFooter>

      <Button
        variant="outline"
        onClick={() => setBulkRoleOpen(false)}
      >

        {t.Cancel}

      </Button>

      <Button
        onClick={() => {

          const updatedUsers = [...users];

          selectedUsers.forEach((index) => {

            updatedUsers[index] = {

              ...updatedUsers[index],

              role: bulkRole,

            };

          });

          setUsers(updatedUsers);

          setSelectedUsers([]);

          setBulkRoleOpen(false);

          toast({

            title: t.UserUpdated,

            description: t.UserUpdatedDescription,

          });

        }}
      >

        {t.SaveChanges}

      </Button>

    </DialogFooter>

  </DialogContent>

</Dialog>

<Dialog
  open={bulkDepartmentOpen}
  onOpenChange={setBulkDepartmentOpen}
>

  <DialogContent className="max-w-md">

    <DialogHeader>

      <DialogTitle>

        {t.AssignDepartment}

      </DialogTitle>

    </DialogHeader>

    <Select
      value={bulkDepartment}
      onValueChange={setBulkDepartment}
    >

      <SelectTrigger>

        <SelectValue />

      </SelectTrigger>

      <SelectContent>

        <SelectItem value="Operations">

          Operations

        </SelectItem>

        <SelectItem value="HR">

          HR

        </SelectItem>

        <SelectItem value="Finance">

          Finance

        </SelectItem>

        <SelectItem value="IT">

          IT

        </SelectItem>

      </SelectContent>

    </Select>

    <DialogFooter>

      <Button
        variant="outline"
        onClick={() => setBulkDepartmentOpen(false)}
      >

        {t.Cancel}

      </Button>

      <Button
        onClick={() => {

          const updatedUsers = [...users];

          selectedUsers.forEach((index) => {

            updatedUsers[index] = {

              ...updatedUsers[index],

              department: bulkDepartment,

            };

          });

          setUsers(updatedUsers);

          setSelectedUsers([]);

          setBulkDepartmentOpen(false);

          toast({

            title: t.UserUpdated,

            description: t.UserUpdatedDescription,

          });

        }}
      >

        {t.SaveChanges}

      </Button>

    </DialogFooter>

  </DialogContent>

</Dialog>

</div>
);
}