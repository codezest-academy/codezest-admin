# Routing & Layout Architecture

This document outlines the Next.js App Router structure for the CodeZest Admin application, utilizing **Route Groups** to apply distinct layouts to different sections of the app.

## 📂 Directory Structure

The `app/` directory is organized into three main route groups:

```
app/
├── (marketing)/        # Public-facing pages
│   ├── layout.tsx      # Marketing Layout (Header + Footer)
│   └── page.tsx        # Landing Page (/)
│
├── (auth)/             # Authentication flows
│   ├── layout.tsx      # Auth Layout (Centered Card)
│   ├── login/          # (/login)
│   └── register/       # (/register)
│
├── (dashboard)/        # Protected application area
│   ├── layout.tsx      # Dashboard Layout (Sidebar + Topbar)
│   └── dashboard/      # (/dashboard)
│
├── layout.tsx          # Root Layout (Providers, Fonts, Globals)
└── globals.css         # Global Styles
```

## 📐 Layout Strategies

### 1. Root Layout (`app/layout.tsx`)

**Purpose**: The foundational shell for the entire application.
**Responsibilities**:

- `<html>` and `<body>` tags.
- Global Font configuration (Inter, Crimson Pro, etc.).
- Global Providers (Toast, Theme, React Query).
- Global CSS imports.
- **No UI elements** (like headers or sidebars) to allow maximum flexibility for child layouts.

### 2. Marketing Layout (`app/(marketing)/layout.tsx`)

**Purpose**: Optimized for conversion and information presentation.
**Design**:

- **Header**: Transparent/Sticky with Logo and "Login" button.
- **Content**: Full-width, scrollable.
- **Footer**: Standard site footer with links.
- **Style**: Clean, high-impact visuals.

### 3. Auth Layout (`app/(auth)/layout.tsx`)

**Purpose**: Distraction-free environment for user entry.
**Design**:

- **Background**: Subtle pattern or gradient (Premium feel).
- **Container**: Centered card layout.
- **Navigation**: Minimal (Back to Home).
- **Focus**: Form inputs and primary actions.

### 4. Dashboard Layout (`app/(dashboard)/layout.tsx`)

**Purpose**: The main workspace for logged-in users.
**Design**:

- **Sidebar**: Collapsible navigation menu (Courses, Students, Analytics).
- **Top Bar**: User profile, global search, notifications.
- **Main Content**: Scrollable area with breadcrumbs and page title.
- **Responsiveness**: Mobile-friendly drawer for navigation.

## 🚀 Key Benefits

1.  **Separation of Concerns**: Marketing assets don't bloat the dashboard bundle.
2.  **Context Isolation**: Dashboard-specific providers (e.g., `UserProvider`) can be scoped to `(dashboard)`.
3.  **Visual Distinctiveness**: Each section feels purpose-built without fighting a single global layout.
