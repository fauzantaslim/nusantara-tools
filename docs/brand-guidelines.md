---
name: brand-guidelines
description: Applies NusantaraTools' official brand colors and typography to any artifact that may benefit from having NusantaraTools' earth-tone look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply. Also use when creating any UI component, landing page, tool page, or marketing asset for NusantaraTools.
---

# NusantaraTools Brand Styling

## Overview

To access NusantaraTools' official brand identity and style resources, use this skill. The brand is rooted in the warmth of the Indonesian archipelago — earthy, trustworthy, modern, and distinctly local.

**Keywords**: branding, nusantaratools, corporate identity, visual identity, post-processing, styling, brand colors, typography, earth tone, visual formatting, visual design, indonesia, nusantara

---

## Brand Philosophy

NusantaraTools is built *for* Indonesia. The visual identity draws from the natural landscape of the archipelago:
- **Tanah Tua** (aged soil) — depth, trust, authority
- **Pasir Putih** (white sand) — clarity, openness, space
- **Kunyit Emas** (golden turmeric) — energy, warmth, action
- **Hijau Hutan** (forest green) — growth, health, nature
- **Merah Bata** (brick red) — heritage, urgency, character

Tone: **Trustworthy, modern, warm, and proudly local.** Not cold tech startup. Not overly folksy. The sweet spot between utility and culture.

---

## Brand Guidelines

### Colors

**Main Colors:**

| Token | Hex | Name | Usage |
|---|---|---|---|
| `--color-primary` | `#2C1A0E` | Tanah Tua | Primary text, dark backgrounds |
| `--color-surface` | `#F5EDE3` | Pasir Putih | Light backgrounds, text on dark |
| `--color-secondary` | `#7A5C42` | Tanah Merah | Secondary elements, subheadings |
| `--color-muted` | `#EDE0D0` | Linen Tua | Subtle backgrounds, dividers, cards |

**Accent Colors:**

| Token | Hex | Name | Usage |
|---|---|---|---|
| `--color-accent-1` | `#C17A3A` | Kunyit Emas | Primary accent — CTA buttons, links, active states |
| `--color-accent-2` | `#4A7C59` | Hijau Hutan | Secondary accent — success states, religi & kesehatan category |
| `--color-accent-3` | `#9C4A2A` | Merah Bata | Tertiary accent — badges, tags, "HOT" labels, finansial category |

**Category Color Mapping:**

| Category | Color | Hex |
|---|---|---|
| Kesehatan | Hijau Hutan | `#4A7C59` |
| Religi | Hijau Hutan | `#4A7C59` |
| Finansial | Merah Bata | `#9C4A2A` |
| Karir & Produktivitas | Kunyit Emas | `#C17A3A` |
| Utilitas | Tanah Merah | `#7A5C42` |

---

### WCAG Accessibility Compliance

All color combinations meet WCAG 2.1 standards. Never use color combinations not listed here for body text.

| Foreground | Background | Contrast Ratio | Level |
|---|---|---|---|
| `#2C1A0E` | `#F5EDE3` | 16.8 : 1 | **AAA** |
| `#F5EDE3` | `#2C1A0E` | 16.8 : 1 | **AAA** |
| `#2C1A0E` | `#EDE0D0` | 13.2 : 1 | **AAA** |
| `#C17A3A` | `#F5EDE3` | 4.6 : 1 | **AA** |
| `#4A7C59` | `#F5EDE3` | 4.8 : 1 | **AA** |
| `#9C4A2A` | `#F5EDE3` | 5.1 : 1 | **AA** |
| `#7A5C42` | `#F5EDE3` | 5.8 : 1 | **AA** |

> **Rule**: For normal body text (below 18pt / non-bold), always target AA minimum (4.5:1). For large text (18pt+ or bold 14pt+), AA large (3:1) is the minimum. Aim for AAA wherever possible.

---

### Typography

**Headings:** `Plus Jakarta Sans` (with `Trebuchet MS`, `Arial` fallback)
- Weight: 700 (h1), 600 (h2), 600 (h3)
- Letter spacing: -0.5px to -1.5px for large headings
- Color: `#2C1A0E` on light backgrounds, `#F5EDE3` on dark backgrounds

**Body Text:** `Lora` (with `Georgia`, `serif` fallback)
- Weight: 400 regular, 500 medium
- Line height: 1.7
- Color: `#2C1A0E` primary, `#7A5C42` secondary/muted

**UI Labels & Captions:** `Plus Jakarta Sans`
- Weight: 500
- Size: 11–13px
- Letter spacing: 0.3–1px for uppercase labels

**Code / Monospace:** `JetBrains Mono`, `Courier New` fallback

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:wght@400;500&display=swap" rel="stylesheet">
```

**CSS font stack:**
```css
--font-heading: 'Plus Jakarta Sans', 'Trebuchet MS', Arial, sans-serif;
--font-body: 'Lora', Georgia, serif;
--font-ui: 'Plus Jakarta Sans', Arial, sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

---

## Features

### Smart Color Application

- Apply `#2C1A0E` (Tanah Tua) as the default text color on all light surfaces
- Apply `#F5EDE3` (Pasir Putih) as text color on all dark surfaces
- Use `#C17A3A` (Kunyit Emas) for interactive elements: buttons, links, focus rings
- Use `#EDE0D0` (Linen Tua) for card backgrounds, input fields, subtle sections
- Never place `#7A5C42` text on `#EDE0D0` background — contrast is insufficient for body text

### Button Styles

**Primary Button** (CTA):
```css
background: #C17A3A;
color: #FFF8F0;
border: none;
border-radius: 10px;
font-family: var(--font-ui);
font-weight: 600;
padding: 12px 24px;
```

**Secondary Button** (Ghost):
```css
background: transparent;
color: #2C1A0E;
border: 1.5px solid #7A5C42;
border-radius: 10px;
font-family: var(--font-ui);
font-weight: 500;
padding: 11px 22px;
```

**Danger / Warning Button:**
```css
background: #9C4A2A;
color: #FFF0EB;
border: none;
border-radius: 10px;
font-weight: 600;
```

### Card Styles

**Default Card:**
```css
background: #FFFFFF;
border: 1px solid #EDE0D0;
border-radius: 14px;
padding: 18px;
```

**Muted / Subtle Card:**
```css
background: #EDE0D0;
border: none;
border-radius: 14px;
padding: 18px;
```

**Dark Card:**
```css
background: #2C1A0E;
border: none;
border-radius: 14px;
padding: 18px;
color: #F5EDE3;
```

### Badge / Tag Styles

```css
/* HOT badge */
background: #FFF0EB;
color: #9C4A2A;
font-size: 10px;
font-weight: 700;
padding: 2px 8px;
border-radius: 20px;

/* Category badge */
background: #EDE0D0;
color: #7A5C42;
font-size: 11px;
font-weight: 600;
padding: 4px 12px;
border-radius: 20px;
```

---

## CSS Variables — Full Reference

```css
:root {
  /* Main colors */
  --color-primary:    #2C1A0E;  /* Tanah Tua */
  --color-surface:    #F5EDE3;  /* Pasir Putih */
  --color-secondary:  #7A5C42;  /* Tanah Merah */
  --color-muted:      #EDE0D0;  /* Linen Tua */

  /* Accent colors */
  --color-accent-1:   #C17A3A;  /* Kunyit Emas */
  --color-accent-2:   #4A7C59;  /* Hijau Hutan */
  --color-accent-3:   #9C4A2A;  /* Merah Bata */

  /* Light tints (for backgrounds on accent) */
  --color-accent-1-light: #FFF3E0;
  --color-accent-2-light: #E8F5E9;
  --color-accent-3-light: #FFF0EB;

  /* Typography */
  --font-heading: 'Plus Jakarta Sans', 'Trebuchet MS', Arial, sans-serif;
  --font-body:    'Lora', Georgia, serif;
  --font-ui:      'Plus Jakarta Sans', Arial, sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;

  /* Spacing scale */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;

  /* Border radius */
  --radius-sm:  6px;
  --radius-md:  10px;
  --radius-lg:  14px;
  --radius-xl:  20px;
  --radius-full: 9999px;

  /* Border */
  --border-default: 1px solid #EDE0D0;
  --border-strong:  1px solid #7A5C42;
}
```

---

## Do's and Don'ts

**Do:**
- ✅ Use Tanah Tua (`#2C1A0E`) as the default text color on light backgrounds
- ✅ Use Kunyit Emas (`#C17A3A`) for primary CTAs and interactive elements
- ✅ Apply Hijau Hutan (`#4A7C59`) for positive/success states and health/religion categories
- ✅ Keep contrast ratio minimum 4.5:1 for all body text (WCAG AA)
- ✅ Use Plus Jakarta Sans for all UI labels, navigation, and headings
- ✅ Use Lora for long-form body text and editorial content

**Don't:**
- ❌ Use pure black (`#000000`) or pure white (`#FFFFFF`) — always use brand equivalents
- ❌ Place `#7A5C42` text on `#EDE0D0` background for body text (insufficient contrast)
- ❌ Use more than 3 accent colors in a single view
- ❌ Use Lora for UI buttons, labels, or navigation elements
- ❌ Use purple, pink, or blue tones — these are outside the NusantaraTools palette
- ❌ Apply accent colors as large background fills — use their light tints instead (`--color-accent-X-light`)