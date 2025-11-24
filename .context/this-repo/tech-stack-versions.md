# CodeZest Admin - Tech Stack & Version Guide

**Last Updated**: November 24, 2025  
**Purpose**: Definitive guide for framework versions, dependencies, and setup for the CodeZest Admin Panel

---

## 📊 Version Strategy Overview

This document outlines two viable tech stack options for implementing the **Design System v2.0**:

- **Option 1**: Stable Production-Ready (Recommended)
- **Option 2**: Bleeding Edge (Current Setup)

---

## 🎯 Option 1: Stable Production-Ready Stack (RECOMMENDED)

### Core Framework Versions

| Package          | Version    | Reason                                 |
| ---------------- | ---------- | -------------------------------------- |
| **Next.js**      | `^14.2.18` | Stable App Router, mature ecosystem    |
| **React**        | `^18.3.1`  | Production-ready, full library support |
| **React DOM**    | `^18.3.1`  | Matches React version                  |
| **TypeScript**   | `^5.6.3`   | Latest stable with best type inference |
| **Tailwind CSS** | `^3.4.17`  | Stable, complete plugin ecosystem      |

### Why This Stack?

✅ **Battle-tested**: Used by thousands of production apps  
✅ **shadcn/ui compatibility**: Perfect integration with Radix UI  
✅ **Library support**: All npm packages fully compatible  
✅ **Community resources**: Extensive documentation and examples  
✅ **Stability**: Fewer breaking changes, predictable updates  
✅ **Aceternity UI**: All examples designed for React 18

### Complete Dependencies

```json
{
  "name": "codezest-admin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "next": "^14.2.18",

    "lucide-react": "^0.468.0",
    "framer-motion": "^11.15.0",
    "recharts": "^2.15.0",
    "react-hot-toast": "^2.4.1",
    "sonner": "^1.7.1",
    "vaul": "^1.1.1",
    "embla-carousel-react": "^8.5.1",
    "react-confetti": "^6.1.0",
    "react-wrap-balancer": "^1.1.1",

    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",

    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-checkbox": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.1",
    "@radix-ui/react-switch": "^1.1.1"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    "tailwindcss-animate": "^1.0.7",
    "eslint": "^8.57.1",
    "eslint-config-next": "^14.2.18"
  }
}
```

### Installation Commands

```bash
# 1. Remove existing dependencies (if switching from Option 2)
rm -rf node_modules package-lock.json

# 2. Install core framework
npm install react@^18.3.1 react-dom@^18.3.1 next@^14.2.18

# 3. Install UI libraries
npm install lucide-react framer-motion recharts react-hot-toast sonner vaul embla-carousel-react react-confetti react-wrap-balancer

# 4. Install utilities
npm install class-variance-authority clsx tailwind-merge

# 5. Install Radix UI components (for shadcn/ui)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-switch

# 6. Install dev dependencies
npm install -D typescript @types/node@^22 @types/react@^18 @types/react-dom@^18 tailwindcss@^3.4.17 postcss autoprefixer tailwindcss-animate eslint@^8 eslint-config-next@^14.2.18

# 7. Initialize shadcn/ui
npx shadcn@latest init
```

### Tailwind Configuration (v3)

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          300: "#60A5FA",
          400: "#3B82F6",
          500: "#2563EB",
          700: "#1E3A5F",
          900: "#0B1D3E",
          950: "#0A1628",
        },
        // Success Colors
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          300: "#6EE7B7",
          500: "#10B981",
          700: "#047857",
        },
        // Warning Colors
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          400: "#FBBF24",
          500: "#F59E0B",
          700: "#B45309",
        },
        // Error Colors
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          400: "#F87171",
          500: "#EF4444",
          700: "#B91C1C",
        },
        // Premium Colors
        premium: {
          gold: "#D4AF37",
          rose: "#B76E79",
          platinum: "#E5E4E2",
          navy: "#001F3F",
          burgundy: "#800020",
        },
        // Accent Colors
        accent: {
          purple: "#8B5CF6",
          indigo: "#6366F1",
          teal: "#14B8A6",
          orange: "#F97316",
          pink: "#EC4899",
        },
        // Neutral Colors
        neutral: {
          0: "#FFFFFF",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#172033",
          950: "#0A0F1E",
        },
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
        serif: ["Crimson Pro", "Lora", "Georgia", "serif"],
        display: ["Manrope", "Inter", "sans-serif"],
        secondary: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-2xl": [
          "60px",
          { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-xl": [
          "48px",
          { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "40px",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading-xl": [
          "32px",
          { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "heading-lg": [
          "28px",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "heading-md": ["24px", { lineHeight: "1.35", fontWeight: "600" }],
        "heading-sm": ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-xs": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        "body-base": ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        caption: [
          "13px",
          { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "500" },
        ],
        overline: [
          "12px",
          { lineHeight: "1.5", letterSpacing: "0.08em", fontWeight: "600" },
        ],
        micro: [
          "11px",
          { lineHeight: "1.4", letterSpacing: "0.03em", fontWeight: "500" },
        ],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(10, 15, 30, 0.04)",
        sm: "0 1px 2px rgba(10, 15, 30, 0.06), 0 2px 4px rgba(10, 15, 30, 0.04)",
        md: "0 2px 4px rgba(10, 15, 30, 0.06), 0 4px 8px rgba(10, 15, 30, 0.08), 0 8px 16px rgba(10, 15, 30, 0.04)",
        lg: "0 4px 8px rgba(10, 15, 30, 0.08), 0 8px 16px rgba(10, 15, 30, 0.1), 0 16px 32px rgba(10, 15, 30, 0.06)",
        xl: "0 8px 16px rgba(10, 15, 30, 0.1), 0 16px 32px rgba(10, 15, 30, 0.12), 0 24px 48px rgba(10, 15, 30, 0.08)",
        "2xl":
          "0 12px 24px rgba(10, 15, 30, 0.12), 0 24px 48px rgba(10, 15, 30, 0.14), 0 32px 64px rgba(10, 15, 30, 0.1)",
        primary: "0 8px 24px rgba(37, 99, 235, 0.2)",
        "primary-lg": "0 12px 32px rgba(37, 99, 235, 0.25)",
        success: "0 8px 24px rgba(16, 185, 129, 0.2)",
        "success-lg": "0 12px 32px rgba(16, 185, 129, 0.25)",
        premium: "0 12px 32px rgba(212, 175, 55, 0.25)",
        "premium-lg": "0 16px 40px rgba(212, 175, 55, 0.3)",
        error: "0 8px 24px rgba(239, 68, 68, 0.2)",
        inner: "inset 0 2px 4px rgba(10, 15, 30, 0.06)",
        "inner-lg": "inset 0 4px 8px rgba(10, 15, 30, 0.1)",
      },
      borderRadius: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      spacing: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
      },
      animation: {
        "gradient-shift": "gradientShift 3s ease infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### PostCSS Configuration

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## ⚡ Option 2: Bleeding Edge Stack (Current Setup)

### Core Framework Versions

| Package          | Version   | Status                 |
| ---------------- | --------- | ---------------------- |
| **Next.js**      | `^15.5.6` | Latest with Turbopack  |
| **React**        | `^19.1.0` | New release (Dec 2024) |
| **React DOM**    | `^19.1.0` | Matches React version  |
| **TypeScript**   | `^5.6.3`  | Latest stable          |
| **Tailwind CSS** | `^4.0.0`  | Beta (new syntax)      |

### Considerations

⚠️ **React 19**: Brand new, some libraries may have compatibility issues  
⚠️ **Tailwind v4**: Beta release, breaking changes from v3, limited plugins  
⚠️ **shadcn/ui**: May need manual configuration adjustments  
⚠️ **Aceternity UI**: Examples use React 18, may need tweaks  
✅ **Performance**: Faster with Turbopack and React Compiler  
✅ **Future-proof**: Ahead of the curve

### Complete Dependencies

```json
{
  "name": "codezest-admin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "next": "^15.5.6",

    "lucide-react": "^0.468.0",
    "framer-motion": "^11.15.0",
    "recharts": "^2.15.0",
    "react-hot-toast": "^2.4.1",
    "sonner": "^1.7.1",
    "vaul": "^1.1.1",
    "embla-carousel-react": "^8.5.1",
    "react-confetti": "^6.1.0",
    "react-wrap-balancer": "^1.1.1",

    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",

    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-checkbox": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.1",
    "@radix-ui/react-switch": "^1.1.1"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.7",
    "@types/react-dom": "^19.0.2",
    "@tailwindcss/postcss": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.5.6",
    "@eslint/eslintrc": "^3.2.0"
  }
}
```

### Installation Commands

```bash
# Install UI libraries
npm install lucide-react framer-motion recharts react-hot-toast sonner vaul embla-carousel-react react-confetti react-wrap-balancer

# Install utilities
npm install class-variance-authority clsx tailwind-merge

# Install Radix UI components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-switch

# Initialize shadcn/ui (may need manual config)
npx shadcn@latest init
```

### Tailwind Configuration (v4)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors - Primary */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-300: #60a5fa;
  --color-primary-400: #3b82f6;
  --color-primary-500: #2563eb;
  --color-primary-700: #1e3a5f;
  --color-primary-900: #0b1d3e;
  --color-primary-950: #0a1628;

  /* Colors - Success */
  --color-success-50: #ecfdf5;
  --color-success-100: #d1fae5;
  --color-success-300: #6ee7b7;
  --color-success-500: #10b981;
  --color-success-700: #047857;

  /* Colors - Warning */
  --color-warning-50: #fffbeb;
  --color-warning-100: #fef3c7;
  --color-warning-400: #fbbf24;
  --color-warning-500: #f59e0b;
  --color-warning-700: #b45309;

  /* Colors - Error */
  --color-error-50: #fef2f2;
  --color-error-100: #fee2e2;
  --color-error-400: #f87171;
  --color-error-500: #ef4444;
  --color-error-700: #b91c1c;

  /* Colors - Premium */
  --color-premium-gold: #d4af37;
  --color-premium-rose: #b76e79;
  --color-premium-platinum: #e5e4e2;
  --color-premium-navy: #001f3f;
  --color-premium-burgundy: #800020;

  /* Colors - Accent */
  --color-accent-purple: #8b5cf6;
  --color-accent-indigo: #6366f1;
  --color-accent-teal: #14b8a6;
  --color-accent-orange: #f97316;
  --color-accent-pink: #ec4899;

  /* Colors - Neutral */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #172033;
  --color-neutral-950: #0a0f1e;

  /* Font Families */
  --font-family-primary: Inter, sans-serif;
  --font-family-serif: Crimson Pro, Lora, Georgia, serif;
  --font-family-display: Manrope, Inter, sans-serif;
  --font-family-secondary: Space Grotesk, system-ui, sans-serif;
  --font-family-mono: JetBrains Mono, SF Mono, Fira Code, monospace;

  /* Spacing (8-point grid) */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-full: 9999px;
}
```

---

## 🔧 shadcn/ui Setup

### Configuration File

```typescript
// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Install shadcn/ui Components

```bash
# Essential components for Design System v2.0
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add dropdown-menu
npx shadcn@latest add popover
npx shadcn@latest add sheet
npx shadcn@latest add skeleton
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add progress
npx shadcn@latest add separator
npx shadcn@latest add tooltip
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add switch
```

---

## 🎨 Font Setup

### Google Fonts Import

Add to your `app/layout.tsx` or `_document.tsx`:

```tsx
import {
  Inter,
  Crimson_Pro,
  Manrope,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-secondary",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
      ${inter.variable} 
      ${crimsonPro.variable} 
      ${manrope.variable} 
      ${spaceGrotesk.variable} 
      ${jetbrainsMono.variable}
    `}
    >
      <body className="font-primary">{children}</body>
    </html>
  );
}
```

---

## 📦 Aceternity UI Setup

Aceternity UI components are **copy-paste** from their website. No npm package.

### How to Use

1. Visit [ui.aceternity.com](https://ui.aceternity.com)
2. Browse components
3. Copy the component code
4. Paste into `components/aceternity/` directory
5. Install any peer dependencies listed

### Recommended Components

- **BackgroundGradient** - Animated gradient backgrounds
- **HoverBorderGradient** - Premium button effects
- **SparklesCore** - Particle effects
- **TextGenerateEffect** - Animated text reveals
- **FloatingNav** - Modern navigation
- **BentoGrid** - Asymmetric layouts
- **MovingBorder** - Animated borders
- **BackgroundBeams** - Hero backgrounds

---

## 🚀 Quick Start Guide

### For New Projects (Option 1 - Recommended)

```bash
# 1. Create Next.js app
npx create-next-app@14 codezest-admin --typescript --tailwind --app

# 2. Navigate to project
cd codezest-admin

# 3. Install all dependencies from Option 1
npm install lucide-react framer-motion recharts react-hot-toast sonner vaul embla-carousel-react react-confetti react-wrap-balancer class-variance-authority clsx tailwind-merge

# 4. Install Radix UI
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-switch

# 5. Install tailwindcss-animate
npm install -D tailwindcss-animate

# 6. Initialize shadcn/ui
npx shadcn@latest init

# 7. Copy Tailwind config from this doc

# 8. Start development
npm run dev
```

### For Existing Projects (Upgrade from Option 2 to Option 1)

```bash
# 1. Backup current package.json
cp package.json package.json.backup

# 2. Downgrade core packages
npm install react@^18.3.1 react-dom@^18.3.1 next@^14.2.18

# 3. Update dev dependencies
npm install -D @types/react@^18 @types/react-dom@^18 tailwindcss@^3.4.17 postcss autoprefixer eslint@^8 eslint-config-next@^14.2.18

# 4. Remove Tailwind v4 packages
npm uninstall @tailwindcss/postcss

# 5. Install tailwindcss-animate
npm install -D tailwindcss-animate

# 6. Update tailwind.config.js (use v3 config from this doc)

# 7. Update package.json scripts (remove --turbopack flags)

# 8. Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install

# 9. Test the app
npm run dev
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm run dev` starts without errors
- [ ] TypeScript compiles without errors
- [ ] Tailwind classes are applied correctly
- [ ] shadcn/ui components render properly
- [ ] Fonts load correctly
- [ ] No console warnings about peer dependencies
- [ ] Hot reload works
- [ ] Build succeeds: `npm run build`

---

## 🔍 Troubleshooting

### Common Issues

#### Issue: "Module not found" errors

**Solution**: Clear cache and reinstall

```bash
rm -rf .next node_modules package-lock.json
npm install
```

#### Issue: Tailwind classes not working

**Solution**: Check `tailwind.config.js` content array includes all file paths

#### Issue: shadcn/ui components have type errors

**Solution**: Ensure React 18 types are installed

```bash
npm install -D @types/react@^18 @types/react-dom@^18
```

#### Issue: Framer Motion animations not working

**Solution**: Ensure you're importing from `framer-motion` not `framer-motion/dist`

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Aceternity UI Components](https://ui.aceternity.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)

---

## 🎯 Recommendation Summary

**For Production**: Use **Option 1** (Next.js 14 + React 18 + Tailwind v3)

**Reasons**:

1. Proven stability in production environments
2. Complete shadcn/ui compatibility
3. Full Aceternity UI support
4. Extensive community resources
5. Predictable behavior and fewer surprises

**When to use Option 2**: Only if you're experimenting with cutting-edge features and can handle potential breaking changes.

---

**Document Version**: 1.0  
**Maintained by**: CodeZest Development Team  
**Last Review**: November 24, 2025
