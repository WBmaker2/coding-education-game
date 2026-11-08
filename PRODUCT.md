# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: elementary-school learners (roughly ages 8–12) solving grid-robot missions at home or in class to learn basic coding concepts (sequencing, loops, conditionals). Secondary: teachers who create, test, and share custom levels and monitor student progress.

## Product Purpose

A lightweight, install-free, browser-based block-coding game. Learners drag and combine motion/control blocks to guide a robot through grid missions, earning stars for efficiency. Teachers get a panel to author levels, reset progress, and export/import level sets. Success means a learner can independently solve a mission and understand the underlying concept, and a teacher can run a class activity without setup.

## Positioning

Install-free, mission-based block coding that runs entirely in the browser with local progress — a teacher can open a link and start a lesson with no accounts, installs, or backend.

## Operating Context

Used in classrooms and at home, often on low-spec or shared devices, tablets, and touch screens. Short sessions between lessons; teachers project or share links. Learners interact via mouse, touch, and keyboard; sound may be muted in class.

## Capabilities and Constraints

- Block types: move, turnLeft, turnRight, repeat (with count and nested body), ifObstacle (conditional body).
- Interpreter animates step-by-step execution with highlighting; reports success/error and blocks used.
- 30+ built-in levels with grid sizes 3–6, obstacles, multiple goals, star thresholds by block count.
- Progress (stars, attempts, completion date) persisted in localStorage.
- Teacher panel: visual grid editor (wall/goal/start tools), level add/test, progress table, JSON export/import, progress reset.
- Custom levels persisted in localStorage.
- No backend, no accounts, no network dependency for core play.

## Brand Commitments

- Korean-language UI and labels.
- Accessibility: keyboard navigation/reorder/delete, visible focus rings, ARIA labels, 44px minimum touch targets on small screens, prefers-reduced-motion respected.
- Sound feedback with on/off toggle.
- Mobile touch drag-and-drop fallback for palette blocks.

## Evidence on Hand

- `src/data/levels.ts` — built-in level definitions.
- `src/engine/interpreter.ts` — execution engine.
- `src/tests/ui.test.tsx`, `src/tests/interpreter.test.ts` — UI and engine tests.
- `docs/UPDATELOG.md` — change history.
- No real user research, testimonials, or analytics on hand; do not fabricate.

## Product Principles

1. Learning first: every visual choice must keep the mission, blocks, and execution feedback readable and unambiguous.
2. Low friction: a link opens and play begins; no accounts, installs, or setup.
3. Teacher agency: authoring and sharing levels stays as capable as playing them.
4. Inclusive by default: keyboard, touch, screen-reader, and reduced-motion support are non-negotiable.
5. Honest feedback: success/failure and block counts are clear; no fabricated praise or metrics.

## Accessibility & Inclusion

Targets WCAG 2.1 AA for the web app: keyboard operability, visible focus, sufficient contrast, 44px touch targets on mobile, reduced-motion support, semantic labels. Learners may include children with motor or cognitive differences; keep interactions simple and forgiving.