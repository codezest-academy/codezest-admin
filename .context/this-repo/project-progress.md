# Project Progress & Context Retrieval

**Last Updated:** November 24, 2025
**Project:** CodeZest Admin Panel

This document serves as a checkpoint for the current state of the project, architectural decisions, and implemented features.

## 🏗️ Architecture & Tech Stack

- **Framework:** Next.js 15.5.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Library:** shadcn/ui (Radix Primitives) + Lucide Icons
- **State Management:** **Zustand** (Global Store)
- **Validation:** Zod (Schemas derived from Prisma)
- **Package Manager:** npm (with GitHub Packages registry for `@codezest-academy/*`)

### Folder Structure (Feature-Sliced Design)

```
src/
├── features/        # Business logic (Auth, Courses, etc.)
├── shared/          # Shared utilities, hooks, types
│   ├── lib/
│   │   ├── validations/ # Zod schemas (schema.ts)
│   │   └── utils.ts     # cn utility
│   └── store/       # Global Zustand stores
├── ui/              # Reusable UI components (Button, Input, etc.)
└── app/             # Next.js App Router (Route Groups)
```

## 🎨 Design System

- **Fonts:**
  - Primary: `Inter` (Body)
  - Serif: `Crimson Pro` (Headings)
  - Display: `Manrope` (UI Elements)
  - Mono: `JetBrains Mono` (Code)
- **Colors:** Premium palette (Gold, Navy, Burgundy) mapped to semantic variables (`--primary`, `--secondary`, etc.) in `globals.css`.
- **Theme:** Light/Dark mode ready (currently optimized for Light).

## 🛣️ Routing Structure

The `app/` directory uses **Route Groups** for distinct layouts:

1.  **(marketing)** (`/`)
    - **Layout:** Sticky Header + Footer.
    - **Content:** Landing page.
2.  **(auth)** (`/login`, `/register`)
    - **Layout:** Split-screen (Form Left, Feature Showcase Right).
    - **Content:** Login/Register forms with Zod validation.
3.  **(dashboard)** (`/dashboard`)
    - **Layout:** Sidebar (Collapsible) + Top Header + Main Content.
    - **Content:** Admin interface (Skeleton implemented).

## ✅ Implemented Features

1.  **Project Setup:**
    - [x] Next.js 15 + Tailwind v4 configuration.
    - [x] Font optimization (`next/font`).
    - [x] `shadcn/ui` integration with custom `components.json`.
2.  **UI Components:**
    - [x] Base: `Button` (with premium variant), `Card`, `Input`, `Label`, `Checkbox`.
    - [x] Feedback: `Sonner` (Toast), `Skeleton`.
    - [x] Layout: `Sheet` (Mobile Sidebar), `Dialog`, `DropdownMenu`.
3.  **Pages:**
    - [x] **Landing Page:** Modern dashboard preview.
    - [x] **Login:** Complete form with "Remember Me" & Social placeholders.
    - [x] **Register:** Complete form with Password Confirmation.
    - [x] **Not Found (404):** Custom design with navigation.
4.  **Data Layer:**
    - [x] **Zod Schemas:** Created `src/shared/lib/validations/schema.ts` matching the Prisma schema (User, Course, Subscription).

## 🔜 Next Steps

1.  **Dashboard Implementation:**
    - Build the "Overview" page with real charts (Recharts).
    - Implement the "Courses" list view.
2.  **State Management:**
    - Create Zustand stores for `useAuthStore` (User session) and `useUIStore` (Sidebar state).
3.  **API Integration:**
    - Connect forms to backend API endpoints.

## 📝 Notes for AI Assistant

- **Zustand Usage:** Use `zustand` for any global client-side state (e.g., user session, UI toggles). Avoid Redux or Context API for complex state unless necessary.
- **Validation:** Always import schemas from `@/shared/lib/validations/schema` for forms and API handlers.
- **Styling:** Use `cn()` for class merging. Stick to the semantic color variables (`bg-primary-500`, `text-neutral-900`) defined in `globals.css`.
