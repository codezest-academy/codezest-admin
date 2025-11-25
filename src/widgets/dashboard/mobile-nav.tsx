"use client";

import { SidebarNavContent } from "./sidebar-nav-content";

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  return (
    <div className="flex flex-col h-full bg-neutral-100">
      {/* Shared Navigation Content - Always Expanded on Mobile */}
      <SidebarNavContent collapsed={false} onNavigate={onClose} />
    </div>
  );
}
