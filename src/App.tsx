import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppSidebar } from "@/components/AppSidebar";
import Landing from "./Landing";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Companies from "./pages/Companies";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CompanyStudents from "@/pages/CompanyStudents";

const queryClient = new QueryClient();

const AppShell = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (isLanding) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-14 border-b border-border bg-card flex items-center px-4">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1" />
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id/students" element={<CompanyStudents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="light">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;