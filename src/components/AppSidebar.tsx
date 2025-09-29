import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BarChart3, 
  Settings,
  Sun,
  Moon
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Students", url: "/students", icon: Users },
  { title: "Companies", url: "/companies", icon: Building2 },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClasses = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-sidebar-border bg-sidebar`}
    >
      <SidebarContent className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">
                <img src="/logo.png" alt="logo" className="w-32 " />
              </h2>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/80 text-xs uppercase tracking-wide mb-3">
              Navigation
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses(isActive(item.url))}>
                      <item.icon className={`h-4 w-4 ${collapsed ? "mx-auto" : ""}`} />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Theme Toggle */}
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            onClick={toggleTheme}
            className={`w-full ${collapsed ? "p-2" : "justify-start"} text-sidebar-foreground hover:bg-sidebar-accent`}
          >
            {theme === "light" ? (
              <Moon className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
            ) : (
              <Sun className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
            )}
            {!collapsed && <span className="text-sm">Switch to {theme === "light" ? "Dark" : "Light"}</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}