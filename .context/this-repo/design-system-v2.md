# CodeZest Design System v2.0

**Premium Educational Excellence Through Design**

A comprehensive, premium design system for an intelligent learning management and quiz platform, combining classic professional aesthetics with modern, standout design patterns.

---

## 🛠️ Technology Stack

### Core UI Libraries

#### **shadcn/ui** - Component Foundation

- **Purpose**: Accessible, customizable React components
- **Installation**: `npx shadcn-ui@latest init`
- **Components to use**: Button, Card, Dialog, Form, Input, Select, Tabs, Toast, Dropdown Menu, Popover, Sheet, Skeleton, Badge, Avatar, Progress, Separator, Tooltip
- **Why**: Radix UI primitives with full customization control, perfect for premium feel

#### **Aceternity UI** - Premium Components

- **Purpose**: Beautiful, animated components for standout design
- **Website**: https://ui.aceternity.com
- **Components to use**:
  - `BackgroundGradient` - Animated gradient backgrounds
  - `HoverBorderGradient` - Premium button effects
  - `SparklesCore` - Particle effects for hero sections
  - `TextGenerateEffect` - Animated text reveals
  - `CardStack` - Stacked card animations
  - `FloatingNav` - Modern floating navigation
  - `BentoGrid` - Asymmetric grid layouts
  - `MovingBorder` - Animated borders
  - `GlowingStars` - Background effects
  - `AnimatedTooltip` - Enhanced tooltips
- **Why**: Provides the "wow factor" and premium animations

#### **Lucide React** - Icon System

- **Purpose**: Beautiful, consistent icon library
- **Installation**: `npm install lucide-react`
- **Usage**: `import { BookOpen, Award, TrendingUp } from 'lucide-react'`
- **Why**: 1000+ icons, consistent design, tree-shakeable, perfect for educational context

### Additional Premium Libraries

#### **Framer Motion** - Animation Engine

- **Installation**: `npm install framer-motion`
- **Purpose**: Production-ready animations, gestures, and transitions
- **Use cases**: Page transitions, micro-interactions, scroll animations
- **Why**: Industry standard, performant, spring physics

#### **Recharts** - Data Visualization

- **Installation**: `npm install recharts`
- **Purpose**: Beautiful, responsive charts for analytics
- **Use cases**: Progress charts, performance graphs, statistics dashboards
- **Why**: Built on D3, React-friendly, customizable

#### **React Hot Toast** - Notifications

- **Installation**: `npm install react-hot-toast`
- **Purpose**: Beautiful, customizable toast notifications
- **Why**: Better UX than default alerts, highly customizable, accessible

#### **Vaul** - Premium Drawers

- **Installation**: `npm install vaul`
- **Purpose**: Smooth, gesture-based drawer component
- **Why**: Mobile-first, natural interactions, premium feel

#### **Embla Carousel** - Carousels

- **Installation**: `npm install embla-carousel-react`
- **Purpose**: Lightweight, extensible carousel
- **Why**: Smooth, performant, accessible

#### **React Confetti** - Celebrations

- **Installation**: `npm install react-confetti`
- **Purpose**: Celebratory animations for achievements
- **Why**: Gamification, positive reinforcement for learning

#### **React Wrap Balancer** - Typography

- **Installation**: `npm install react-wrap-balancer`
- **Purpose**: Balanced text wrapping for headings
- **Why**: Professional typography, prevents orphans

#### **Sonner** - Alternative Toast System

- **Installation**: `npm install sonner`
- **Purpose**: Opinionated toast component
- **Why**: Beautiful defaults, stacking, promise handling

#### **Class Variance Authority (CVA)** - Component Variants

- **Installation**: `npm install class-variance-authority`
- **Purpose**: Type-safe component variant management
- **Why**: Used by shadcn/ui, perfect for design system

#### **Tailwind Merge** - Class Management

- **Installation**: `npm install tailwind-merge`
- **Purpose**: Merge Tailwind classes without conflicts
- **Why**: Essential for component composition

---

## 🎨 Enhanced Color Palette

### Primary Education Colors

_Trust, knowledge, and achievement_

| Token           | Name           | Hex     | RGB                | HSL                 | Usage                              |
| --------------- | -------------- | ------- | ------------------ | ------------------- | ---------------------------------- |
| **primary-950** | Midnight Navy  | #0A1628 | rgb(10, 22, 40)    | hsl(216, 60%, 10%)  | Deep backgrounds, dark mode        |
| **primary-900** | Deep Scholar   | #0B1D3E | rgb(11, 29, 62)    | hsl(220, 70%, 14%)  | Headers, primary text, dark themes |
| **primary-700** | Academic Navy  | #1E3A5F | rgb(30, 58, 95)    | hsl(213, 52%, 24%)  | Navigation bars, footers           |
| **primary-500** | Knowledge Blue | #2563EB | rgb(37, 99, 235)   | hsl(221, 83%, 53%)  | Primary buttons, active states     |
| **primary-400** | Learning Sky   | #3B82F6 | rgb(59, 130, 246)  | hsl(221, 83%, 60%)  | Links, interactive elements        |
| **primary-300** | Clarity Blue   | #60A5FA | rgb(96, 165, 250)  | hsl(213, 94%, 68%)  | Hover states, highlights           |
| **primary-100** | Frost          | #DBEAFE | rgb(219, 234, 254) | hsl(214, 95%, 93%)  | Light backgrounds, badges          |
| **primary-50**  | Ice            | #EFF6FF | rgb(239, 246, 255) | hsl(214, 100%, 97%) | Subtle backgrounds                 |

### Premium Tier Colors ✨ NEW

_Luxury, achievement, and exclusivity_

| Token                | Name            | Hex     | RGB                | HSL                 | Usage                        |
| -------------------- | --------------- | ------- | ------------------ | ------------------- | ---------------------------- |
| **premium-gold**     | Classic Gold    | #D4AF37 | rgb(212, 175, 55)  | hsl(46, 64%, 52%)   | Premium features, pro badges |
| **premium-rose**     | Rose Gold       | #B76E79 | rgb(183, 110, 121) | hsl(351, 33%, 57%)  | Premium accents              |
| **premium-platinum** | Platinum Silver | #E5E4E2 | rgb(229, 228, 226) | hsl(40, 8%, 89%)    | Platinum tier badges         |
| **premium-navy**     | Authority Navy  | #001F3F | rgb(0, 31, 63)     | hsl(210, 100%, 12%) | Premium dark backgrounds     |
| **premium-burgundy** | Excellence Wine | #800020 | rgb(128, 0, 32)    | hsl(345, 100%, 25%) | High achievement markers     |

### Success & Achievement Colors

_Progress, completion, and mastery_

| Token           | Name          | Hex     | RGB                | HSL                | Usage                           |
| --------------- | ------------- | ------- | ------------------ | ------------------ | ------------------------------- |
| **success-700** | Mastery Green | #047857 | rgb(4, 120, 87)    | hsl(163, 94%, 24%) | High scores, completion         |
| **success-500** | Achievement   | #10B981 | rgb(16, 185, 129)  | hsl(160, 84%, 39%) | Correct answers, success states |
| **success-300** | Progress      | #6EE7B7 | rgb(110, 231, 183) | hsl(156, 73%, 67%) | Progress indicators             |
| **success-100** | Fresh Mint    | #D1FAE5 | rgb(209, 250, 229) | hsl(149, 80%, 90%) | Success backgrounds             |
| **success-50**  | Celebration   | #ECFDF5 | rgb(236, 253, 245) | hsl(151, 81%, 96%) | Subtle success tints            |

### Warning & Attention Colors

_Alerts, pending items, and caution_

| Token           | Name         | Hex     | RGB                | HSL                | Usage                  |
| --------------- | ------------ | ------- | ------------------ | ------------------ | ---------------------- |
| **warning-700** | Alert Amber  | #B45309 | rgb(180, 83, 9)    | hsl(26, 90%, 37%)  | Important warnings     |
| **warning-500** | Attention    | #F59E0B | rgb(245, 158, 11)  | hsl(38, 92%, 50%)  | Time warnings, pending |
| **warning-400** | Caution Gold | #FBBF24 | rgb(251, 191, 36)  | hsl(43, 96%, 56%)  | Partial credit, review |
| **warning-100** | Soft Yellow  | #FEF3C7 | rgb(254, 243, 199) | hsl(48, 96%, 89%)  | Warning backgrounds    |
| **warning-50**  | Pale Sun     | #FFFBEB | rgb(255, 251, 235) | hsl(48, 100%, 96%) | Subtle warnings        |

### Error & Incorrect Colors

_Wrong answers, errors, and critical alerts_

| Token         | Name         | Hex     | RGB                | HSL              | Usage                 |
| ------------- | ------------ | ------- | ------------------ | ---------------- | --------------------- |
| **error-700** | Critical Red | #B91C1C | rgb(185, 28, 28)   | hsl(0, 74%, 42%) | Failed states, errors |
| **error-500** | Incorrect    | #EF4444 | rgb(239, 68, 68)   | hsl(0, 84%, 60%) | Wrong answers, alerts |
| **error-400** | Alert Coral  | #F87171 | rgb(248, 113, 113) | hsl(0, 91%, 71%) | Error highlights      |
| **error-100** | Rose Blush   | #FEE2E2 | rgb(254, 226, 226) | hsl(0, 93%, 94%) | Error backgrounds     |
| **error-50**  | Soft Pink    | #FEF2F2 | rgb(254, 242, 242) | hsl(0, 86%, 97%) | Subtle error tints    |

### Secondary Accent Colors

_Categories, tags, and visual variety_

| Token             | Name             | Hex     | RGB               | HSL                | Usage                    |
| ----------------- | ---------------- | ------- | ----------------- | ------------------ | ------------------------ |
| **accent-purple** | Scholar Purple   | #8B5CF6 | rgb(139, 92, 246) | hsl(258, 90%, 66%) | Science, theory topics   |
| **accent-indigo** | Logic Indigo     | #6366F1 | rgb(99, 102, 241) | hsl(239, 84%, 67%) | Math, logic categories   |
| **accent-teal**   | Practice Teal    | #14B8A6 | rgb(20, 184, 166) | hsl(173, 80%, 40%) | Practice mode, exercises |
| **accent-orange** | Challenge Orange | #F97316 | rgb(249, 115, 22) | hsl(25, 95%, 53%)  | Challenges, competitions |
| **accent-pink**   | Creative Pink    | #EC4899 | rgb(236, 72, 153) | hsl(330, 81%, 60%) | Creative subjects, arts  |

### Enhanced Neutral Scale ✨ REFINED

_Base structure, text, and backgrounds with warmer tones_

| Token           | Name           | Hex     | RGB                | HSL                | Usage                     |
| --------------- | -------------- | ------- | ------------------ | ------------------ | ------------------------- |
| **neutral-950** | Midnight Text  | #0A0F1E | rgb(10, 15, 30)    | hsl(225, 50%, 8%)  | Headings, dark text       |
| **neutral-900** | Ink            | #172033 | rgb(23, 32, 51)    | hsl(221, 38%, 15%) | Primary text              |
| **neutral-800** | Charcoal       | #1E293B | rgb(30, 41, 59)    | hsl(217, 33%, 17%) | Body text, strong         |
| **neutral-700** | Slate          | #334155 | rgb(51, 65, 85)    | hsl(215, 25%, 27%) | Secondary text            |
| **neutral-600** | Steel          | #475569 | rgb(71, 85, 105)   | hsl(215, 19%, 35%) | Muted text                |
| **neutral-500** | Gray           | #64748B | rgb(100, 116, 139) | hsl(215, 16%, 47%) | Placeholders              |
| **neutral-400** | Silver         | #94A3B8 | rgb(148, 163, 184) | hsl(214, 20%, 65%) | Disabled text             |
| **neutral-300** | Light Gray     | #CBD5E1 | rgb(203, 213, 225) | hsl(214, 32%, 84%) | Borders, dividers         |
| **neutral-200** | Cloud          | #E2E8F0 | rgb(226, 232, 240) | hsl(214, 32%, 91%) | Light borders             |
| **neutral-100** | Mist           | #F1F5F9 | rgb(241, 245, 249) | hsl(214, 32%, 96%) | Card backgrounds          |
| **neutral-50**  | Snow           | #F8FAFC | rgb(248, 250, 252) | hsl(210, 40%, 98%) | Page background           |
| **neutral-0**   | Pure White     | #FFFFFF | rgb(255, 255, 255) | hsl(0, 0%, 100%)   | White surfaces            |
| **warm-100**    | Warm Off-White | #F5F3F0 | rgb(245, 243, 240) | hsl(36, 22%, 95%)  | Softer backgrounds ✨ NEW |

---

## 📝 Enhanced Typography System

### Font Families ✨ ENHANCED

```css
/* Primary Sans-Serif - UI and Body */
--font-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Serif - Classic Headings and Display ✨ NEW */
--font-serif: "Crimson Pro", "Lora", Georgia, serif;

/* Display - Modern Headings */
--font-display: "Manrope", "Inter", sans-serif;

/* Secondary - Geometric Emphasis */
--font-secondary: "Space Grotesk", system-ui, sans-serif;

/* Monospace - Code and Technical */
--font-mono: "JetBrains Mono", "SF Mono", "Fira Code", monospace;
```

**Font Philosophy:**

- **Inter**: Clean, highly legible for body text and UI (400, 500, 600, 700)
- **Crimson Pro**: Classic serif for authority and elegance in headings ✨ NEW
- **Manrope**: Geometric display font for hero sections and branding
- **Space Grotesk**: Modern geometric for emphasis and subheadings
- **JetBrains Mono**: Code snippets, programming questions

**Google Fonts Import:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### Type Scale & Hierarchy

| Token           | Size             | Line Height | Weight | Letter Spacing | Font Family    | Usage                  |
| --------------- | ---------------- | ----------- | ------ | -------------- | -------------- | ---------------------- |
| **display-2xl** | 60px (3.75rem)   | 1.1 (66px)  | 700    | -0.03em        | Crimson Pro ✨ | Hero headlines         |
| **display-xl**  | 48px (3rem)      | 1.15 (55px) | 700    | -0.03em        | Crimson Pro ✨ | Page titles            |
| **display-lg**  | 40px (2.5rem)    | 1.2 (48px)  | 700    | -0.02em        | Manrope        | Section headers        |
| **heading-xl**  | 32px (2rem)      | 1.25 (40px) | 600    | -0.02em        | Crimson Pro ✨ | H1 - Main headings     |
| **heading-lg**  | 28px (1.75rem)   | 1.3 (36px)  | 600    | -0.01em        | Manrope        | H2 - Subheadings       |
| **heading-md**  | 24px (1.5rem)    | 1.35 (32px) | 600    | 0              | Manrope        | H3 - Section titles    |
| **heading-sm**  | 20px (1.25rem)   | 1.4 (28px)  | 600    | 0              | Inter          | H4 - Card titles       |
| **heading-xs**  | 18px (1.125rem)  | 1.4 (25px)  | 600    | 0              | Inter          | H5 - Small headers     |
| **body-lg**     | 18px (1.125rem)  | 1.6 (28px)  | 400    | 0              | Inter          | Large body, intros     |
| **body-base**   | 16px (1rem)      | 1.6 (26px)  | 400    | 0              | Inter          | Default body text      |
| **body-sm**     | 14px (0.875rem)  | 1.5 (21px)  | 400    | 0.01em         | Inter          | Secondary text         |
| **caption**     | 13px (0.8125rem) | 1.5 (19px)  | 500    | 0.02em         | Inter          | Labels, metadata       |
| **overline**    | 12px (0.75rem)   | 1.5 (18px)  | 600    | 0.08em         | Space Grotesk  | Uppercase labels       |
| **micro**       | 11px (0.6875rem) | 1.4 (15px)  | 500    | 0.03em         | Inter          | Fine print, timestamps |

### Font Feature Settings ✨ NEW

```css
/* Enable OpenType features for premium typography */
body {
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Old-style numerals for body text (optional) */
.text-oldstyle-nums {
  font-feature-settings: "kern" 1, "liga" 1, "onum" 1;
}

/* Tabular numerals for data/tables */
.text-tabular-nums {
  font-feature-settings: "tnum" 1;
  font-variant-numeric: tabular-nums;
}
```

---

## 📐 Spacing System

**8-Point Grid** for perfect alignment

| Token        | px   | rem     | Usage                         |
| ------------ | ---- | ------- | ----------------------------- |
| **space-0**  | 0px  | 0       | No spacing                    |
| **space-1**  | 4px  | 0.25rem | Micro gaps, icon spacing      |
| **space-2**  | 8px  | 0.5rem  | Tight padding, small gaps     |
| **space-3**  | 12px | 0.75rem | Compact buttons, form spacing |
| **space-4**  | 16px | 1rem    | Default padding, card spacing |
| **space-5**  | 20px | 1.25rem | Medium gaps                   |
| **space-6**  | 24px | 1.5rem  | Section spacing               |
| **space-8**  | 32px | 2rem    | Large spacing, content blocks |
| **space-10** | 40px | 2.5rem  | Major sections                |
| **space-12** | 48px | 3rem    | Hero padding                  |
| **space-16** | 64px | 4rem    | Page sections                 |
| **space-20** | 80px | 5rem    | Large separations             |
| **space-24** | 96px | 6rem    | Maximum spacing               |

---

## 🎯 Premium Shadow System ✨ ENHANCED

### Multi-Layer Shadows

```css
/* Subtle Elevation */
--shadow-xs: 0 1px 2px rgba(10, 15, 30, 0.04);

/* Small Cards */
--shadow-sm: 0 1px 2px rgba(10, 15, 30, 0.06), 0 2px 4px rgba(10, 15, 30, 0.04);

/* Standard Cards */
--shadow-md: 0 2px 4px rgba(10, 15, 30, 0.06), 0 4px 8px rgba(10, 15, 30, 0.08),
  0 8px 16px rgba(10, 15, 30, 0.04);

/* Elevated Cards */
--shadow-lg: 0 4px 8px rgba(10, 15, 30, 0.08), 0 8px 16px rgba(10, 15, 30, 0.1),
  0 16px 32px rgba(10, 15, 30, 0.06);

/* Modals & Overlays */
--shadow-xl: 0 8px 16px rgba(10, 15, 30, 0.1), 0 16px 32px rgba(10, 15, 30, 0.12),
  0 24px 48px rgba(10, 15, 30, 0.08);

/* Maximum Elevation */
--shadow-2xl: 0 12px 24px rgba(10, 15, 30, 0.12), 0 24px 48px rgba(10, 15, 30, 0.14),
  0 32px 64px rgba(10, 15, 30, 0.1);
```

### Colored Shadows ✨ NEW

```css
/* Primary Blue Glow */
--shadow-primary: 0 8px 24px rgba(37, 99, 235, 0.2);
--shadow-primary-lg: 0 12px 32px rgba(37, 99, 235, 0.25);

/* Success Green Glow */
--shadow-success: 0 8px 24px rgba(16, 185, 129, 0.2);
--shadow-success-lg: 0 12px 32px rgba(16, 185, 129, 0.25);

/* Premium Gold Glow */
--shadow-premium: 0 12px 32px rgba(212, 175, 55, 0.25);
--shadow-premium-lg: 0 16px 40px rgba(212, 175, 55, 0.3);

/* Error Red Glow */
--shadow-error: 0 8px 24px rgba(239, 68, 68, 0.2);

/* Inner Shadows for Depth */
--shadow-inner: inset 0 2px 4px rgba(10, 15, 30, 0.06);
--shadow-inner-lg: inset 0 4px 8px rgba(10, 15, 30, 0.1);
```

---

## 🎨 Animation System ✨ NEW

### Easing Functions

```css
/* Natural Easing */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring Physics */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-spring-subtle: cubic-bezier(0.5, 1.25, 0.75, 1.25);

/* Bounce */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Elastic */
--ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
```

### Duration Tokens

```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-base: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
--duration-slowest: 1000ms;
```

### Framer Motion Variants

```typescript
// Fade In Up
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
};

// Scale In
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] },
};

// Slide In from Right
export const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { type: "spring", stiffness: 300, damping: 30 },
};

// Stagger Children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

---

## 🎯 Premium Component Patterns

### 1. Glassmorphism Components ✨ NEW

```css
/* Glass Card */
.card-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(10, 15, 30, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border-radius: 16px;
}

/* Glass Modal */
.modal-glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: var(--shadow-2xl);
}

/* Dark Glass (for dark mode) */
.card-glass-dark {
  background: rgba(23, 32, 51, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### 2. Gradient Border Cards ✨ NEW

```css
/* Premium Card with Animated Gradient Border */
.card-gradient-border {
  position: relative;
  padding: 2px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2563eb, #8b5cf6, #ec4899);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

.card-gradient-border-inner {
  background: white;
  border-radius: 14px;
  padding: 32px;
  height: 100%;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Gold Premium Border */
.card-premium-gold {
  background: linear-gradient(135deg, #d4af37, #ffd700, #d4af37);
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
}
```

### 3. Floating Navigation ✨ NEW

```tsx
// Using Aceternity UI FloatingNav
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, BookOpen, Award, User } from "lucide-react";

const navItems = [
  { name: "Dashboard", link: "/", icon: <Home className="h-4 w-4" /> },
  { name: "Courses", link: "/courses", icon: <BookOpen className="h-4 w-4" /> },
  {
    name: "Achievements",
    link: "/achievements",
    icon: <Award className="h-4 w-4" />,
  },
  { name: "Profile", link: "/profile", icon: <User className="h-4 w-4" /> },
];

export function Navigation() {
  return <FloatingNav navItems={navItems} />;
}
```

### 4. Premium Buttons with shadcn/ui ✨ NEW

```tsx
// components/ui/premium-button.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "premium" | "success";
  children: React.ReactNode;
}

export function PremiumButton({
  variant = "primary",
  children,
  className,
  ...props
}: PremiumButtonProps) {
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-primary",
    premium:
      "bg-gradient-to-r from-premium-gold to-yellow-500 text-white shadow-premium",
    success: "bg-success-500 hover:bg-success-600 text-white shadow-success",
  };

  return (
    <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          variants[variant],
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-white opacity-0 hover:opacity-20"
          initial={{ scale: 0, borderRadius: "50%" }}
          whileHover={{ scale: 2, borderRadius: "0%" }}
          transition={{ duration: 0.6 }}
        />
      </Button>
    </motion.div>
  );
}
```

### 5. Circular Progress Ring ✨ NEW

```tsx
// components/ui/circular-progress.tsx
import { motion } from "framer-motion";

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function CircularProgress({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "#2563eb",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-neutral-900"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  );
}
```

### 6. Achievement Badge with Confetti ✨ NEW

```tsx
// components/ui/achievement-badge.tsx
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useState } from "react";

interface AchievementBadgeProps {
  title: string;
  tier?: "bronze" | "silver" | "gold" | "platinum";
  showConfetti?: boolean;
}

export function AchievementBadge({
  title,
  tier = "gold",
  showConfetti = false,
}: AchievementBadgeProps) {
  const [celebrate, setCelebrate] = useState(showConfetti);

  const tierColors = {
    bronze: "bg-orange-100 text-orange-700 border-orange-300",
    silver: "bg-gray-100 text-gray-700 border-gray-300",
    gold: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-400",
    platinum:
      "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border-slate-400",
  };

  return (
    <>
      {celebrate && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={() => setCelebrate(false)}
        />
      )}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Badge
          className={`${tierColors[tier]} border-2 px-4 py-2 text-sm font-semibold`}
        >
          <Award className="w-4 h-4 mr-2" />
          {title}
        </Badge>
      </motion.div>
    </>
  );
}
```

### 7. Floating Label Input ✨ NEW

```tsx
// components/ui/floating-input.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function FloatingInput({
  label,
  id,
  className,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        className={cn("peer pt-6 pb-2", className)}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        placeholder=" "
        {...props}
      />
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isFocused || hasValue
            ? "top-2 text-xs text-primary-500 font-semibold"
            : "top-1/2 -translate-y-1/2 text-neutral-500"
        )}
      >
        {label}
      </Label>
    </div>
  );
}
```

### 8. Quiz Question Card with Aceternity ✨ NEW

```tsx
// components/quiz/question-card.tsx
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption?: number;
  correctOption?: number;
  onSelect: (index: number) => void;
}

export function QuestionCard({
  question,
  options,
  selectedOption,
  correctOption,
  onSelect,
}: QuestionCardProps) {
  return (
    <BackgroundGradient className="rounded-[22px] p-8 bg-white">
      <h3 className="text-2xl font-semibold text-neutral-900 mb-6 font-serif">
        {question}
      </h3>

      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = correctOption === index;
          const isIncorrect =
            selectedOption === index && correctOption !== index;

          return (
            <motion.button
              key={index}
              onClick={() => onSelect(index)}
              className={cn(
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-200",
                isCorrect && "border-success-500 bg-success-50",
                isIncorrect && "border-error-500 bg-error-50",
                !isCorrect &&
                  !isIncorrect &&
                  isSelected &&
                  "border-primary-500 bg-primary-50",
                !isSelected &&
                  !isCorrect &&
                  "border-neutral-300 hover:border-primary-400 hover:bg-primary-50"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-neutral-900">{option}</span>
                {isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-success-500" />
                )}
                {isIncorrect && <XCircle className="w-5 h-5 text-error-500" />}
              </div>
            </motion.button>
          );
        })}
      </div>
    </BackgroundGradient>
  );
}
```

---

## 🎨 Background Patterns & Textures ✨ NEW

### Noise Texture

```css
.bg-noise {
  position: relative;
}

.bg-noise::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
```

### Dot Grid Pattern

```css
.bg-dots {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(51, 65, 85, 0.15) 1px,
    transparent 0
  );
  background-size: 24px 24px;
}

.bg-dots-light {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(203, 213, 225, 0.4) 1px,
    transparent 0
  );
  background-size: 20px 20px;
}
```

### Mesh Gradient

```css
.bg-mesh {
  background: radial-gradient(
      at 27% 37%,
      hsla(215, 98%, 61%, 0.08) 0px,
      transparent 50%
    ), radial-gradient(
      at 97% 21%,
      hsla(125, 98%, 72%, 0.08) 0px,
      transparent 50%
    ), radial-gradient(
      at 52% 99%,
      hsla(354, 98%, 61%, 0.08) 0px,
      transparent 50%
    ), radial-gradient(
      at 10% 29%,
      hsla(256, 96%, 67%, 0.08) 0px,
      transparent 50%
    ), radial-gradient(at 92% 85%, hsla(46, 96%, 64%, 0.08) 0px, transparent 50%);
}
```

### Animated Gradient Background

```tsx
// Using Aceternity UI
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";

export function HeroSection() {
  return (
    <div className="relative h-screen w-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <BackgroundBeams />

      {/* Content */}
      <h1 className="relative z-20 text-6xl font-bold text-white">
        Welcome to CodeZest
      </h1>
    </div>
  );
}
```

---

## 📊 Data Visualization Components

### Progress Bar with Recharts

```tsx
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function AnimatedProgress({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-neutral-700 font-medium">{label}</span>
        <span className="text-primary-500 font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ boxShadow: "0 0 8px rgba(37, 99, 235, 0.4)" }}
        />
      </div>
    </div>
  );
}
```

### Performance Chart

```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", score: 65 },
  { name: "Week 2", score: 72 },
  { name: "Week 3", score: 78 },
  { name: "Week 4", score: 85 },
];

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="name" stroke="#64748B" />
        <YAxis stroke="#64748B" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#2563eb"
          strokeWidth={3}
          fill="url(#colorScore)"
          dot={{ fill: "#2563eb", r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

---

## 🎓 Educational UI Patterns

### Course Card with Hover Effect

```tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

export function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-2 border-neutral-200 hover:border-primary-400 hover:shadow-lg transition-all duration-300">
        <div className="h-48 bg-gradient-to-br from-primary-500 to-accent-purple relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-white/90 text-primary-700">
              {course.category}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-2 font-display">
            {course.title}
          </h3>
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
```

### Leaderboard Component

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";

export function Leaderboard({ users }) {
  return (
    <div className="space-y-2">
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "flex items-center gap-4 p-4 rounded-lg border-2 transition-all",
            index === 0 &&
              "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300",
            index === 1 &&
              "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300",
            index === 2 &&
              "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300",
            index > 2 && "bg-white border-neutral-200 hover:border-primary-300"
          )}
        >
          <div className="flex items-center justify-center w-8">
            {index === 0 && <Trophy className="w-6 h-6 text-yellow-600" />}
            {index === 1 && <Medal className="w-6 h-6 text-gray-600" />}
            {index === 2 && <Medal className="w-6 h-6 text-orange-600" />}
            {index > 2 && (
              <span className="text-neutral-500 font-semibold">
                #{index + 1}
              </span>
            )}
          </div>

          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <p className="font-semibold text-neutral-900">{user.name}</p>
            <p className="text-sm text-neutral-500">{user.points} points</p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-primary-500">{user.score}%</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

---

## 🎨 Border Radius System

| Token           | Value  | Usage               |
| --------------- | ------ | ------------------- |
| **radius-sm**   | 4px    | Tags, badges        |
| **radius-base** | 8px    | Buttons, inputs     |
| **radius-md**   | 12px   | Cards, containers   |
| **radius-lg**   | 16px   | Large cards, modals |
| **radius-xl**   | 24px   | Hero sections       |
| **radius-2xl**  | 32px   | Premium elements    |
| **radius-full** | 9999px | Pills, avatars      |

---

## ✨ Design Principles

1. **Clarity First**: Information hierarchy is paramount for learning
2. **Accessible**: WCAG 2.1 AA compliant, 4.5:1 contrast minimum
3. **Consistent**: 8px grid system throughout
4. **Encouraging**: Celebrate progress with color and animation
5. **Professional**: Academic credibility meets modern design
6. **Responsive**: Mobile-first approach for on-the-go learning
7. **Premium Feel**: Glassmorphism, gradients, and micro-interactions ✨
8. **Performance**: Optimized animations, lazy loading, tree-shaking ✨

---

## 📦 Installation Checklist

### Core Dependencies

```bash
# shadcn/ui setup
npx shadcn-ui@latest init

# Install shadcn components
npx shadcn-ui@latest add button card dialog form input select tabs toast dropdown-menu popover sheet skeleton badge avatar progress separator tooltip label

# Aceternity UI (copy components from website)
# https://ui.aceternity.com

# Icons
npm install lucide-react

# Animation
npm install framer-motion

# Charts
npm install recharts

# Notifications
npm install react-hot-toast sonner

# Utilities
npm install class-variance-authority tailwind-merge clsx

# Additional
npm install vaul embla-carousel-react react-confetti react-wrap-balancer
```

### Font Setup

```html
<!-- Add to index.html or layout -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

---

## 🎯 Component Library Structure

```
src/
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── aceternity/                  # Aceternity UI components
│   │   ├── background-gradient.tsx
│   │   ├── floating-nav.tsx
│   │   ├── sparkles.tsx
│   │   └── ...
│   ├── premium/                     # Custom premium components
│   │   ├── premium-button.tsx
│   │   ├── circular-progress.tsx
│   │   ├── floating-input.tsx
│   │   └── achievement-badge.tsx
│   ├── quiz/                        # Quiz-specific components
│   │   ├── question-card.tsx
│   │   ├── quiz-timer.tsx
│   │   └── answer-feedback.tsx
│   └── course/                      # Course components
│       ├── course-card.tsx
│       ├── lesson-list.tsx
│       └── progress-tracker.tsx
├── lib/
│   ├── utils.ts                     # cn() utility
│   └── animations.ts                # Framer Motion variants
└── styles/
    └── globals.css                  # Global styles & CSS variables
```

---

## 🚀 Next Steps

1. **Install all dependencies** from the checklist
2. **Set up shadcn/ui** with `npx shadcn-ui@latest init`
3. **Copy Aceternity components** from their website
4. **Configure Tailwind** with design tokens
5. **Create component library** following the structure
6. **Build example pages** to showcase the system
7. **Document component usage** with Storybook (optional)

---

**CodeZest Design System v2.0** | Premium Educational Excellence

_Built with shadcn/ui, Aceternity UI, Lucide React, Framer Motion, and modern web technologies_
