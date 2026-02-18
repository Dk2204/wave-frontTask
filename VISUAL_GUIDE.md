# Visual Design Guide - Intellizence Platform

## 🎨 UI Preview (Text Description)

Since the application is running locally, here's what you'll see when you open http://localhost:5173:

---

## 1. Login Page

```
╔════════════════════════════════════════════════════════════╗
║                   [Floating purple orb]                     ║
║                                                             ║
║              ┌─────────────────────────┐                   ║
║              │    [Purple Box Icon]    │                   ║
║              │         IZ              │                   ║
║              └─────────────────────────┘                   ║
║                                                             ║
║                   Intellizence                              ║
║            Company Intelligence Platform                    ║
║                                                             ║
║    ┌─────────────────────────────────────────────┐        ║
║    │  [Glass Card with Frosted Effect]           │        ║
║    │                                              │        ║
║    │  📧 Email Address                           │        ║
║    │  ┌──────────────────────────────────────┐  │        ║
║    │  │ you@company.com                      │  │        ║
║    │  └──────────────────────────────────────┘  │        ║
║    │                                              │        ║
║    │  ┌──────────────────────────────────────┐  │        ║
║    │  │   Continue  →                        │  │  ← Purple gradient button
║    │  └──────────────────────────────────────┘  │        ║
║    │                                              │        ║
║    │  Secure authentication via email            │        ║
║    │  verification                                │        ║
║    └─────────────────────────────────────────────┘        ║
║                                                             ║
║         [Floating pink orb]    [Floating cyan orb]         ║
╚════════════════════════════════════════════════════════════╝
```

### Design Elements:
- **Background**: Dark navy (#0f0f1e) with animated gradient orbs
- **Card**: Glassmorphism effect with backdrop blur
- **Logo**: Purple gradient box with "IZ" text
- **Title**: Gradient purple text
- **Input**: Dark field with subtle border, light on focus
- **Button**: Purple gradient with hover lift effect
- **Animation**: Orbs float slowly in background

---

## 2. Dashboard - Full Layout

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  [Glass Header - Sticky]                                                      ║
║  IZ  Intellizence        [🔍] [↻] [Logout →]                                 ║
╠═══════════════════╦══════════════════════════════════════════════════════════╣
║ FILTERS PANEL     ║  NEWS CONTENT AREA                                       ║
║ [Glass Sidebar]   ║                                                          ║
║                   ║  ┌──────────────────────────────────────────────────┐   ║
║ 🔍 Filters        ║  │ 🔍 Search news by title, description...         │   ║
║    [Clear All]    ║  └──────────────────────────────────────────────────┘   ║
║                   ║                                                          ║
║ 📅 Date Range     ║  Total News: 42    Active Filters: 2                    ║
║ [Start] to [End]  ║                                                          ║
║                   ║  ┌────────────┐  ┌────────────┐  ┌────────────┐       ║
║ 🏷️ Company       ║  │ [NEWS CARD]│  │ [NEWS CARD]│  │ [NEWS CARD]│       ║
║ [ All Domains ▼ ] ║  │            │  │            │  │            │       ║
║                   ║  │ Company A  │  │ Company B  │  │ Company C  │       ║
║ 📈 Triggers       ║  │ Feb 15     │  │ Feb 14     │  │ Feb 13     │       ║
║ [Funding]         ║  │            │  │            │  │            │       ║
║ [Acquisition]     ║  │ Title...   │  │ Title...   │  │ Title...   │       ║
║ [Product Launch]  ║  │            │  │            │  │            │       ║
║ [Partnership]     ║  │ Desc...    │  │ Desc...    │  │ Desc...    │       ║
║ [Executive]       ║  │            │  │            │  │            │       ║
║                   ║  │ 🏷️ Funding │  │ 🏷️ Series B│  │ 🏷️ M&A    │       ║
║                   ║  │            │  │            │  │            │       ║
║                   ║  │ Read More→ │  │ Read More→ │  │ Read More→ │       ║
║                   ║  └────────────┘  └────────────┘  └────────────┘       ║
║                   ║                                                          ║
║                   ║  ┌────────────┐  ┌────────────┐  ┌────────────┐       ║
║                   ║  │ [NEWS CARD]│  │ [NEWS CARD]│  │ [NEWS CARD]│       ║
║                   ║  │   ...      │  │   ...      │  │   ...      │       ║
╚═══════════════════╩══════════════════════════════════════════════════════════╝
```

### Layout Breakdown:

**Header (Sticky)**
- Left: Logo + Title
- Right: Filter toggle, Refresh button, Logout button
- Glassmorphism effect with border

**Filters Panel (Left Sidebar - 320px wide)**
- Sticky positioning
- Glass card effect
- Sections:
  1. Date range inputs
  2. Company dropdown
  3. Trigger chips (purple when active)
  4. Clear all button

**News Content (Main Area)**
- Search bar (glass effect)
- Stats bar (shows counts)
- Responsive grid (auto-fill columns)
- News cards with hover effects

---

## 3. News Card - Detailed View

```
┌─────────────────────────────────────────┐
│ [Glass Card with Shadow]                │
│                                         │
│ [Company A]        📅 Feb 15, 2024     │ ← Badges
│                                         │
│ Company A Raises $50M in Series B       │ ← Title (18px, bold)
│                                         │
│ Company A announced today that it       │ ← Description
│ has raised $50 million in Series B      │   (3 lines max,
│ funding led by XYZ Ventures...          │    truncated)
│                                         │
│ 🏷️ Funding  🏷️ Series B  🏷️ VC        │ ← Trigger tags
│                                         │
│ Read More →                             │ ← External link
│                                         │
└─────────────────────────────────────────┘
      ↓ On Hover: Lifts up, stronger shadow
```

### Card Elements:
- **Company Badge**: Purple gradient, white text, rounded
- **Date Badge**: Gray background, clock icon, small text
- **Title**: White, bold, prominent
- **Description**: Gray text, line-clamped to 3 lines
- **Trigger Tags**: Blue background, blue border, small font
- **Link**: Purple text, arrow icon, underline on hover
- **Hover Effect**: Translates up -4px, shadow increases

---

## 4. Filter States

### Date Range Filter
```
┌─────────────────────────────────┐
│ 📅 Announced Date Range         │
│                                 │
│ [2024-01-01] to [2024-12-31]   │
│  ↑ Start Date    ↑ End Date    │
└─────────────────────────────────┘
```

### Company Domain Dropdown
```
┌─────────────────────────────────┐
│ 🏷️ Company Domain              │
│                                 │
│ ┌─────────────────────────────┐│
│ │ All Domains              ▼  ││ ← Closed state
│ └─────────────────────────────┘│
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ┌─────────────────────────────┐│
│ │ All Domains                 ││ ← Open state
│ │ companya.com                ││
│ │ companyb.com                ││
│ │ companyc.com                ││
│ └─────────────────────────────┘│
└─────────────────────────────────┘
```

### Trigger Chips
```
┌─────────────────────────────────┐
│ 📈 Triggers / Signals           │
│                                 │
│ [Funding]  [Acquisition]  [M&A] │ ← Inactive (gray)
│                                 │
│ [Product]  [Partnership]        │ ← Active (purple gradient)
└─────────────────────────────────┘
```

---

## 5. Loading States

```
┌─────────────────────────────────────┐
│                                     │
│         ⟲  (spinning icon)          │
│                                     │
│        Loading news...              │
│                                     │
└─────────────────────────────────────┘
```

---

## 6. Empty States

```
┌─────────────────────────────────────┐
│                                     │
│         🔍  (large search icon)     │
│                                     │
│         No news found               │
│                                     │
│   Try adjusting your filters or     │
│        search query                 │
│                                     │
└─────────────────────────────────────┘
```

---

## 7. Color Palette

### Primary Colors
```
Purple Gradient:  ██████ #667eea → #764ba2
Pink Gradient:    ██████ #f093fb → #f5576c
Cyan Gradient:    ██████ #4facfe → #00f2fe
```

### Background Colors
```
Primary BG:       ██████ #0f0f1e (dark navy)
Secondary BG:     ██████ #1a1a2e (lighter navy)
Card BG:          ██████ rgba(26, 26, 46, 0.8) (semi-transparent)
```

### Text Colors
```
Primary Text:     ██████ #ffffff (white)
Secondary Text:   ██████ #a0aec0 (light gray)
Muted Text:       ██████ #718096 (gray)
```

### Accent Colors
```
Success/Info:     ██████ #4facfe (blue)
Error:            ██████ #ff6b8a (pink-red)
Warning:          ██████ #fee140 (yellow)
```

---

## 8. Animations

### On Page Load
1. **Login Card**: Scales from 0.9 to 1.0 (0.4s)
2. **Background Orbs**: Float continuously (20s loop)
3. **Logo**: Pulses gently (3s loop)

### On Interaction
1. **Button Hover**: Lifts -2px, shadow increases
2. **Card Hover**: Lifts -4px, shadow increases
3. **Input Focus**: Border glows purple, background lightens
4. **Filter Toggle**: Slides down (0.5s)
5. **News Grid**: Fade-in stagger (0.05s per card)

### Loading
1. **Spinner**: Rotates 360° continuously
2. **Pulsing**: Opacity 1.0 ↔ 0.5

---

## 9. Responsive Breakpoints

### Desktop (> 1024px)
```
[Header: Full width]
┌────────────┬──────────────────────┐
│  Filters   │    News Grid (3+)    │
│  Sidebar   │                      │
└────────────┴──────────────────────┘
```

### Tablet (768px - 1024px)
```
[Header: Full width]
┌─────────────────────────────────┐
│        Filters Panel            │
├─────────────────────────────────┤
│      News Grid (2 columns)      │
└─────────────────────────────────┘
```

### Mobile (< 768px)
```
[Header: Stacked]
┌─────────────────┐
│ Filters (Toggle)│
├─────────────────┤
│ News (1 column) │
└─────────────────┘
```

---

## 10. Typography

```
Font Family: 'Inter', -apple-system, 'Segoe UI', sans-serif

Headings:
  H1: 32px / 700 weight (Login title)
  H2: 24px / 700 weight (Dashboard title)
  H3: 18px / 600 weight (News card title)

Body:
  Primary:   16px / 400 weight (Inputs, buttons)
  Secondary: 14px / 400 weight (Descriptions)
  Small:     13px / 500 weight (Labels, hints)
  Tiny:      12px / 600 weight (Badges, tags)
```

---

## 11. Shadows & Effects

```
Small Shadow:  0 2px 8px rgba(0, 0, 0, 0.1)
Medium Shadow: 0 4px 16px rgba(0, 0, 0, 0.2)
Large Shadow:  0 8px 32px rgba(0, 0, 0, 0.3)
Glow Effect:   0 0 20px rgba(102, 126, 234, 0.3)

Glassmorphism:
  - backdrop-filter: blur(16px)
  - background: rgba(26, 26, 46, 0.8)
  - border: 1px solid rgba(255, 255, 255, 0.1)
```

---

## 12. Interactive States

### Buttons
```
Default:  [Purple gradient background]
Hover:    [Lift -2px, stronger shadow, slight glow]
Active:   [Press down, shadow reduces]
Disabled: [50% opacity, no pointer events]
```

### Inputs
```
Default:  [Dark bg, subtle border]
Focus:    [Lighter bg, purple border, 3px glow]
Error:    [Red border, red text]
Disabled: [50% opacity]
```

### Chips/Tags
```
Inactive: [Gray bg, gray border, gray text]
Active:   [Purple gradient, white text, glow]
Hover:    [Slightly lighter, border brightens]
```

---

## ✨ Design Philosophy

**Premium First**: Every element designed to feel expensive and modern
**Smooth Interactions**: 0.3s transitions on everything
**Visual Hierarchy**: Clear distinction between primary/secondary elements
**Consistent Spacing**: 8px base unit (8, 16, 24, 32, 40px)
**Dark Theme**: Reduces eye strain, premium feel
**Glassmorphism**: Modern, trendy, depth perception
**Micro-animations**: Delightful, not distracting

---

Open **http://localhost:5173** to see all of this in action! 🚀
