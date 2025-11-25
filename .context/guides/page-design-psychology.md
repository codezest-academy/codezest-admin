# Page Design Psychology - CodeZest Design System

**Purpose**: Mental framework for designing pages with Deep Indigo design system  
**Last Updated**: 2025-11-25

---

## 🧠 Design Psychology Framework

### Core Philosophy

**"Guide the eye, create hierarchy, maintain consistency"**

Every page should tell a visual story that guides users naturally through the content.

---

## 🎨 Visual Hierarchy Principles

### 1. The 60-30-10 Color Rule

**60% - Neutral Background** (Warm Stone)

```tsx
// Page background
<div className="min-h-screen bg-neutral-50">
```

**30% - White Surfaces** (Cards, Containers)

```tsx
// Content cards
<Card className="bg-white">
```

**10% - Primary Accents** (Deep Indigo)

```tsx
// Buttons, links, active states
<Button className="bg-primary">
```

**Visual Balance**:

- ✅ Mostly neutral (calm, professional)
- ✅ Some white (clean, organized)
- ✅ Sparingly primary (attention, action)

---

### 2. The F-Pattern Reading Flow

Users scan pages in an F-pattern. Design accordingly:

```
┌─────────────────────────────┐
│ [Header/Title]──────────────│  ← Horizontal scan
│                             │
│ [Important Info]────────────│  ← Horizontal scan
│                             │
│ [Content]                   │  ↓ Vertical scan
│ [Content]                   │  ↓
│ [Content]                   │  ↓
└─────────────────────────────┘
```

**Apply This**:

```tsx
<div className="space-y-6">
  {/* Top: Most important - scanned first */}
  <h1 className="text-4xl font-bold text-neutral-900">Dashboard</h1>

  {/* Second: Key metrics - scanned second */}
  <StatsGrid stats={stats} />

  {/* Below: Detailed content - scanned vertically */}
  <div className="grid gap-6">
    <OverviewChart />
    <RecentActivity />
  </div>
</div>
```

---

### 3. The Z-Pattern for Landing Pages

For marketing/landing pages, use Z-pattern:

```
┌─────────────────────────────┐
│ Logo ──────────────── CTA   │  ← Top horizontal
│        ↘                    │
│           ↘                 │
│              ↘              │
│ Content        ↘            │
│                   ↘         │
│ Feature ──────────── CTA    │  ← Bottom horizontal
└─────────────────────────────┘
```

---

## 🎯 Page Layout Psychology

### Layout Structure

```tsx
<div className="min-h-screen bg-neutral-50">
  {/* 1. Navigation - Fixed, always visible */}
  <Navbar />

  {/* 2. Main Content - Scrollable, centered */}
  <main className="container mx-auto max-w-7xl px-4 py-8">
    {/* 3. Page Header - Clear context */}
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-neutral-900">Page Title</h1>
      <p className="text-neutral-600 mt-2">Page description</p>
    </header>

    {/* 4. Primary Content - Most important first */}
    <section className="mb-12">
      <PrimaryContent />
    </section>

    {/* 5. Secondary Content - Supporting information */}
    <section className="mb-12">
      <SecondaryContent />
    </section>

    {/* 6. Tertiary Content - Additional details */}
    <section>
      <TertiaryContent />
    </section>
  </main>
</div>
```

---

## 🎨 Color Psychology Application

### When to Use Each Color

**Deep Indigo (Primary)**:

- **Psychology**: Trust, professionalism, innovation
- **Use For**: Actions, links, active states
- **Amount**: 10% of page (sparingly)

```tsx
// ✅ Good use - Calls to action
<Button className="bg-primary">Start Learning</Button>
<Link className="text-primary-600">View Course</Link>

// ❌ Bad use - Too much
<div className="bg-primary"> {/* Don't use for large areas */}
```

**Warm Neutrals**:

- **Psychology**: Calm, approachable, professional
- **Use For**: Backgrounds, text, structure
- **Amount**: 90% of page (majority)

```tsx
// ✅ Good use - Structure and content
<div className="bg-neutral-50"> {/* Page background */}
<p className="text-neutral-600"> {/* Body text */}
<Card className="border-neutral-200"> {/* Borders */}
```

**Success Green**:

- **Psychology**: Achievement, positive, growth
- **Use For**: Positive metrics, success states
- **Amount**: <5% (only when needed)

```tsx
// ✅ Good use - Positive indicators
<span className="text-success-600">+20.1% ↑</span>
```

**Warning Orange**:

- **Psychology**: Caution, attention, important
- **Use For**: Warnings, important notices
- **Amount**: <5% (only when needed)

**Error Red**:

- **Psychology**: Danger, stop, error
- **Use For**: Errors, destructive actions
- **Amount**: <5% (only when needed)

---

## 📐 Spacing Psychology

### The Breathing Room Principle

**More space = More importance**

```tsx
// High importance - More space
<section className="py-16 space-y-8">
  <h1 className="text-4xl mb-6">Important Title</h1>
  <p className="text-xl">Important content</p>
</section>

// Medium importance - Medium space
<section className="py-8 space-y-4">
  <h2 className="text-2xl mb-4">Section Title</h2>
  <p>Regular content</p>
</section>

// Low importance - Less space
<section className="py-4 space-y-2">
  <h3 className="text-sm mb-2">Minor Detail</h3>
  <p className="text-xs">Small text</p>
</section>
```

### Grouping Related Content

**Proximity = Relationship**

```tsx
// ✅ Good - Related items grouped
<div className="space-y-2"> {/* Small gap = related */}
  <Label>Email</Label>
  <Input type="email" />
  <p className="text-xs text-neutral-500">Helper text</p>
</div>

<div className="mt-6"> {/* Large gap = separate */}
  <Label>Password</Label>
  <Input type="password" />
</div>
```

---

## 🎭 Component Hierarchy

### Visual Weight Distribution

**1. Hero/Primary** (Heaviest weight):

```tsx
<div className="bg-primary text-white p-12 rounded-xl shadow-lg">
  <h1 className="text-5xl font-bold">Hero Content</h1>
</div>
```

**2. Important Cards** (Medium-heavy weight):

```tsx
<Card className="border-primary-200 shadow-md">
  <CardHeader>
    <div className="h-12 w-12 bg-primary-50 rounded-lg">
      <Icon className="text-primary-600" />
    </div>
  </CardHeader>
</Card>
```

**3. Regular Cards** (Medium weight):

```tsx
<Card className="shadow-sm">
  <CardContent>Regular content</CardContent>
</Card>
```

**4. Subtle Elements** (Light weight):

```tsx
<div className="text-neutral-500 text-sm">Subtle information</div>
```

---

## 🎯 Page Design Workflow

### Step-by-Step Process

**Step 1: Define Purpose**

```
Ask: What is the main goal of this page?
- Dashboard: Show overview metrics
- Form: Collect user input
- List: Display items for selection
```

**Step 2: Establish Hierarchy**

```
1. Most important (top, large, primary color)
2. Important (middle, medium, neutral)
3. Supporting (bottom, small, muted)
```

**Step 3: Choose Layout Pattern**

**Dashboard Pattern**:

```tsx
<div className="space-y-6">
  <StatsGrid /> {/* Top: Key metrics */}
  <MainChart /> {/* Middle: Detailed view */}
  <RecentActivity /> {/* Bottom: Updates */}
</div>
```

**Form Pattern**:

```tsx
<Card className="max-w-2xl mx-auto">
  <CardHeader>
    <CardTitle>Form Title</CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    <FormFields />
  </CardContent>
  <CardFooter>
    <Button>Submit</Button>
  </CardFooter>
</Card>
```

**List Pattern**:

```tsx
<div className="space-y-4">
  <div className="flex justify-between items-center">
    <h1>Items</h1>
    <Button>Add New</Button>
  </div>
  <div className="grid gap-4">
    {items.map((item) => (
      <ItemCard />
    ))}
  </div>
</div>
```

**Step 4: Apply Color Strategy**

```
- Background: neutral-50 (60%)
- Cards: white (30%)
- Actions: primary (10%)
```

**Step 5: Add Spacing**

```
- Sections: space-y-8 or space-y-12
- Cards: p-6
- Grid gaps: gap-4 or gap-6
```

**Step 6: Refine Typography**

```
- Page title: text-4xl font-bold
- Section titles: text-2xl font-semibold
- Body: text-base
- Captions: text-sm text-neutral-500
```

---

## 🎨 Practical Examples

### Example 1: Dashboard Page

```tsx
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1. Page Header - Context */}
      <div>
        <h1 className="text-4xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Welcome back, Alex</p>
      </div>

      {/* 2. Primary Content - Key Metrics (10% primary color) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenue"
          value="$45,231"
          icon={DollarSign}
          className="hover:border-primary-200" // Subtle primary
        />
      </div>

      {/* 3. Secondary Content - Detailed View (90% neutral) */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          {" "}
          {/* White surface */}
          <OverviewChart />
        </Card>
        <Card className="lg:col-span-3">
          <RecentActivity />
        </Card>
      </div>
    </div>
  );
}
```

**Psychology Applied**:

- ✅ F-pattern: Title → Stats → Charts
- ✅ 60-30-10: Neutral bg, white cards, primary accents
- ✅ Hierarchy: Metrics first, details second
- ✅ Spacing: Generous (space-y-8)

---

### Example 2: Form Page

```tsx
export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* 1. Clear Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-600 mt-2">Manage your account preferences</p>
      </div>

      {/* 2. Form Card - White surface for focus */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Grouped fields - proximity shows relationship */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" />
          </div>

          <div className="space-y-2">
            <Label>Name</Label>
            <Input type="text" />
          </div>
        </CardContent>

        {/* 3. Primary Action - Deep Indigo */}
        <CardFooter>
          <Button className="bg-primary">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

**Psychology Applied**:

- ✅ Centered layout: Focus on form
- ✅ White card: Stands out from neutral bg
- ✅ Grouped fields: Related items close together
- ✅ Primary button: Clear call to action

---

## 🎯 Quick Decision Guide

### "Should I use Deep Indigo here?"

**YES** ✅ if:

- It's a primary action (button, link)
- It's an active/selected state
- It needs user attention
- It's a key interactive element

**NO** ❌ if:

- It's a large background area
- It's body text
- It's decorative only
- You already have too much primary color on the page

### "How much spacing should I use?"

**Large (8-12)** for:

- Between major sections
- Around page titles
- Before/after important content

**Medium (4-6)** for:

- Between cards
- Between form fields
- Between related sections

**Small (2-3)** for:

- Between label and input
- Between related text
- Within components

---

## ✅ Page Design Checklist

Before publishing a page, verify:

- [ ] **Visual Hierarchy**: Most important content is most prominent
- [ ] **Color Balance**: 60% neutral, 30% white, 10% primary
- [ ] **Spacing**: Consistent use of 8-point grid
- [ ] **Typography**: Clear hierarchy (h1 > h2 > body)
- [ ] **Contrast**: Text is readable (AA compliance)
- [ ] **Focus States**: Interactive elements have clear focus
- [ ] **Responsive**: Works on mobile, tablet, desktop
- [ ] **Consistency**: Matches other pages in style

---

## 🎨 Golden Rules

1. **Guide the eye**: Use size, color, and spacing to create a clear path
2. **Less is more**: Use primary color sparingly for maximum impact
3. **Breathe**: Give content room to breathe with generous spacing
4. **Group logically**: Related items close, unrelated items far
5. **Stay consistent**: Follow established patterns across pages

---

**Remember**: Every design decision should have a psychological reason. Ask yourself:

- "What do I want the user to see first?"
- "What action do I want them to take?"
- "How can I make this easier to understand?"

---

**Last Updated**: 2025-11-25  
**Status**: Official Guide  
**Apply To**: All pages
