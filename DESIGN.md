---
name: 코딩 교육 게임
description: 브라우저에서 바로 실행되는 블록 코딩 미션 게임
colors:
  primary: "#2f6feb"
  primary-deep: "#1d4ed8"
  primary-soft: "#e6efff"
  accent: "#f5b301"
  accent-soft: "#fff6da"
  success: "#1fa97a"
  success-soft: "#e3f5ef"
  danger: "#e5484d"
  danger-soft: "#fde8ea"
  neutral-bg: "#f4f1ea"
  neutral-bg-2: "#efeae0"
  neutral-surface: "#ffffff"
  neutral-surface-2: "#faf8f3"
  neutral-ink: "#1b1f2a"
  neutral-ink-2: "#33384a"
  neutral-muted: "#6b7080"
  neutral-border: "#e3dfd4"
  neutral-border-strong: "#c9c3b5"
  obstacle-slate: "#334155"
  block-move-tint: "#c7d2fe"
  block-turn-tint: "#d8b4fe"
  block-repeat-tint: "#fcd34d"
  block-condition-tint: "#6ee7b7"
  block-turn-soft: "#f0e7ff"
  block-repeat-soft: "#fff3d6"
  goal-soft: "#fef9c3"
  robot-blue-soft: "#bfdbfe"
  shadow-tint: "rgba(0,0,0,0.1)"
typography:
  display:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  xs: "8px"
  sm: "12px"
  md: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.xs}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.neutral-surface-2}"
    textColor: "{colors.neutral-ink-2}"
    rounded: "{rounded.xs}"
    padding: "10px 16px"
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.xs}"
    padding: "8px 10px"
---

# Design System: 코딩 교육 게임

## Overview

**Creative North Star: "The Maker Bench"**

A warm, tactile learning bench where a child's first program feels like building something real. The system favors clear hierarchy, generous touch targets, and readable feedback over decoration. Panels are soft white cards on a warm paper ground, with a confident blue primary that marks action and a gold accent that marks reward. Motion is purposeful and short; nothing bounces for its own sake.

**Key Characteristics:**

- Warm paper ground with white cards; soft layered shadows, never hard offset.
- Confident cobalt primary for actions, gold accent for stars and goals.
- Rounded but restrained corners (8–16px); no pill-only buttons.
- Korean-first typography via Pretendard with system fallbacks.
- Accessibility built in: visible focus rings, 44px touch targets, reduced motion respected.

## Colors

The palette is warm and inviting without tipping into candy.

### Primary

- **Cobalt Action** (#2f6feb): run buttons, selected palette items, focus rings, primary navigation.
- **Cobalt Deep** (#1d4ed8): hover/pressed state of primary actions.

### Accent

- **Star Gold** (#f5b301): earned stars, goal cells, reward highlights. Used sparingly so a star still feels earned.

### Semantic

- **Mint Success** (#1fa97a): completed levels, collected goals, success feedback.
- **Coral Danger** (#e5484d): errors, delete actions, failed attempts.

### Neutral

- **Paper Ground** (#f4f1ea): page background.
- **Paper Deep** (#efeae0): secondary surfaces and hover grounds.
- **Card White** (#ffffff): panels, cards, inputs.
- **Card Warm** (#faf8f3): subtle inset surfaces.
- **Ink** (#1b1f2a): primary text.
- **Ink Soft** (#33384a): secondary text.
- **Muted Slate** (#6b7080): hints, captions, disabled text.
- **Border** (#e3dfd4): default borders.
- **Border Strong** (#c9c3b5): emphasized borders, drop zones.
- **Obstacle Slate** (#334155): grid obstacle cells and editor obstacle cells.
- **Block Move Tint** (#c7d2fe): move block border and body accent.
- **Block Turn Tint** (#d8b4fe): turn block border and body accent.
- **Block Repeat Tint** (#fcd34d): repeat block border and body accent.
- **Block Condition Tint** (#6ee7b7): conditional block border and body accent.
- **Block Move Soft** (#e6efff): move block background (shared with primary soft).
- **Block Turn Soft** (#f0e7ff): turn block background.
- **Block Repeat Soft** (#fff3d6): repeat block background.
- **Block Condition Soft** (#e3f5ef): conditional block background (shared with success soft).
- **Goal Soft** (#fef9c3): goal cell background.
- **Robot Blue Soft** (#bfdbfe): editor start cell background.
- **Shadow Tint** (rgba(0,0,0,0.1)): icon drop shadow tint.

**The One Accent Rule.** Primary cobalt carries action; gold carries reward. Neither decorates. A screen with both everywhere has neither.

## Typography

**Display Font:** Pretendard Variable (with Noto Sans KR, Apple SD Gothic Neo, system-ui fallback)
**Body Font:** Pretendard Variable (same stack)
**Label/Mono Font:** system monospace for code-like values

**Character:** A single Korean-optimized family keeps the interface calm and consistent; weight and size do the hierarchy work.

### Hierarchy

- **Display** (800, 1.6rem, 1.2): page titles in headers.
- **Headline** (700, 1.3rem, 1.25): section and level titles.
- **Title** (700, 1.05rem, 1.3): card and panel titles.
- **Body** (400, 0.95rem, 1.5): descriptions and hint text; max 65–75ch.
- **Label** (600, 0.85rem, 1.4): buttons, badges, table headers.

## Layout

A centered single-column on home and teacher views (max ~1180px). The game view is a three-column grid (palette / workspace / canvas) that collapses to one column below 900px. Spacing rhythm is 4/8/16/24. Touch targets are at least 44px on small screens.

## Elevation & Depth

Soft, layered shadows only: `0 1px 2px` for resting cards, `0 8px 24px` for raised surfaces, `0 20px 48px` for modals. Shadows are neutral and never hard offset. Depth also comes from background tint (paper vs. card) and border.

## Shapes

Rounded corners: 8px for small controls, 12px for cards and inputs, 16px for panels and modals. Circles for numeric badges and add buttons. No sharp corners anywhere in the system.

## Components

### Buttons

- **Shape:** 8px radius, 600–800 weight.
- **Primary:** cobalt background, white text, subtle blue shadow; hover deepens color and lifts 1px.
- **Secondary/Ghost:** warm card background with border; hover tints to primary soft.
- **Icon buttons:** 1.9rem circular/rounded, border on rest.

### Cards / Containers

- **Corner Style:** 12–16px radius.
- **Background:** white on paper ground.
- **Shadow:** resting `shadow-sm`; hover raises to `shadow`.
- **Border:** 1.5px default border; hover switches to primary.
- **Internal Padding:** 0.9–1.4rem.

### Inputs / Fields

- **Style:** white background, 1px border, 8px radius.
- **Focus:** cobalt border plus 3px soft cobalt ring.
- **Error:** coral text and border.

### Palette Blocks

- **Shape:** 8px radius, 1.5px border.
- **Color by type:** move (blue soft), turn (violet soft), repeat (amber soft), conditional (mint soft).
- **Highlight during run:** gold background with gold ring.

### Grid Cells

- **Obstacle:** dark slate.
- **Goal:** gold soft with star.
- **Collected:** mint soft with green star.
- **Robot:** directional arrow glyph.

## Do's and Don'ts

### Do:

- **Do** keep primary actions cobalt and rewards gold; reserve both for meaning.
- **Do** provide visible focus rings on every interactive element.
- **Do** maintain 44px minimum touch targets on small screens.
- **Do** respect `prefers-reduced-motion` for pulse and transitions.
- **Do** use inline SVG icons in one consistent stroke weight.

### Don't:

- **Don't** use emoji or unicode glyphs as icons.
- **Don't** use hard offset shadows or glassmorphism as decoration.
- **Don't** add a colored side-border above 1px on cards or list items.
- **Don't** introduce a second accent color beyond cobalt and gold.
- **Don't** shrink touch targets below 44px on mobile.