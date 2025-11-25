"use client";

import { DashboardSidebar } from "@/widgets/dashboard/sidebar";
import { MobileNav } from "@/widgets/dashboard/mobile-nav";
import {
  Bell,
  Search,
  ChevronRight,
  Home,
  Menu,
  FileText,
  Users,
  BookOpen,
  GraduationCap,
  LogOut,
  ChevronDown,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Separator } from "@/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/ui/sheet";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/ui/dropdown-menu";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Navbar, NavBody } from "@/components/ui/resizable-navbar";

const searchItems = [
  { title: "Dashboard", url: "/dashboard", icon: FileText },
  { title: "Students", url: "/dashboard/students", icon: Users },
  { title: "Courses", url: "/dashboard/courses", icon: BookOpen },
  { title: "Instructors", url: "/dashboard/instructors", icon: GraduationCap },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const notifications = [
    {
      title: "New Student Enrolled",
      description: 'Alex Johnson joined "Advanced React Patterns"',
      time: "2 mins ago",
    },
    {
      title: "System Update",
      description: "Platform maintenance scheduled for tonight",
      time: "1 hour ago",
    },
    {
      title: "New Review",
      description: "Sarah Smith left a 5-star review",
      time: "3 hours ago",
    },
  ];

  // Add keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (window.innerWidth >= 768) {
          // Tablet/Desktop: Focus the input
          desktopInputRef.current?.focus();
        } else {
          // Mobile: Open the dialog
          setMobileSearchOpen((open) => !open);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setMobileSearchOpen(false);
    setDesktopSearchOpen(false);
    router.push(url);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      suppressHydrationWarning
      className="h-screen flex w-full bg-neutral-50 overflow-hidden"
    >
      {/* Desktop Sidebar - Fixed */}
      <div
        suppressHydrationWarning
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 z-50 bg-neutral-100 transition-all duration-300 ${
          sidebarCollapsed ? "md:w-20" : "md:w-56 lg:w-64"
        }`}
      >
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-80 sm:w-96">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>
              Access dashboard navigation and settings
            </SheetDescription>
          </SheetHeader>
          <MobileNav onClose={() => setMobileMenuOpen(false)} />{" "}
        </SheetContent>
      </Sheet>

      {/* Notifications Sheet */}
      <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              You have {notifications.length} unread messages
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-6">
              {notifications.map((notification, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Search Dialog */}
      <CommandDialog open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Links">
            {searchItems.map((item) => (
              <CommandItem
                key={item.url}
                onSelect={() => handleSelect(item.url)}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Main Content Wrapper - Fixed height, no scroll */}
      <div
        suppressHydrationWarning
        className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? "md:pl-20" : "md:pl-56 lg:pl-64"
        }`}
      >
        {/* Scrollable Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto h-full relative">
          {/* Sticky Header inside scrollable area */}
          <Navbar
            scrollContainerRef={scrollRef as React.RefObject<HTMLElement>}
          >
            <NavBody>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
                {/* Mobile Hamburger Menu */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-muted-foreground hover:text-foreground shrink-0"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Breadcrumbs - Visible on mobile only */}
                <Breadcrumb className="md:hidden flex-1 min-w-0">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">
                        <Home className="h-4 w-4" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-medium truncate">
                        Dashboard
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                {/* Command Search - Direct in header */}
                <div className="hidden md:block w-full max-w-[200px] lg:max-w-xs xl:max-w-md relative z-50">
                  <Command
                    className="rounded-full border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-400 transition-all duration-200 overflow-visible shadow-sm hover:shadow-md [&_[cmdk-input-wrapper]]:border-none"
                    shouldFilter={true}
                    suppressHydrationWarning
                  >
                    <div className="relative">
                      <CommandInput
                        ref={desktopInputRef}
                        placeholder="Search"
                        className="h-10 focus:ring-0 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-500"
                        onFocus={() => setDesktopSearchOpen(true)}
                        onBlur={() =>
                          setTimeout(() => setDesktopSearchOpen(false), 200)
                        }
                      />
                      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-300 bg-white dark:bg-neutral-950 px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                    </div>

                    {desktopSearchOpen && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-popover rounded-xl border shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100 ring-1 ring-black/5">
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup heading="Quick Links">
                            {searchItems.map((item) => (
                              <CommandItem
                                key={item.url}
                                onSelect={() => handleSelect(item.url)}
                                className="cursor-pointer"
                              >
                                <item.icon className="mr-2 h-4 w-4" />
                                <span>{item.title}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </div>
                    )}
                  </Command>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
                {/* Mobile Search Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* Notifications Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`relative h-9 w-9 sm:h-10 sm:w-10 rounded-full border transition-all shadow-sm hover:shadow-md ${
                        notifications.length > 0
                          ? "border-primary-200 bg-primary-50 hover:bg-primary-100 text-primary-600 hover:text-primary-700"
                          : "border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900"
                      }`}
                    >
                      <Bell className="h-5 w-5" />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full bg-primary-500 text-white text-xs font-semibold ring-2 ring-white">
                          {notifications.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Notifications
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          You have {notifications.length} unread messages
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.map((notification, index) => (
                        <div key={index}>
                          <DropdownMenuItem className="cursor-pointer">
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium">
                                {notification.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {notification.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </DropdownMenuItem>
                          {index < notifications.length - 1 && (
                            <DropdownMenuSeparator />
                          )}
                        </div>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer justify-center text-primary font-medium"
                      onSelect={() => setNotificationsOpen(true)}
                    >
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator
                  orientation="vertical"
                  className="h-6 hidden sm:block"
                />

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 sm:h-10 w-auto rounded-full border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 pl-1 pr-2 sm:pr-3 py-1 flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm hover:shadow-md"
                    >
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-neutral-300">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neutral-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Alex Johnson
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          alex@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </NavBody>
          </Navbar>

          {/* Main Content Area */}
          <main className="p-4 sm:p-6 lg:p-8 mt-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
