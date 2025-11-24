"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Layers,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { useState, useEffect } from "react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Modules", url: "/modules", icon: Layers },
  { title: "Materials", url: "/materials", icon: FileText },
  { title: "Quizzes", url: "/quizzes", icon: CheckCircle2 },
  { title: "Users", url: "/dashboard/students", icon: Users },
  { title: "Courses", url: "/dashboard/courses", icon: BookOpen },
  { title: "Settings", url: "/settings/profile", icon: Settings },
];

const userInfo = {
  name: "Alex Johnson",
  role: "Admin",
  avatar: "https://github.com/shadcn.png",
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative h-full border-r ${
        collapsed ? "w-20" : "w-64"
      } bg-card flex flex-col transition-all duration-300`}
    >
      {/* Toggle Button - Only render on client */}
      {mounted && (
        <Button
          onClick={() => setCollapsed(!collapsed)}
          variant="ghost"
          size="icon"
          className="absolute top-5 -right-4 z-50 h-8 w-8 rounded-full border border-border bg-card text-primary shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-primary hover:text-white hover:shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
      )}

      {/* Logo Section */}
      <div className="border-b border-border py-2 px-4">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center w-full" : "gap-2"
            }`}
          >
            <div className={`logo-container ${collapsed ? "mx-auto" : ""}`}>
              <div className="my-3">
                <h1
                  className={`font-bold text-primary ${
                    collapsed ? "text-xl" : "text-2xl"
                  }`}
                >
                  {collapsed ? "CZ" : "CodeZest"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-2 pt-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            const baseClasses = collapsed
              ? "flex justify-center items-center w-12 h-12 mx-auto rounded-lg transition-colors"
              : "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors";

            return (
              <Link
                key={item.title}
                href={item.url}
                className={`${baseClasses} ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${isActive ? "text-primary" : ""}`}
                />
                {!collapsed && (
                  <>
                    <span className="font-medium">{item.title}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-4 bg-primary rounded-full" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
