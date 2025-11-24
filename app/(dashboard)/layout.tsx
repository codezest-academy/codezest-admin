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
import { Badge } from "@/ui/badge";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
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
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Add keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (window.innerWidth >= 1024) {
          // Desktop: Focus the input
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
    <div className="h-screen flex w-full bg-background overflow-hidden">
      {/* Desktop Sidebar - Fixed */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
        <DashboardSidebar />
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
          <MobileNav onClose={() => setMobileMenuOpen(false)} />
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
      <div className="flex-1 flex flex-col md:pl-64 h-full overflow-hidden transition-all duration-300">
        {/* Scrollable Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto h-full relative">
          {/* Sticky Header inside scrollable area */}
          <Navbar
            scrollContainerRef={scrollRef as React.RefObject<HTMLElement>}
          >
            <NavBody>
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Mobile Hamburger Menu */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Breadcrumbs - Visible on mobile only */}
                <Breadcrumb className="lg:hidden">
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
                      <BreadcrumbPage className="font-medium">
                        Dashboard
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                {/* Command Search - Direct in header */}
                <div className="hidden lg:block w-full max-w-md relative z-50">
                  <Command
                    className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors overflow-visible [&_[cmdk-input-wrapper]]:border-none"
                    shouldFilter={true}
                  >
                    <div className="relative">
                      <CommandInput
                        ref={desktopInputRef}
                        placeholder="Search dashboard..."
                        className="h-10 focus:ring-0 bg-transparent text-sm"
                        onFocus={() => setDesktopSearchOpen(true)}
                        onBlur={() =>
                          setTimeout(() => setDesktopSearchOpen(false), 200)
                        }
                      />
                      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white dark:bg-neutral-950 px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
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
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Mobile Search Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-muted-foreground hover:text-foreground"
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
                      className="relative text-muted-foreground hover:text-foreground"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Notifications
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          You have 3 unread messages
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-[300px] overflow-y-auto">
                      <DropdownMenuItem className="cursor-pointer">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium">
                            New Student Enrolled
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Alex Johnson joined "Advanced React Patterns"
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            2 mins ago
                          </p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium">System Update</p>
                          <p className="text-xs text-muted-foreground">
                            Platform maintenance scheduled for tonight
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            1 hour ago
                          </p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium">New Review</p>
                          <p className="text-xs text-muted-foreground">
                            Sarah Smith left a 5-star review
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            3 hours ago
                          </p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer justify-center text-primary font-medium">
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
                      className="relative h-10 w-auto rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 pl-1 pr-3 py-1 flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                    >
                      <Avatar className="h-8 w-8 border border-neutral-200 dark:border-neutral-800">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
