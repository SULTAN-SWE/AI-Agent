  import {
    Users,
    UserPlus,
    Search,
    Shield,
    Briefcase,
    MoreVertical,
  } from "lucide-react";
  import { useState } from "react";

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
    name: string;
    email: string;
    department: string;
    role: string;
    status: string;
    login: string;
    updatedAt: string;
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
      email: "john@nexus.ai",
      department: "Operations",
      role: "Manager",
      status: t.Active,
      login: "2 min ago",
      updatedAt: "Today",
    },
    {
      name: "Sarah Ahmed",
      email: "sarah@nexus.ai",
      department: "HR",
      role: "Administrator",
      status: t.Active,
      login: "10 min ago",
      updatedAt: "Today",
    },
    {
      name: "Michael Brown",
      email: "michael@nexus.ai",
      department: "IT",
      role: "Employee",
      status: t.Pending,
      login: "-",
      updatedAt: "Yesterday",
    },
  ]);

    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
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
    ...newUser,
    login: "Just now",
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

    const deletedUser = users[selectedUser];

    setUsers(
      users.filter((_, index) => index !== selectedUser)
    );

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

      <DropdownMenuItem>

        ✓ {t.Department}

      </DropdownMenuItem>

      <DropdownMenuItem>

        ✓ {t.Role}

      </DropdownMenuItem>

      <DropdownMenuItem>

        ✓ {t.Status}

      </DropdownMenuItem>

      <DropdownMenuItem>

        ✓ {t.LastLogin}

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

      // Keep your current Export CSV code here unchanged

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
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      role: role.trim(),
      status: status.trim(),
      login: login.trim(),
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

      filteredUsers.map((user, index) => (

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

              <td className="p-4">

              <span className="rounded-lg bg-muted px-3 py-1 text-xs">

                {user.department}

              </span>

            </td>

              <td className="p-4">

              <span className="rounded-lg bg-primary/10 text-primary px-3 py-1 text-xs font-medium">

                {user.role}

              </span>

            </td>

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

              <td className="p-4">{user.login}</td>

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

            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {

                setSelectedUser(index);

                setDeleteOpen(true);

              }}
            >

            {t.DeleteUser}

          </DropdownMenuItem>

          
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
    {users.length === 0 ? 0 : 1}
    –
    {users.length}
    {" "}
    {t.Of}{" "}
    {users.length}
    {" "}
    {t.Users}

  </p>

    <div className="flex gap-2">

      <Button variant="outline">
        {t.Previous}
      </Button>

      <Button>
        1
      </Button>

      <Button variant="outline">
        2
      </Button>

      <Button variant="outline">
        3
      </Button>

      <Button variant="outline">
        {t.Next}
      </Button>

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

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">

              {users[selectedUser].name.charAt(0)}

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

          <div className="grid grid-cols-2 gap-6">

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

    <Button
      variant="outline"
      onClick={handleResetPassword}
    >

      {t.ResetPassword}

    </Button>

    <Button
      variant="outline"
      onClick={() => {

        if (selectedUser !== null) {

          handleDisableUser(selectedUser);

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


      </div>
    );
  }