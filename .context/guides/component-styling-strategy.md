# CodeZest Design System - Component Styling Strategy

**Purpose**: Clear guidelines for styling components across the entire project  
**Status**: Official Standard  
**Last Updated**: 2025-11-25

---

## 🎯 Design System Philosophy

### Core Principle

**"Design tokens first, custom styles second, hardcoded values never"**

Every component should:

1. ✅ Use design system tokens (colors, spacing, typography)
2. ✅ Follow consistent patterns
3. ✅ Be predictable and reusable
4. ❌ Never use hardcoded colors or magic numbers

---

## 🎨 Color Usage Strategy

### 1. Primary Color (Deep Indigo #4F46E5)

**When to Use**:

- ✅ Primary buttons
- ✅ Links in content
- ✅ Active navigation states
- ✅ Selected items
- ✅ Progress bars
- ✅ Focus indicators

**How to Use**:

```tsx
// ✅ CORRECT - Use semantic tokens
className="bg-primary text-primary-foreground"
className="text-primary-600 hover:text-primary-700"
className="border-primary-200 bg-primary-50"

// ❌ WRONG - Never hardcode
className="bg-[#4f46e5]"
style={{ backgroundColor: '#4f46e5' }}
```

---

### 2. Neutral Colors (Warm Stone)

**When to Use**:

- ✅ Page backgrounds (`neutral-50`)
- ✅ Card surfaces (`white` or `neutral-0`)
- ✅ Text (`neutral-600`, `neutral-700`, `neutral-900`)
- ✅ Borders (`neutral-200`, `neutral-300`)
- ✅ Disabled states (`neutral-400`)

**Color Scale**:

```tsx
// Backgrounds
bg - neutral - 50; // Page background (lightest)
bg - white; // Card background
bg - neutral - 100; // Subtle backgrounds

// Text
text - neutral - 900; // Headings (darkest)
text - neutral - 700; // Body text
text - neutral - 600; // Secondary text
text - neutral - 500; // Muted text
text - neutral - 400; // Disabled text

// Borders
border - neutral - 200; // Default borders
border - neutral - 300; // Emphasized borders
```

---

### 3. Semantic Colors

**Success** (Green):

```tsx
text - success - 600; // Success text
bg - success - 50; // Success background
border - success - 200; // Success border
```

**Warning** (Orange):

```tsx
text - warning - 600; // Warning text
bg - warning - 50; // Warning background
border - warning - 200; // Warning border
```

**Error** (Red):

```tsx
text - error - 600; // Error text
bg - error - 50; // Error background
border - error - 200; // Error border
```

---

## 📏 Spacing Strategy

### Use 8-Point Grid System

**Standard Spacing Scale**:

```tsx
// ✅ CORRECT - Use Tailwind spacing
gap-4     // 16px
p-6       // 24px
mt-8      // 32px
space-y-6 // 24px vertical spacing

// ❌ WRONG - Avoid arbitrary values
gap-[17px]
p-[23px]
```

**Common Patterns**:

```tsx
// Card padding
<Card className="p-6">

// Grid gaps
<div className="grid gap-4 md:gap-6">

// Section spacing
<div className="space-y-6">

// Component margins
<div className="mt-8 mb-12">
```

---

## ✍️ Typography Strategy

### Font Family

```tsx
// Primary font (already applied globally)
font - primary; // Plus Jakarta Sans

// Display font (for headings)
font - display; // Plus Jakarta Sans (bold)
```

### Font Sizes

```tsx
// Headings
text-4xl  // 36px - Page titles
text-3xl  // 30px - Section titles
text-2xl  // 24px - Card titles
text-xl   // 20px - Subsections

// Body
text-base // 16px - Default body text
text-sm   // 14px - Secondary text
text-xs   // 12px - Captions, labels
```

### Font Weights

```tsx
font - bold; // 700 - Headings
font - semibold; // 600 - Subheadings
font - medium; // 500 - Emphasized text
font - normal; // 400 - Body text
```

---

## 🎭 Component Styling Patterns

### Pattern 1: Stat Cards

**Structure**:

```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Title</CardTitle>
    <Icon className="h-4 w-4 text-neutral-500" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">Value</div>
    <p className="text-xs text-neutral-500 mt-1">Description</p>
  </CardContent>
</Card>
```

**Key Points**:

- ✅ Icon: `text-neutral-500` (muted)
- ✅ Title: `text-sm font-medium`
- ✅ Value: `text-2xl font-bold`
- ✅ Description: `text-xs text-neutral-500`

---

### Pattern 2: Interactive Cards

**Structure**:

```tsx
<Card className="hover:border-primary-200 hover:shadow-md transition-all cursor-pointer">
  <CardHeader>
    <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
      <Icon className="h-5 w-5 text-primary-600" />
    </div>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-neutral-600">Description</p>
  </CardContent>
</Card>
```

**Key Points**:

- ✅ Hover: `hover:border-primary-200 hover:shadow-md`
- ✅ Icon background: `bg-primary-50`
- ✅ Icon color: `text-primary-600`
- ✅ Smooth transition: `transition-all`

---

### Pattern 3: Buttons

**Primary Button**:

```tsx
<Button>Primary Action</Button>
// Renders: bg-primary text-primary-foreground hover:bg-primary/90
```

**Secondary Button**:

```tsx
<Button variant="outline">Secondary Action</Button>
// Renders: border bg-background hover:bg-accent
```

**Destructive Button**:

```tsx
<Button variant="destructive">Delete</Button>
// Renders: bg-destructive text-white
```

---

### Pattern 4: Form Inputs

**Structure**:

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="m@example.com" />
  <p className="text-xs text-neutral-500">Helper text</p>
</div>
```

**Key Points**:

- ✅ Label: Semantic `<Label>` component
- ✅ Input: Semantic `<Input>` component
- ✅ Helper text: `text-xs text-neutral-500`
- ✅ Spacing: `space-y-2`

---

### Pattern 5: Navigation Items

**Active State**:

```tsx
<Link
  href="/dashboard"
  className={`
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
    ${
      isActive
        ? "bg-primary text-white font-semibold shadow-md"
        : "text-primary-700 hover:bg-white hover:text-primary-800 hover:shadow-sm"
    }
  `}
>
  <Icon className="h-5 w-5" />
  <span>Dashboard</span>
</Link>
```

**Key Points**:

- ✅ Active: `bg-primary text-white`
- ✅ Inactive: `text-primary-700`
- ✅ Hover: `hover:bg-white hover:shadow-sm`
- ✅ Smooth transition: `transition-all`

---

## 🎨 Shadow Strategy

### Use Predefined Shadows

```tsx
// Subtle elevation
shadow - sm; // Cards at rest

// Medium elevation
shadow - md; // Cards on hover, dropdowns

// Large elevation
shadow - lg; // Modals, popovers

// Primary-colored shadows (for brand elements)
shadow - primary; // Primary buttons
shadow - primary - lg; // Primary CTAs
```

---

## 📐 Border Radius Strategy

### Consistent Rounding

```tsx
// Small elements
rounded - md; // 6px - Buttons, inputs

// Medium elements
rounded - lg; // 8px - Cards, containers

// Large elements
rounded - xl; // 12px - Navigation items, large cards

// Circular
rounded - full; // Icons, avatars, badges
```

---

## 🔄 Transition Strategy

### Smooth Interactions

```tsx
// Standard transition
transition-all duration-200

// Specific transitions
transition-colors duration-200
transition-shadow duration-200
transition-transform duration-200

// Hover lift effect
hover:-translate-y-0.5 transition-transform
```

---

## 📋 Component Styling Checklist

### Before Creating a Component

- [ ] Does it use design system colors?
- [ ] Does it follow the 8-point grid?
- [ ] Does it use semantic tokens?
- [ ] Does it have proper hover states?
- [ ] Does it have smooth transitions?
- [ ] Is it accessible (contrast, focus states)?
- [ ] Is it responsive?

---

## 🎯 Best Practices

### DO ✅

```tsx
// Use semantic tokens
<div className="bg-primary text-primary-foreground">

// Use design system spacing
<div className="p-6 space-y-4">

// Use consistent patterns
<Card className="hover:border-primary-200 transition-all">

// Use semantic components
<Button variant="outline">Click</Button>
```

### DON'T ❌

```tsx
// Hardcode colors
<div style={{ backgroundColor: '#4f46e5' }}>

// Use arbitrary values
<div className="p-[23px] gap-[17px]">

// Mix patterns inconsistently
<div className="p-4"> {/* Should be p-6 for cards */}

// Skip hover states
<button className="bg-primary"> {/* Missing hover */}
```

---

## 🏗️ Component Organization

### File Structure

```
src/
├── ui/                    # Base UI components (shadcn)
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── components/            # Custom components
│   └── dashboard/
│       ├── StatCard.tsx   # Specific patterns
│       ├── OverviewChart.tsx
│       └── RecentSalesList.tsx
└── widgets/               # Complex widgets
    └── dashboard/
        └── sidebar.tsx
```

---

## 📝 Component Template

### Standard Component Structure

```tsx
// components/dashboard/StatCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-neutral-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-neutral-500 flex items-center mt-1">
            <span
              className={`${
                trend.direction === "up" ? "text-success-600" : "text-error-600"
              } flex items-center mr-1`}
            >
              {trend.value}
            </span>
            from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

**Key Elements**:

1. ✅ TypeScript interfaces
2. ✅ Semantic components
3. ✅ Design system tokens
4. ✅ Consistent spacing
5. ✅ Proper structure

---

## 🎨 Quick Reference

### Color Tokens

```
Primary:   bg-primary, text-primary-600, border-primary-200
Neutral:   bg-neutral-50, text-neutral-600, border-neutral-200
Success:   text-success-600, bg-success-50
Warning:   text-warning-600, bg-warning-50
Error:     text-error-600, bg-error-50
```

### Spacing

```
Small:     gap-2, p-2, space-y-2  (8px)
Medium:    gap-4, p-4, space-y-4  (16px)
Large:     gap-6, p-6, space-y-6  (24px)
XLarge:    gap-8, p-8, space-y-8  (32px)
```

### Typography

```
Heading:   text-2xl font-bold
Title:     text-sm font-medium
Body:      text-base
Caption:   text-xs text-neutral-500
```

### Shadows

```
Rest:      shadow-sm
Hover:     shadow-md
Elevated:  shadow-lg
Primary:   shadow-primary
```

---

## ✅ Summary

**Golden Rules**:

1. **Always use design system tokens** (never hardcode)
2. **Follow the 8-point grid** (consistent spacing)
3. **Use semantic components** (Button, Card, etc.)
4. **Maintain consistent patterns** (reuse proven structures)
5. **Add smooth transitions** (better UX)
6. **Ensure accessibility** (contrast, focus states)

**Result**: Consistent, maintainable, professional UI across the entire project.

---

**Last Updated**: 2025-11-25  
**Status**: Official Standard  
**Apply To**: All components, all pages
