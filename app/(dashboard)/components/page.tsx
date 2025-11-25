"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { Separator } from "@/ui/separator";
import { Skeleton } from "@/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import {
  ChevronRight,
  Home,
  MoreVertical,
  Settings,
  User,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  UserPlus,
} from "lucide-react";

export default function ComponentsPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">
            Components Library
          </h1>
          <p className="text-lg text-neutral-600">
            Complete showcase of all UI components with usage examples and
            guidelines
          </p>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "Forms",
                "Dialogs",
                "Dropdowns",
                "Tables",
                "Tabs",
                "Tooltips",
                "Breadcrumbs",
                "Skeletons",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors text-sm font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <section id="forms" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Form Components
          </h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
              <CardDescription>
                Text inputs for user data collection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Text Input</Label>
                  <Input
                    id="text-input"
                    type="text"
                    placeholder="Enter text..."
                  />
                  <p className="text-xs text-neutral-500">
                    Use for general text input
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-input">Email Input</Label>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="email@example.com"
                  />
                  <p className="text-xs text-neutral-500">
                    Use for email addresses
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-input">Password Input</Label>
                  <Input
                    id="password-input"
                    type="password"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-neutral-500">
                    Use for password fields
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disabled-input">Disabled Input</Label>
                  <Input
                    id="disabled-input"
                    type="text"
                    placeholder="Disabled"
                    disabled
                  />
                  <p className="text-xs text-neutral-500">
                    Disabled state example
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Dropdowns</CardTitle>
              <CardDescription>
                Dropdown menus for option selection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Select</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-neutral-500">
                    Use for single selection from a list
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>With Groups</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-neutral-500">
                    Organize options into groups
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkboxes</CardTitle>
              <CardDescription>Boolean selection controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={checked}
                  onCheckedChange={(value) => setChecked(value as boolean)}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <Label htmlFor="marketing">Receive marketing emails</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled">Disabled checkbox</Label>
              </div>
              <p className="text-xs text-neutral-500 mt-4">
                Use for yes/no or on/off selections
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Dialog Components */}
        <section id="dialogs" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Dialogs & Modals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dialog (Modal)</CardTitle>
                <CardDescription>
                  Centered overlay for focused interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <p className="text-xs text-neutral-500">
                  Use for important actions requiring user confirmation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sheet (Side Panel)</CardTitle>
                <CardDescription>
                  Slide-in panel from screen edge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Left</Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Left Sheet</SheetTitle>
                        <SheetDescription>
                          This sheet slides in from the left side.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <p className="text-sm text-neutral-600">
                          Sheet content goes here...
                        </p>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Right</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Right Sheet</SheetTitle>
                        <SheetDescription>
                          This sheet slides in from the right side.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
                <p className="text-xs text-neutral-500">
                  Use for filters, settings, or additional information
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dropdown Menus */}
        <section id="dropdowns" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Dropdown Menus
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Dropdown Menu Variants</CardTitle>
              <CardDescription>
                Contextual menus for actions and navigation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Basic Menu</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">With Icons</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        Actions
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-xs text-neutral-500">
                Use for contextual actions, user menus, and navigation options
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tables */}
        <section id="tables" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Tables</h2>

          <Card>
            <CardHeader>
              <CardTitle>Data Table</CardTitle>
              <CardDescription>
                Structured data display with rows and columns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of recent students</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="text-right">85%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-700">
                        Pending
                      </span>
                    </TableCell>
                    <TableCell className="text-right">45%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="text-right">92%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-neutral-500 mt-4">
                Use for displaying structured data like lists, reports, and
                dashboards
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tabs */}
        <section id="tabs" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Tabs</h2>

          <Card>
            <CardHeader>
              <CardTitle>Tab Navigation</CardTitle>
              <CardDescription>
                Organize content into separate views
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="rounded-lg border border-neutral-200 p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Overview Content
                    </h3>
                    <p className="text-sm text-neutral-600">
                      This is the overview tab content. It shows a summary of
                      key information.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                  <div className="rounded-lg border border-neutral-200 p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Analytics Content
                    </h3>
                    <p className="text-sm text-neutral-600">
                      This is the analytics tab content. It displays detailed
                      metrics and charts.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="reports" className="space-y-4">
                  <div className="rounded-lg border border-neutral-200 p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Reports Content
                    </h3>
                    <p className="text-sm text-neutral-600">
                      This is the reports tab content. It shows generated
                      reports and exports.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              <p className="text-xs text-neutral-500 mt-4">
                Use for organizing related content that doesn't need to be
                viewed simultaneously
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tooltips */}
        <section id="tooltips" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Tooltips</h2>

          <Card>
            <CardHeader>
              <CardTitle>Tooltip Examples</CardTitle>
              <CardDescription>Contextual information on hover</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="destructive">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add new user</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-neutral-500">
                Use for providing additional context without cluttering the UI
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Breadcrumbs */}
        <section id="breadcrumbs" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Breadcrumbs
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Navigation Breadcrumbs</CardTitle>
              <CardDescription>
                Show current location in hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Components</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <p className="text-xs text-neutral-500">
                Use for showing navigation path and allowing quick navigation to
                parent pages
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Skeletons */}
        <section id="skeletons" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Loading States
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Skeleton Loaders</CardTitle>
              <CardDescription>
                Placeholder UI while content loads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <p className="text-xs text-neutral-500">
                Use while content is loading to improve perceived performance
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Separator */}
        <section id="separator" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Separators
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Visual Dividers</CardTitle>
              <CardDescription>Separate content sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Horizontal Separator
                  </h4>
                  <p className="text-sm text-neutral-600">Content above</p>
                  <Separator className="my-4" />
                  <p className="text-sm text-neutral-600">Content below</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Vertical Separator
                  </h4>
                  <div className="flex h-20 items-center">
                    <div className="flex-1 text-center">
                      <p className="text-sm text-neutral-600">Left</p>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex-1 text-center">
                      <p className="text-sm text-neutral-600">Right</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-500">
                Use to visually separate content sections or groups
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-500">
          <p>
            CodeZest Components Library • All components are accessible and
            responsive
          </p>
        </div>
      </div>
    </div>
  );
}
