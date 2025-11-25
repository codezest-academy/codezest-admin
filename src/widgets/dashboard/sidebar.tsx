"use client";

import { useState, useEffect } from "react";
import { Button } from "@/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { SidebarNavContent } from "./sidebar-nav-content";

interface DashboardSidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function DashboardSidebar({
  collapsed,
  onCollapsedChange,
}: DashboardSidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    onCollapsedChange(!collapsed);
  };

  return (
    <div
      suppressHydrationWarning
      className={`relative h-full border-r border-neutral-200 ${
        collapsed ? "w-20" : "w-56 lg:w-64"
      } bg-neutral-100 flex flex-col transition-all duration-300 shadow-sm`}
    >
      {/* Toggle Button - Desktop Only */}
      {mounted && (
        <Button
          onClick={handleToggle}
          variant="ghost"
          size="icon"
          className="absolute top-5 -right-4 z-50 h-8 w-8 rounded-full border-2 border-primary-200 bg-primary-50 text-primary-600 shadow-md shadow-primary-200/50 hover:bg-primary-100 hover:text-primary-700 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-300/50 transition-all duration-200"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <ChevronsLeft className="h-4 w-4" strokeWidth={2.5} />
          )}
        </Button>
      )}

      {/* Shared Navigation Content */}
      <SidebarNavContent collapsed={collapsed} />
    </div>
  );
}
