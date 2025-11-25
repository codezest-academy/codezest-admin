# Design System Implementation Guide

**Last Updated**: 2025-11-25  
**Status**: Implementation Ready  
**Estimated Time**: ~2.5 hours (base) + 2.5 hours (theming)

---

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Color Usage Strategy](#color-usage-strategy)
3. [Component Specifications](#component-specifications)
4. [Layout Specifications](#layout-specifications)
5. [Theming Implementation](#theming-implementation)
6. [Utility Classes](#utility-classes)
7. [Animation Guidelines](#animation-guidelines)
8. [Accessibility Standards](#accessibility-standards)
9. [Implementation Checklist](#implementation-checklist)

---

## Quick Reference

### Color Palette

| Token         | Hex       | Usage                                 |
| ------------- | --------- | ------------------------------------- |
| `primary-500` | `#4F46E5` | Primary buttons, links, active states |
| `primary-600` | `#4338CA` | Primary hover states                  |
| `success-500` | `#10B981` | Achievements, correct answers         |
| `warning-500` | `#F59E0B` | Warnings, pending states              |
| `error-500`   | `#EF4444` | Errors, incorrect answers             |
| `neutral-50`  | `#FAFAF9` | Page background                       |
| `neutral-900` | `#1C1917` | Headings                              |

### Typography Scale

| Token       | Size | Usage                    |
| ----------- | ---- | ------------------------ |
| `text-xs`   | 12px | Fine print, timestamps   |
| `text-sm`   | 14px | Secondary text, labels   |
| `text-base` | 16px | Body text                |
| `text-lg`   | 18px | Large body text          |
| `text-xl`   | 20px | H4 headings              |
| `text-2xl`  | 24px | H3 headings              |
| `text-3xl`  | 30px | H2 headings, stat values |

### Spacing System (8-point grid)

| Token   | Value | Usage           |
| ------- | ----- | --------------- |
| `gap-1` | 4px   | Micro spacing   |
| `gap-2` | 8px   | Tight spacing   |
| `gap-4` | 16px  | Default spacing |
| `gap-6` | 24px  | Section spacing |
| `gap-8` | 32px  | Large spacing   |

---

## Color Usage Strategy

### The 60-30-10 Rule

Professional websites follow this distribution:

```
60% - Neutrals (grays, whites, backgrounds)
30% - Primary Color (brand color)
10% - Accent Colors (semantic + variety)
```

### Color Roles & When to Use

#### Neutrals (60% of UI)

**Purpose**: Foundation, structure, readability

**Usage**:

- Page backgrounds: `neutral-50`
- Card surfaces: `white`
- Primary text: `neutral-900`
- Secondary text: `neutral-600`
- Borders: `neutral-200`

#### Primary Color (30% of UI)

**Purpose**: Brand identity, user actions

**Usage**:

- Primary buttons
- Links and navigation
- Active/selected states
- Progress indicators

**✅ DO Use For**:

- "Enroll Now" buttons
- "Start Quiz" buttons
- Navigation active states
- Links in content

**❌ DON'T Use For**:

- Regular body text
- Decorative purposes
- Every single element

#### Semantic Colors (8-10% of UI)

**Success Green (2-3%)**:

- ✅ Quiz correct answers
- ✅ Course completion badges
- ✅ Positive metrics

**Warning Orange (2-3%)**:

- ⚠️ Pending submissions
- ⚠️ Approaching deadlines
- ⚠️ Important notices

**Error Red (2-3%)**:

- ❌ Form validation errors
- ❌ Quiz incorrect answers
- ❌ Delete confirmations

#### Accent Colors (2-3% of UI)

**Purpose**: Categorization, visual variety

**Usage**:

- Subject categories (Math = Purple, Science = Teal)
- Course difficulty levels
- User role badges
- Feature tags

### Decision Framework

```
Is it a user action?
├─ Yes → Primary Color
└─ No → Continue

Is it communicating status/feedback?
├─ Yes → Semantic Color (Success/Warning/Error)
└─ No → Continue

Is it for categorization/variety?
├─ Yes → Accent Color
└─ No → Use Neutral
```

---

## Component Specifications

### Card Component

**Base Styles:**

```tsx
className =
  "rounded-xl border border-neutral-200 bg-white shadow-card hover:shadow-card-hover transition-all duration-300";
```

**Spacing:**

- Border radius: `12px` (rounded-xl)
- Padding: `24px` (p-6)
- Border: `1px` solid `#E2E8F0`

**Interactive Variant:**

```tsx
className = "card-interactive"; // Adds hover lift effect
```

### Button Component

**Primary Button:**

```tsx
<Button variant="default" size="default">
  Click me
</Button>
```

**Spacing:**

- Height: `36px` (h-9)
- Padding: `16px` horizontal (px-4)
- Border radius: `6px` (rounded-md)

**Effects:**

- Shadow: `shadow-sm`
- Hover: Lifts 2px with increased shadow

### Dashboard Stat Card

**Structure:**

```tsx
<Card className="card-interactive">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
    <CardTitle className="text-sm font-medium text-neutral-700">
      Stat Name
    </CardTitle>
    <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
      <Icon className="h-5 w-5 text-primary-600" />
    </div>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold text-neutral-900">Value</div>
    <p className="text-xs text-neutral-500 mt-2">Description</p>
  </CardContent>
</Card>
```

**Spacing:**

- Icon container: `40px` diameter
- Value font: `30px` (text-3xl)
- Description margin-top: `8px` (mt-2)

---

## Layout Specifications

### Dashboard Layout

**Background:** `bg-neutral-50` (#F8FAFC)

**Sidebar:**

- Background: `bg-white`
- Border: `border-r border-neutral-200`
- Width: `256px` (lg:w-64) expanded, `80px` (w-20) collapsed

**Main Content:**

- Padding: `24px` (p-6) on mobile, `32px` (p-8) on desktop
- Max width: `1280px` (max-w-7xl)

### Grid Layouts

**Stats Grid:**

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
```

- Gap: `16px`
- Columns: 1 → 2 → 4 (mobile → tablet → desktop)

**Charts Grid:**

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
```

- Chart: 4 columns (col-span-4)
- Activity: 3 columns (col-span-3)

---

## Theming Implementation

### Quick Setup (2.5 hours)

#### Step 1: Install Package

```bash
npm install next-themes
```

#### Step 2: Add Dark Mode Colors to `globals.css`

```css
.dark {
  --color-background: #0a0f1e;
  --color-foreground: #f1f5f9;
  --color-card: #1e293b;
  --color-card-foreground: #f1f5f9;
  --color-border: #334155;
  --color-primary: #3b82f6;
  --color-primary-foreground: #ffffff;
}
```

#### Step 3: Create Theme Provider

Create `src/providers/theme-provider.tsx`:

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

#### Step 4: Wrap App in `app/layout.tsx`

```tsx
import { ThemeProvider } from "@/providers/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### Step 5: Create Theme Toggle

Create `src/components/theme-toggle.tsx`:

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

#### Step 6: Add to Dashboard Header

In `app/(dashboard)/layout.tsx`, add `<ThemeToggle />` to the header.

### Theming Best Practices

1. **Use Semantic Tokens**: Always use `bg-background`, `text-foreground`
2. **Test Both Modes**: Check every page in light and dark
3. **Respect System Preference**: Default to `system` theme
4. **Smooth Transitions**: Add CSS transitions for polish
5. **Accessibility**: Ensure 4.5:1 contrast ratio in both modes

---

## Utility Classes

### Achievement Badge

```tsx
<span className="badge-achievement">Completed</span>
```

### Quiz Option States

```tsx
<div className="quiz-option">Default</div>
<div className="quiz-option quiz-option-correct">Correct</div>
<div className="quiz-option quiz-option-incorrect">Incorrect</div>
```

### Interactive Card

```tsx
<Card className="card-interactive">{/* Adds hover lift and shadow */}</Card>
```

### Glassmorphism

```tsx
<div className="glass-edu">{/* Semi-transparent with backdrop blur */}</div>
```

---

## Animation Guidelines

### Hover Effects

- **Duration**: `300ms` (transition-all duration-300)
- **Easing**: Default ease
- **Lift**: `-2px` to `-4px` translateY

### Success Celebrations

```tsx
<div className="animate-[celebrate_0.6s_ease-in-out]">
  {/* Scales to 1.05 and back */}
</div>
```

### Slide In

```tsx
<div className="animate-[slideInUp_0.3s_ease-out]">
  {/* Fades in from bottom */}
</div>
```

---

## Accessibility Standards

### Color Contrast (WCAG 2.1 AA)

| Element            | Ratio  | Status |
| ------------------ | ------ | ------ |
| Headings on white  | 14.5:1 | ✅ AAA |
| Body text on white | 12.1:1 | ✅ AAA |
| Secondary text     | 4.8:1  | ✅ AA  |
| Primary button     | 4.6:1  | ✅ AA  |

### Focus States

All interactive elements have visible focus rings:

```css
focus-visible: ring-2 ring-primary-500 ring-offset-2;
```

---

## Implementation Checklist

### Phase 1: Foundation (30 min)

- [ ] Update color tokens in `globals.css`
- [ ] Add typography scale variables
- [ ] Add animation keyframes
- [ ] Add utility classes

### Phase 2: Components (1 hour)

- [ ] Update Card component
- [ ] Update Button component
- [ ] Add new utility classes
- [ ] Test component variations

### Phase 3: Layouts (45 min)

- [ ] Update dashboard layout background
- [ ] Update sidebar styles
- [ ] Update dashboard page stat cards
- [ ] Test responsive behavior

### Phase 4: Theming (2.5 hours)

- [ ] Install `next-themes` package
- [ ] Add dark mode CSS variables
- [ ] Create theme provider
- [ ] Create theme toggle component
- [ ] Add toggle to dashboard header
- [ ] Test light/dark modes

### Phase 5: Verification (30 min)

- [ ] Visual regression testing
- [ ] Accessibility audit
- [ ] Performance check
- [ ] Cross-browser testing

---

## File Locations

| File                                 | Purpose                          |
| ------------------------------------ | -------------------------------- |
| `app/globals.css`                    | Global styles, tokens, utilities |
| `src/ui/card.tsx`                    | Card component                   |
| `src/ui/button.tsx`                  | Button component                 |
| `app/(dashboard)/layout.tsx`         | Dashboard layout                 |
| `app/(dashboard)/dashboard/page.tsx` | Dashboard page                   |
| `src/widgets/dashboard/sidebar.tsx`  | Sidebar component                |
| `src/providers/theme-provider.tsx`   | Theme context provider           |
| `src/components/theme-toggle.tsx`    | Theme toggle button              |

---

## Design Principles

1. **Clarity First**: Information hierarchy is paramount for learning
2. **Consistent Spacing**: 8px grid system throughout
3. **Engaging Colors**: Brighter, more energetic than corporate blue
4. **Subtle Animations**: Enhance UX without distraction
5. **Professional Feel**: Academic credibility meets modern design
6. **Mobile-First**: Responsive design for on-the-go learning
7. **Color Restraint**: 60% neutrals, 30% primary, 10% accents
8. **Semantic Meaning**: Colors communicate purpose, not decoration

---

## Common Patterns

### Stat Card with Icon

```tsx
<Card className="card-interactive">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
    <CardTitle className="text-sm font-medium text-neutral-700">
      {title}
    </CardTitle>
    <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
      <Icon className="h-5 w-5 text-primary-600" />
    </div>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold text-neutral-900">{value}</div>
    <p className="text-xs text-neutral-500 mt-2">{description}</p>
  </CardContent>
</Card>
```

### Progress Indicator

```tsx
<div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-primary-500 to-success-500 transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

### Achievement Badge

```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-success-100 to-success-50 text-success-700 font-semibold text-sm shadow-sm border border-success-200">
  <CheckCircle className="h-4 w-4" />
  Completed
</span>
```

---

## UI Kit & Components Pages

### UI Kit Page (`/ui-kit`)

Displays all design tokens:

- Color palette (50+ colors)
- Typography scale (9 sizes)
- Spacing system (8 values)
- Shadow levels (6 elevations)
- Button variants
- Card examples
- Badge styles
- Icon sizes
- Avatar sizes

### Components Page (`/components`)

Displays all 22 UI components:

- Form components (Input, Select, Checkbox)
- Dialogs & Modals (Dialog, Sheet)
- Dropdown menus
- Tables
- Tabs
- Tooltips
- Breadcrumbs
- Skeleton loaders
- Separators

**Access**:

- UI Kit: http://localhost:3001/ui-kit
- Components: http://localhost:3001/components

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Latest version

---

## Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

---

## Additional Resources

- **Color Usage Guide**: See artifacts for detailed color strategy
- **Theming Plan**: See `implementation_plan.md` for step-by-step theming
- **Component Library**: Visit `/components` for all UI components
- **Design Tokens**: Visit `/ui-kit` for visual reference

---

**Last Updated**: 2025-11-25  
**Version**: 2.0 (with theming support)
