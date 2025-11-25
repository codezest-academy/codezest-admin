# Warm Mode Color Palette

## Overview

To reduce eye strain and provide a more comfortable viewing experience, CodeZest Admin uses a "Warm Mode" color palette. This replaces harsh pure white backgrounds with softer, warm off-white tones.

## Core Colors

| Color Name   | Hex Code  | Description           | Usage                        |
| :----------- | :-------- | :-------------------- | :--------------------------- |
| **Warm 50**  | `#fafaf9` | Very light warm white | Cards, Popovers, Modals      |
| **Warm 100** | `#f5f5f4` | Light warm grey       | Main Application Background  |
| **Warm 200** | `#e7e5e4` | Medium warm grey      | Borders, Dividers (optional) |

## Semantic Mappings

The application uses semantic CSS variables mapped to these warm colors:

```css
/* app/globals.css */

:root {
  /* ... */

  /* Backgrounds */
  --color-background: var(--color-warm-100); /* #f5f5f4 */
  --color-card: var(--color-warm-50); /* #fafaf9 */
  --color-popover: var(--color-warm-50); /* #fafaf9 */

  /* ... */
}
```

## Design Principles

1.  **Avoid Pure White**: Never use `#ffffff` for large background areas. It creates excessive glare.
2.  **Hierarchy**: Use `Warm 100` for the app background and `Warm 50` (lighter) for elevated content like cards. This creates depth without harsh contrast.
3.  **Eye Comfort**: These warm tones mimic natural paper, reducing blue light exposure and visual fatigue during long sessions.

## Usage Guide

When creating new components:

- **Page Backgrounds**: Use `bg-background` (maps to `#f5f5f4`).
- **Cards/Containers**: Use `bg-card` (maps to `#fafaf9`).
- **Dropdowns/Modals**: Use `bg-popover` (maps to `#fafaf9`).

Do **not** hardcode hex values or use `bg-white` unless specifically required for a specific design element (e.g., an image background).
