# Folder Structure & Organization Guide

## Overview

This document defines the standardized folder structure for the CodeZest Admin project, following Clean Architecture principles and Feature-Sliced Design (FSD) patterns.

---

## Core Principles

1. **Separation of Concerns** - Routes (`/app`) separate from logic (`/src`)
2. **Feature-Based Organization** - Group by feature, not by file type
3. **Clean Architecture Layers** - Domain → Application → Infrastructure → Presentation
4. **Single Source of Truth** - One clear location for each component type

---

## Directory Structure

```
codezest-admin/
├── app/                        # Next.js App Router (ROUTES ONLY)
│   ├── (auth)/                # Route group: Authentication
│   ├── (dashboard)/           # Route group: Dashboard
│   ├── (marketing)/           # Route group: Marketing/Landing
│   ├── api/                   # API routes
│   ├── globals.css
│   └── layout.tsx
│
├── src/                       # Application Code (NON-ROUTES)
│   ├── app/                   # Application Layer (Clean Architecture)
│   │   ├── services/         # Business logic orchestration
│   │   ├── dtos/             # Data Transfer Objects
│   │   └── mappers/          # Entity ↔ DTO transformations
│   │
│   ├── domain/                # Domain Layer (Core business rules)
│   │   ├── entities/         # Business entities
│   │   ├── repositories/     # Repository interfaces
│   │   └── errors/           # Domain-specific errors
│   │
│   ├── infrastructure/        # Infrastructure Layer
│   │   ├── database/         # Prisma client, DB utilities
│   │   ├── repositories/     # Repository implementations
│   │   └── external/         # Third-party integrations
│   │
│   ├── presentation/          # Presentation Layer (API Controllers)
│   │   ├── controllers/      # Request handlers
│   │   └── routes/           # Route definitions
│   │
│   ├── features/              # Feature modules (FSD pattern)
│   │   ├── auth/
│   │   │   ├── components/   # Auth-specific UI components
│   │   │   ├── hooks/        # Auth-specific hooks
│   │   │   └── utils/        # Auth utilities
│   │   ├── courses/
│   │   ├── analytics/
│   │   └── workflow/
│   │
│   ├── widgets/               # Complex composite components
│   │   ├── dashboard/        # Dashboard-specific widgets
│   │   ├── materials/
│   │   ├── modules/
│   │   ├── profile/
│   │   └── quizzes/
│   │
│   ├── components/            # Shared/Reusable components
│   │   ├── ui/
│   │   │   ├── primitives/   # Shadcn UI components
│   │   │   └── effects/      # Aceternity UI components
│   │   ├── layout/           # Layout components
│   │   ├── forms/            # Form components
│   │   └── common/           # Common shared components
│   │
│   ├── hooks/                 # Global custom hooks
│   ├── lib/                   # Utilities and helpers
│   ├── config/                # Configuration
│   ├── types/                 # TypeScript type definitions
│   ├── shared/                # Shared utilities
│   └── styles/                # Global styles
│
├── public/                    # Static assets
├── .context/                  # Project documentation
└── scripts/                   # Utility scripts
```

---

## Component Organization

### 1. UI Components (`src/components/ui/`)

#### Primitives (`src/components/ui/primitives/`)

**Purpose:** Shadcn UI base components (form controls, buttons, etc.)

**Examples:**

- `button.tsx`, `input.tsx`, `select.tsx`
- `card.tsx`, `dialog.tsx`, `dropdown-menu.tsx`
- `form.tsx`, `table.tsx`, `tabs.tsx`

**When to use:**

- Installing Shadcn components via `npx shadcn@latest add [component]`
- Creating basic form controls or UI primitives
- Building reusable, unstyled base components

**Import pattern:**

```typescript
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
```

#### Effects (`src/components/ui/effects/`)

**Purpose:** Aceternity UI visual effects and animations

**Examples:**

- `background-ripple-effect.tsx`, `sparkles.tsx`
- `wobble-card.tsx`, `spotlight-new.tsx`
- `resizable-navbar.tsx`, `pointer-highlight.tsx`

**When to use:**

- Adding visual effects or animations
- Implementing Aceternity components
- Creating decorative UI elements

**Import pattern:**

```typescript
import { WobbleCard } from "@/components/ui/effects/wobble-card";
import { BackgroundRipple } from "@/components/ui/effects/background-ripple-effect";
```

---

### 2. Features (`src/features/`)

**Purpose:** Self-contained feature modules with their own components, hooks, and utilities

**Structure:**

```
src/features/[feature-name]/
├── components/        # Feature-specific UI components
├── hooks/            # Feature-specific hooks
├── utils/            # Feature-specific utilities
└── types/            # Feature-specific types
```

**Examples:**

- `src/features/auth/components/PasswordStrengthIndicator.tsx`
- `src/features/workflow/components/WorkflowDiagram.tsx`
- `src/features/courses/components/CourseCard.tsx`

**When to use:**

- Component is specific to one feature/domain
- Component has feature-specific business logic
- Component is not reusable across features

**Import pattern:**

```typescript
import { PasswordStrengthIndicator } from "@/features/auth/components/PasswordStrengthIndicator";
import WorkflowDiagram from "@/features/workflow/components/WorkflowDiagram";
```

---

### 3. Widgets (`src/widgets/`)

**Purpose:** Complex composite components that combine multiple primitives

**Examples:**

- `src/widgets/dashboard/StatsCard.tsx`
- `src/widgets/quizzes/QuizTable.tsx`
- `src/widgets/profile/ProfileGeneralForm.tsx`

**When to use:**

- Building complex, multi-part UI sections
- Combining multiple primitives into a cohesive unit
- Creating reusable dashboard widgets or forms

**Import pattern:**

```typescript
import { StatsCard } from "@/widgets/dashboard/StatsCard";
import { QuizTable } from "@/widgets/quizzes/QuizTable";
```

---

## Path Aliases (TypeScript)

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/app/*": ["./app/*"],
    "@/components/*": ["./src/components/*"],
    "@/ui/*": ["./src/components/ui/*"],
    "@/features/*": ["./src/features/*"],
    "@/widgets/*": ["./src/widgets/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/hooks/*": ["./src/hooks/*"],
    "@/types/*": ["./src/types/*"],
    "@/config/*": ["./src/config/*"],
    "@/shared/*": ["./src/shared/*"]
  }
}
```

---

## Adding New Components

### Shadcn UI Components

```bash
npx shadcn@latest add calendar
# Installs to: src/components/ui/calendar.tsx

# Then run the organize script:
./scripts/organize-shadcn.sh
# Moves to: src/components/ui/primitives/calendar.tsx
```

> **Note:** Shadcn CLI automatically places components in `src/components/ui/` and cannot be configured to use subdirectories like `primitives/`. After adding components, run the `organize-shadcn.sh` script to move them to the correct location.

Configuration in `components.json`:

```json
{
  "aliases": {
    "components": "@/components/ui",
    "utils": "@/lib/utils"
  }
}
```

**Workflow:**

1. Add component: `npx shadcn@latest add [component]`
2. Organize: `./scripts/organize-shadcn.sh`
3. Update imports if needed

### Custom Components

#### Decision Tree

```
Is it a Shadcn component?
├─ Yes → src/components/ui/primitives/
└─ No
   ├─ Is it a visual effect/animation?
   │  └─ Yes → src/components/ui/effects/
   └─ No
      ├─ Is it feature-specific?
      │  └─ Yes → src/features/[feature]/components/
      └─ No
         ├─ Is it a complex composite widget?
         │  └─ Yes → src/widgets/[domain]/
         └─ No → src/components/common/
```

---

## Naming Conventions

### Files and Folders

- **Files:** `PascalCase.tsx` for components, `kebab-case.ts` for utilities
- **Folders:** `kebab-case` (e.g., `user-profile`, `auth-service`)

### Components

```typescript
// Component files
export default function UserProfile() { }  // Default export
export function ProfileCard() { }          // Named export

// Component naming
- PascalCase for components
- Descriptive, feature-based names
- Avoid generic names like "Component1"
```

### Imports

```typescript
// ✅ Good - Clear, specific imports
import { Button } from "@/components/ui/primitives/button";
import { PasswordStrengthIndicator } from "@/features/auth/components/PasswordStrengthIndicator";

// ❌ Bad - Relative paths, unclear
import { Button } from "../../../components/ui/button";
import { PasswordStrengthIndicator } from "../../auth/PasswordStrengthIndicator";
```

---

## Feature Module Example

### Creating a new "Courses" feature

```bash
mkdir -p src/features/courses/{components,hooks,utils,types}
```

**Structure:**

```
src/features/courses/
├── components/
│   ├── CourseCard.tsx
│   ├── CourseList.tsx
│   └── CourseFilters.tsx
├── hooks/
│   ├── useCourses.ts
│   └── useCourseFilters.ts
├── utils/
│   └── course-helpers.ts
└── types/
    └── course.types.ts
```

**Usage:**

```typescript
// In a page or widget
import { CourseCard } from "@/features/courses/components/CourseCard";
import { useCourses } from "@/features/courses/hooks/useCourses";
```

---

## Best Practices

### ✅ Do

- Use path aliases (`@/`) for all imports
- Keep features self-contained and independent
- Place shared components in `src/components/`
- Use descriptive, feature-based names
- Follow the decision tree for component placement

### ❌ Don't

- Use relative imports (`../../`)
- Mix feature-specific code in shared folders
- Create deeply nested folder structures (max 3-4 levels)
- Use generic names (`Component1`, `utils.ts`)
- Place routes in `/src` or logic in `/app`

---

## Migration Notes

- **Old path:** `@/ui/button` → **New path:** `@/components/ui/primitives/button`
- **Old path:** `@/components/ui/wobble-card` → **New path:** `@/components/ui/effects/wobble-card`
- All imports have been updated as of 2025-11-30

---

## Quick Reference

| Component Type   | Location                                        | Import Example                                         |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------ |
| Shadcn UI        | `src/components/ui/primitives/`                 | `@/components/ui/primitives/button`                    |
| Aceternity       | `src/components/ui/effects/`                    | `@/components/ui/effects/wobble-card`                  |
| Feature-specific | `src/features/[feature]/components/`            | `@/features/auth/components/PasswordStrengthIndicator` |
| Widgets          | `src/widgets/[domain]/`                         | `@/widgets/dashboard/StatsCard`                        |
| Shared           | `src/components/common/`                        | `@/components/common/Logo`                             |
| Hooks            | `src/hooks/` or `src/features/[feature]/hooks/` | `@/hooks/useAuth`                                      |
| Utils            | `src/lib/` or `src/features/[feature]/utils/`   | `@/lib/utils`                                          |

---

## Related Documentation

- [Architecture & Design](./01_architecture.md) - Clean Architecture principles
- [Design System](../guides/color-palette.md) - Color palette and styling
- [Session Management](./session-management-backend.md) - Auth implementation

---

**Last Updated:** 2025-11-30  
**Version:** 1.0
