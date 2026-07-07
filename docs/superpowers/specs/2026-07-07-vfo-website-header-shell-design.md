# VFO Website — Branded SPA Shell (Header + Light/Dark)

`2026-07-07` · Status: approved for planning

## Goal

Replace the default Vite + React template with a VFO Simulations-branded SPA
shell: a header (logo + light/dark toggle) over an empty body. No page content
yet — this establishes the design-system foundation and theming for future work.

## Source of truth

Design system: `VFOSimulations/artwork` repo, doc `VFO-DS-001 REV 1`. Key facts:

- `design-standards/tokens.css` — machine-readable tokens, the declared source of
  truth. Dark theme activates via `[data-theme="dark"]` on `<html>`.
- Logos: `VFO-logo-primary.svg` (dark wordmark, for **light** backgrounds),
  `VFO-logo-reversed.svg` (white wordmark, for **dark** backgrounds),
  `VFO-logo-mark-bars.svg` (favicon).
- Typography: Montserrat (headings/UI), Source Sans 3 (body), IBM Plex Mono
  (data) — all free on Google Fonts.
- Websites use the light theme by default; `blue-700` accent.

## Stack

Existing: Vite + React 19, plain CSS. No new npm dependencies. Fonts loaded from
Google Fonts via `<link>` in `index.html`.

## Theme behavior (decided)

- **First visit:** resolve to OS preference via
  `matchMedia('(prefers-color-scheme: dark)')`.
- **Override:** a toggle in the header flips the theme and **persists** the
  choice to `localStorage` (key `vfo-theme`, values `light` | `dark`).
- **Subsequent visits:** stored value wins over OS preference.
- **No flash:** a tiny inline `<script>` in `index.html` sets
  `document.documentElement.dataset.theme` from the stored/system value *before*
  React mounts.

## Components

- **`useTheme` hook** — resolves initial theme (localStorage → else system);
  writes `data-theme` to `document.documentElement`; exposes `{ theme, toggle }`;
  persists to localStorage on change. Single responsibility: theme state ↔ DOM ↔
  storage.
- **`Header`** — sticky top bar. Content constrained to `--vfo-content-max-width`
  (1120px), centered. Bottom border `--vfo-line`. Left: `Logo`. Right:
  `ThemeToggle`. Uses `--vfo-bg` / `--vfo-surface` background.
- **`Logo`** — renders the **primary** SVG in light, **reversed** SVG in dark
  (swap on `theme`). Rendered at ≥28px lockup height (min-size rule). Alt text
  "VFO Simulations".
- **`ThemeToggle`** — button, min 44px hit target, inline sun/moon SVG,
  `--vfo-accent` focus ring, sentence-case `aria-label` ("Switch to dark theme" /
  "Switch to light theme"). Never a pill (radius per `--vfo-radius-control`).
- **`App`** — renders `<Header />` and an empty `<main>` below. Page background
  `--vfo-bg`; body content area centered at max 1120px.

## Styling approach

- Copy `artwork/design-standards/tokens.css` into the project verbatim
  (`src/styles/tokens.css` or similar) and import it once. All component styles
  reference `var(--vfo-*)` only — no hard-coded colors.
- `index.css` reset: `body { margin: 0 }`, base font/color from tokens,
  `color-scheme` set per theme.

## Cleanup (remove template artifacts)

- Rewrite `src/App.jsx`, `src/App.css`, `src/index.css`.
- Delete unused assets: `src/assets/react.svg`, `src/assets/vite.svg`,
  `src/assets/hero.png`, `public/icons.svg`.
- Replace `public/favicon.svg` with the VFO bars mark.
- Update `<title>` (already "vfo-website"; keep or set "VFO Simulations").

## Non-goals

- No page/body content, no nav links, no routing.
- No component library, no CSS framework.
- No backend.

## Verification

Run the dev server; confirm: (1) light theme renders on a fresh profile with
light OS setting; (2) toggle flips to dark and back, logo swaps correctly;
(3) reload preserves the toggled choice; (4) clearing localStorage falls back to
OS preference; (5) no theme flash on load. No automated tests planned (single
piece of logic is the theme hook); a unit test on theme resolution can be added
if desired.

## Notes

The project is not currently a git repository. This spec is not committed until
the user initializes git or asks for a commit.
