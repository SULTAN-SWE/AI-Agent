import React from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
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
import { useLanguage } from "@/lib/language-context";

export default function UsersPage() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

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
                126
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
                118
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
                5
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
                3
              </h2>

            </div>

            <Briefcase className="w-10 h-10 text-primary" />

          </CardContent>
        </Card>

      </div>

      {/* Toolbar */}

      <Card className="border-border bg-card">

        <CardContent className="p-5">

          <div className="flex flex-col xl:flex-row gap-4">

            <div className="relative flex-1">

              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

              <Input
                className="pl-10"
                placeholder={t.SearchUsers}
              />

            </div>

            <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            {t.Filters}
            </Button>

            <Button
            className="gap-2"
            onClick={() => setOpen(true)}
            >
            <UserPlus className="w-4 h-4" />
            {t.AddUser}
            </Button>

          </div>

        </CardContent>

      </Card>

      <Card className="border-border bg-card">
  <CardContent className="p-0 overflow-x-auto">

    <table className="w-full">

      <thead className="border-b border-border bg-muted/40">

        <tr className="text-left">

          <th className="p-4">{t.Name}</th>
          <th className="p-4">{t.Email}</th>
          <th className="p-4">{t.Department}</th>
          <th className="p-4">{t.Role}</th>
          <th className="p-4">{t.Status}</th>
          <th className="p-4">{t.LastLogin}</th>
          <th className="p-4 text-center">{t.Actions}</th>

        </tr>

      </thead>

      <tbody>

        {[
          {
            name: "John Doe",
            email: "john@nexus.ai",
            department: "Operations",
            role: "Manager",
            status: t.Active,
            login: "2 min ago",
          },
          {
            name: "Sarah Ahmed",
            email: "sarah@nexus.ai",
            department: "HR",
            role: "Administrator",
            status: t.Active,
            login: "10 min ago",
          },
          {
            name: "Michael Brown",
            email: "michael@nexus.ai",
            department: "IT",
            role: "Employee",
            status: t.Pending,
            login: "-",
          },
        ].map((user) => (

          <tr
            key={user.email}
            className="border-b border-border hover:bg-muted/30 transition"
          >

            <td className="p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                  {user.name.charAt(0)}
                </div>

                <span>{user.name}</span>

              </div>

            </td>

            <td className="p-4">{user.email}</td>

            <td className="p-4">{user.department}</td>

            <td className="p-4">{user.role}</td>

            <td className="p-4">

              <span className="rounded-full bg-emerald-500/10 text-emerald-500 px-3 py-1 text-sm">

                {user.status}

              </span>

            </td>

            <td className="p-4">{user.login}</td>

            <td className="p-4 text-center">

              <Button variant="ghost" size="icon">

                <MoreVertical className="w-4 h-4" />

              </Button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </CardContent>
</Card>
<Dialog open={open} onOpenChange={setOpen}>

  <DialogContent className="max-w-2xl">

    <DialogHeader>

      <DialogTitle>
        {t.AddUser}
      </DialogTitle>

    </DialogHeader>

    <div className="grid grid-cols-2 gap-5 mt-4">

      <Input placeholder={t.FullName} />

      <Input placeholder={t.Email} />

      <Input placeholder={t.Department} />

      <select className="rounded-lg border border-border bg-background p-3">

        <option>{t.Employee}</option>

        <option>{t.Manager}</option>

        <option>{t.Administrator}</option>

        <option>{t.Executive}</option>

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
        onClick={() => setOpen(false)}
      >
        {t.Cancel}
      </Button>

      <Button>
        {t.CreateUser}
      </Button>

    </DialogFooter>

  </DialogContent>

</Dialog>

    </div>
  );
}