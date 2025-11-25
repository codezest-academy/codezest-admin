"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  FileText,
  Users,
  GraduationCap,
  Settings,
  Palette,
  Boxes,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/dashboard" },
  { title: "Modules", icon: BookOpen, url: "/dashboard/modules" },
  { title: "Materials", icon: FileText, url: "/dashboard/materials" },
  { title: "Quizzes", icon: GraduationCap, url: "/dashboard/quizzes" },
  { title: "Users", icon: Users, url: "/dashboard/users" },
  { title: "Courses", icon: Boxes, url: "/dashboard/courses" },
  { title: "UI Kit", icon: Palette, url: "/ui-kit" },
  { title: "Components", icon: Boxes, url: "/components" },
  { title: "Settings", icon: Settings, url: "/dashboard/settings" },
];

interface SidebarNavContentProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

export function SidebarNavContent({
  collapsed = false,
  onNavigate,
}: SidebarNavContentProps) {
  const pathname = usePathname();

  return (
    <>
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
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            const baseClasses = collapsed
              ? "flex justify-center items-center w-12 h-12 mx-auto rounded-xl transition-all duration-200"
              : "flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group";

            return (
              <Link
                key={item.title}
                href={item.url}
                onClick={onNavigate}
                className={`${baseClasses} ${
                  isActive
                    ? "bg-primary text-white font-semibold shadow-md border border-primary-600"
                    : "text-primary-700 hover:bg-white hover:text-primary-800 hover:shadow-sm font-medium"
                }`}
              >
                <item.icon
                  className={`shrink-0 transition-all duration-200 ${
                    collapsed
                      ? "h-5 w-5"
                      : "h-[18px] w-[18px] group-hover:scale-110"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {!collapsed && (
                  <>
                    <span className="text-[14px] tracking-wide">
                      {item.title}
                    </span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-sm" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
