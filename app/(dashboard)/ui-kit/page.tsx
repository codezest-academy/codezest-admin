"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";
import { Badge } from "@/components/ui/primitives/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/primitives/avatar";
import {
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
  Star,
  Heart,
  Download,
  Upload,
  Settings,
  User,
  Mail,
  Phone,
} from "lucide-react";

export default function UIKitPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">
            CodeZest Design System
          </h1>
          <p className="text-lg text-neutral-600">
            A comprehensive showcase of all design tokens, components, and
            patterns
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
                "Colors",
                "Typography",
                "Spacing",
                "Shadows",
                "Buttons",
                "Cards",
                "Badges",
                "Icons",
                "Forms",
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

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Color Palette
          </h2>

          {/* Primary Colors */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Primary - Knowledge Blue</CardTitle>
              <CardDescription>
                Used for primary actions, links, and active states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { name: "50", color: "bg-primary-50", hex: "#EFF6FF" },
                  { name: "100", color: "bg-primary-100", hex: "#DBEAFE" },
                  { name: "300", color: "bg-primary-300", hex: "#60A5FA" },
                  { name: "400", color: "bg-primary-400", hex: "#3B82F6" },
                  { name: "500", color: "bg-primary-500", hex: "#2563EB" },
                  { name: "700", color: "bg-primary-700", hex: "#1E3A5F" },
                  { name: "900", color: "bg-primary-900", hex: "#0B1D3E" },
                ].map((shade) => (
                  <div key={shade.name} className="space-y-2">
                    <div
                      className={`${shade.color} h-20 rounded-lg border border-neutral-200 shadow-sm`}
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-neutral-900">
                        {shade.name}
                      </div>
                      <div className="text-neutral-500 font-mono">
                        {shade.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Success Colors */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Success - Achievement Green</CardTitle>
              <CardDescription>
                Used for success states, achievements, and correct answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: "50", color: "bg-success-50", hex: "#ECFDF5" },
                  { name: "100", color: "bg-success-100", hex: "#D1FAE5" },
                  { name: "300", color: "bg-success-300", hex: "#6EE7B7" },
                  { name: "500", color: "bg-success-500", hex: "#10B981" },
                  { name: "700", color: "bg-success-700", hex: "#047857" },
                ].map((shade) => (
                  <div key={shade.name} className="space-y-2">
                    <div
                      className={`${shade.color} h-20 rounded-lg border border-neutral-200 shadow-sm`}
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-neutral-900">
                        {shade.name}
                      </div>
                      <div className="text-neutral-500 font-mono">
                        {shade.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warning Colors */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Warning - Attention Orange</CardTitle>
              <CardDescription>
                Used for warnings, pending states, and caution messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: "50", color: "bg-warning-50", hex: "#FFFBEB" },
                  { name: "100", color: "bg-warning-100", hex: "#FEF3C7" },
                  { name: "400", color: "bg-warning-400", hex: "#FBBF24" },
                  { name: "500", color: "bg-warning-500", hex: "#F59E0B" },
                  { name: "700", color: "bg-warning-700", hex: "#B45309" },
                ].map((shade) => (
                  <div key={shade.name} className="space-y-2">
                    <div
                      className={`${shade.color} h-20 rounded-lg border border-neutral-200 shadow-sm`}
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-neutral-900">
                        {shade.name}
                      </div>
                      <div className="text-neutral-500 font-mono">
                        {shade.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Error Colors */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Error - Alert Red</CardTitle>
              <CardDescription>
                Used for errors, incorrect answers, and critical alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: "50", color: "bg-error-50", hex: "#FEF2F2" },
                  { name: "100", color: "bg-error-100", hex: "#FEE2E2" },
                  { name: "400", color: "bg-error-400", hex: "#F87171" },
                  { name: "500", color: "bg-error-500", hex: "#EF4444" },
                  { name: "700", color: "bg-error-700", hex: "#B91C1C" },
                ].map((shade) => (
                  <div key={shade.name} className="space-y-2">
                    <div
                      className={`${shade.color} h-20 rounded-lg border border-neutral-200 shadow-sm`}
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-neutral-900">
                        {shade.name}
                      </div>
                      <div className="text-neutral-500 font-mono">
                        {shade.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accent Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Accent Colors</CardTitle>
              <CardDescription>
                Used for categories, tags, and visual variety
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  {
                    name: "Purple",
                    color: "bg-accent-purple",
                    hex: "#8B5CF6",
                  },
                  {
                    name: "Indigo",
                    color: "bg-accent-indigo",
                    hex: "#6366F1",
                  },
                  { name: "Teal", color: "bg-accent-teal", hex: "#14B8A6" },
                  {
                    name: "Orange",
                    color: "bg-accent-orange",
                    hex: "#F97316",
                  },
                  { name: "Pink", color: "bg-accent-pink", hex: "#EC4899" },
                ].map((accent) => (
                  <div key={accent.name} className="space-y-2">
                    <div
                      className={`${accent.color} h-20 rounded-lg border border-neutral-200 shadow-sm`}
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-neutral-900">
                        {accent.name}
                      </div>
                      <div className="text-neutral-500 font-mono">
                        {accent.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Typography
          </h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Type Scale</CardTitle>
              <CardDescription>
                Font sizes from 12px to 60px following a consistent scale
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { class: "text-xs", size: "12px", name: "Extra Small" },
                { class: "text-sm", size: "14px", name: "Small" },
                { class: "text-base", size: "16px", name: "Base" },
                { class: "text-lg", size: "18px", name: "Large" },
                { class: "text-xl", size: "20px", name: "Extra Large" },
                { class: "text-2xl", size: "24px", name: "2X Large" },
                { class: "text-3xl", size: "30px", name: "3X Large" },
                { class: "text-4xl", size: "36px", name: "4X Large" },
                { class: "text-5xl", size: "48px", name: "5X Large" },
              ].map((type) => (
                <div
                  key={type.class}
                  className="flex items-baseline gap-4 pb-4 border-b border-neutral-200 last:border-0"
                >
                  <div className="w-32 shrink-0">
                    <div className="text-sm font-semibold text-neutral-900">
                      {type.name}
                    </div>
                    <div className="text-xs text-neutral-500 font-mono">
                      {type.size}
                    </div>
                  </div>
                  <div className={`${type.class} text-neutral-900`}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Weights</CardTitle>
              <CardDescription>
                Available font weights for emphasis and hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { class: "font-normal", weight: "400", name: "Normal" },
                { class: "font-medium", weight: "500", name: "Medium" },
                { class: "font-semibold", weight: "600", name: "Semibold" },
                { class: "font-bold", weight: "700", name: "Bold" },
                { class: "font-extrabold", weight: "800", name: "Extrabold" },
              ].map((weight) => (
                <div
                  key={weight.class}
                  className="flex items-center gap-4 pb-3 border-b border-neutral-200 last:border-0"
                >
                  <div className="w-32 shrink-0">
                    <div className="text-sm font-semibold text-neutral-900">
                      {weight.name}
                    </div>
                    <div className="text-xs text-neutral-500 font-mono">
                      {weight.weight}
                    </div>
                  </div>
                  <div className={`${weight.class} text-lg text-neutral-900`}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Spacing System
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>8-Point Grid</CardTitle>
              <CardDescription>
                Consistent spacing values based on 8px increments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { class: "gap-1", px: "4px", rem: "0.25rem" },
                { class: "gap-2", px: "8px", rem: "0.5rem" },
                { class: "gap-3", px: "12px", rem: "0.75rem" },
                { class: "gap-4", px: "16px", rem: "1rem" },
                { class: "gap-6", px: "24px", rem: "1.5rem" },
                { class: "gap-8", px: "32px", rem: "2rem" },
                { class: "gap-12", px: "48px", rem: "3rem" },
                { class: "gap-16", px: "64px", rem: "4rem" },
              ].map((space) => (
                <div
                  key={space.class}
                  className="flex items-center gap-4 pb-3 border-b border-neutral-200 last:border-0"
                >
                  <div className="w-32 shrink-0">
                    <div className="text-sm font-semibold text-neutral-900">
                      {space.class}
                    </div>
                    <div className="text-xs text-neutral-500 font-mono">
                      {space.px} / {space.rem}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="h-8 bg-primary-500 rounded"
                      style={{ width: space.px }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Shadows Section */}
        <section id="shadows" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Shadow Levels
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Elevation System</CardTitle>
              <CardDescription>
                Shadow levels for creating depth and hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "XS", class: "shadow-xs" },
                  { name: "SM", class: "shadow-sm" },
                  { name: "MD", class: "shadow-md" },
                  { name: "LG", class: "shadow-lg" },
                  { name: "XL", class: "shadow-xl" },
                  { name: "2XL", class: "shadow-2xl" },
                ].map((shadow) => (
                  <div key={shadow.name} className="space-y-2">
                    <div className="text-sm font-semibold text-neutral-900">
                      {shadow.name}
                    </div>
                    <div
                      className={`${shadow.class} h-24 bg-white rounded-lg border border-neutral-200 flex items-center justify-center`}
                    >
                      <span className="text-neutral-500 font-mono text-sm">
                        {shadow.class}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons Section */}
        <section id="buttons" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Buttons</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>
                Different button styles for various use cases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  Default
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Primary Button</Button>
                  <Button variant="default" size="sm">
                    Small
                  </Button>
                  <Button variant="default" size="lg">
                    Large
                  </Button>
                  <Button variant="default" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  Secondary
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="secondary" size="sm">
                    Small
                  </Button>
                  <Button variant="secondary" size="lg">
                    Large
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  Outline
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="outline" size="sm">
                    Small
                  </Button>
                  <Button variant="outline" size="lg">
                    Large
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  Ghost
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="ghost" size="sm">
                    Small
                  </Button>
                  <Button variant="ghost" size="lg">
                    Large
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  Destructive
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="destructive">Delete</Button>
                  <Button variant="destructive" size="sm">
                    Small
                  </Button>
                  <Button variant="destructive" size="lg">
                    Large
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  With Icons
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="secondary">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  Icon Only
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <User className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section id="cards" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>
                  A simple card with header and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  This is the card content area. It can contain any type of
                  content including text, images, or other components.
                </p>
              </CardContent>
            </Card>

            {/* Stat Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-neutral-900">2,350</div>
                <p className="text-xs text-neutral-500 mt-2">
                  <span className="text-success-600 font-semibold">+12.5%</span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            {/* Interactive Card */}
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see the effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  This card has hover effects with shadow and lift animation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section id="badges" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Badges</h2>

          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>
                Different badge styles for status and labels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  Default
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  With Icons
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-success-100 text-success-700 hover:bg-success-200">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                  <Badge className="bg-warning-100 text-warning-700 hover:bg-warning-200">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                  <Badge className="bg-error-100 text-error-700 hover:bg-error-200">
                    <XCircle className="mr-1 h-3 w-3" />
                    Failed
                  </Badge>
                  <Badge className="bg-primary-100 text-primary-700 hover:bg-primary-200">
                    <Info className="mr-1 h-3 w-3" />
                    Info
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  Achievement Badges
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-success-100 to-success-50 text-success-700 font-semibold text-sm shadow-sm border border-success-200">
                    <Star className="h-4 w-4" />
                    Top Performer
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 text-accent-purple font-semibold text-sm shadow-sm border border-accent-purple/30">
                    <Heart className="h-4 w-4" />
                    Premium
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Icons Section */}
        <section id="icons" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Icons</h2>

          <Card>
            <CardHeader>
              <CardTitle>Icon Sizes</CardTitle>
              <CardDescription>Lucide icons in different sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-neutral-700">
                    Small (16px)
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-4 w-4 text-success-500" />
                    <AlertCircle className="h-4 w-4 text-warning-500" />
                    <XCircle className="h-4 w-4 text-error-500" />
                    <Info className="h-4 w-4 text-primary-500" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-neutral-700">
                    Medium (20px)
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <AlertCircle className="h-5 w-5 text-warning-500" />
                    <XCircle className="h-5 w-5 text-error-500" />
                    <Info className="h-5 w-5 text-primary-500" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-neutral-700">
                    Large (24px)
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-success-500" />
                    <AlertCircle className="h-6 w-6 text-warning-500" />
                    <XCircle className="h-6 w-6 text-error-500" />
                    <Info className="h-6 w-6 text-primary-500" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-neutral-700">
                    XL (32px)
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-8 w-8 text-success-500" />
                    <AlertCircle className="h-8 w-8 text-warning-500" />
                    <XCircle className="h-8 w-8 text-error-500" />
                    <Info className="h-8 w-8 text-primary-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Avatars Section */}
        <section id="avatars" className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Avatars</h2>

          <Card>
            <CardHeader>
              <CardTitle>Avatar Sizes</CardTitle>
              <CardDescription>User avatars in various sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-6">
                <div className="space-y-2">
                  <div className="text-xs text-neutral-500">Small</div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-neutral-500">Medium</div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-neutral-500">Large</div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-neutral-500">XL</div>
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-neutral-500">2XL</div>
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-500">
          <p>CodeZest Design System v1.0 • Built for educational excellence</p>
        </div>
      </div>
    </div>
  );
}
