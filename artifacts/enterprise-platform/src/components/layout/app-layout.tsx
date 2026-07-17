import React from "react";
import { Link, useLocation } from "wouter";
import { useGetMe, useLogout, useListNotifications } from "@workspace/api-client-react";
import { translations, Language } from "@/lib/i18n";
import {
  LayoutDashboard,
  TerminalSquare,
  Building2,
  CheckSquare,
  BookOpen,
  BarChart3,
  ShieldAlert,
  LogOut,
  Bell,
  Globe,
  Moon,
  Sun,
  GitBranch,
  Bot,
  Users,
  Settings as SettingsIcon,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/language-context";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { data: user, isLoading } = useGetMe();
  const logout = useLogout();
  const { data: notifications } = useListNotifications();
  const { lang, setLang, t } = useLanguage();
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const unreadCount = Array.isArray(notifications)
  ? notifications.filter((n) => n.status === "unread").length
  : 0;



  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  React.useEffect(() => {
    if (!isLoading && !user && location !== "/login") {
      setLocation("/login");
    }
  }, [isLoading, user, location, setLocation]);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full bg-primary/20" />
      </div>
    );
  }

  if (!user && location !== "/login") return null;

  
  const role = user?.role || "employee";

  const navItems = [
    { href: "/dashboard", label: t.Overview, icon: LayoutDashboard, roles: ["employee", "manager", "executive", "admin"] },
    { href: "/workspace", label: t.Workspace, icon: TerminalSquare, roles: ["employee", "manager", "executive", "admin"] },
    { href: "/ai-assistant", label: t.AIAssistant, icon: Bot,roles: ["employee", "manager", "executive", "admin"],},
    { href: "/users", label: t.UserManagement, icon: Users, roles: ["employee", "manager", "executive", "admin"],},
    { href: "/settings", label: t.Settings, icon: SettingsIcon, roles: ["employee", "manager", "executive", "admin"],},
    { href: "/groups", label: t.Groups, icon: Users, roles: ["employee", "manager", "executive", "admin"] },
    { href: "/workflows", label: t.Workflows, icon: GitBranch, roles: ["employee", "manager", "executive", "admin"] },
    { href: "/departments", label: t.Departments, icon: Building2, roles: ["employee", "manager", "executive", "admin"] },
    { href: "/approvals", label: t.Approvals, icon: CheckSquare, roles: ["manager", "executive", "admin"] },
    { href: "/knowledge", label: t.Knowledge, icon: BookOpen, roles: ["employee", "manager", "executive", "admin"] },
    { href: "/reports", label: t.Reports, icon: BarChart3, roles: ["executive", "admin"] },
    { href: "/agents", label: "AI Agents", icon: Bot, roles: ["executive", "admin"] },
    { href: "/security", label: t.Security, icon: ShieldAlert, roles: ["admin"] },
  
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  const handleLogout = () => {
  logout.mutate(undefined, {
    onSuccess: () => {
      window.location.href = "/login";
    },
  });
};

  if (location === "/login") return <>{children}</>;

  const Sidebar = () => (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <div className="flex items-center gap-2 text-primary">
          <TerminalSquare className="w-6 h-6" />
          <span className="font-semibold text-lg tracking-tight">Nexus AI</span>
        </div>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {visibleNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm ${
              location === item.href
                ? "bg-primary text-primary-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon className="w-4 h-4 opacity-80 shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 px-2 h-auto py-2">
              <Avatar className="w-8 h-8 border border-border shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {user?.displayName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left flex-1 min-w-0">
                <span className="text-sm font-medium truncate w-full">{user?.displayName}</span>
                <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <Sun className="w-4 h-4 mr-2" />
              ) : (
                <Moon className="w-4 h-4 mr-2" />
              )}
              Toggle Theme
            </DropdownMenuItem>

            <div className="px-2 py-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <select
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
              >
                <option value="EN">English</option>
                <option value="AR">Arabic</option>
                <option value="ES">Spanish</option>
                <option value="NL">Dutch</option>
                <option value="FR">French</option>
                </select>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10">
              <LogOut className="w-4 h-4 mr-2" />
              {t.Logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="w-64 shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-base md:text-lg font-semibold capitalize">
              {location.replace("/", "") || "Overview"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6 bg-background relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-20" />
          <div className="max-w-6xl mx-auto relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
