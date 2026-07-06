import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/app-layout";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";

import Dashboard from "@/pages/dashboard";
import Workspace from "@/pages/workspace";
import Departments from "@/pages/departments";
import Approvals from "@/pages/approvals";
import Knowledge from "@/pages/knowledge";
import Reports from "@/pages/reports";
import Security from "@/pages/security";
import Notifications from "@/pages/notifications";
import Workflows from "@/pages/workflows";
import Agents from "@/pages/agents";
import { LanguageProvider } from "@/lib/language-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        if (error && typeof error === "object" && "status" in error) {
          const status = (error as { status: number }).status;
          if (status === 401 || status === 403 || status === 404) return false;
        }
        return failureCount < 2;
      },
      staleTime: 30_000,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        {() => {
          window.location.replace("/dashboard");
          return null;
        }}
      </Route>
      <Route path="/dashboard"><AppLayout><Dashboard /></AppLayout></Route>
      <Route path="/workspace"><AppLayout><Workspace /></AppLayout></Route>
      <Route path="/departments"><AppLayout><Departments /></AppLayout></Route>
      <Route path="/approvals"><AppLayout><Approvals /></AppLayout></Route>
      <Route path="/knowledge"><AppLayout><Knowledge /></AppLayout></Route>
      <Route path="/reports"><AppLayout><Reports /></AppLayout></Route>
      <Route path="/security"><AppLayout><Security /></AppLayout></Route>
      <Route path="/notifications"><AppLayout><Notifications /></AppLayout></Route>
      <Route path="/workflows"><AppLayout><Workflows /></AppLayout></Route>
      <Route path="/agents"><AppLayout><Agents /></AppLayout></Route>
      <Route><AppLayout><NotFound /></AppLayout></Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  </LanguageProvider>
</QueryClientProvider>
  );
}

export default App;
