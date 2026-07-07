# VFO Website — Header Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the default Vite + React template with a VFO Simulations-branded SPA shell — a header (logo + light/dark toggle) over an empty body.

**Architecture:** React 19 + Vite, plain CSS driven entirely by the VFO design tokens (`tokens.css`). Dark theme activates via `data-theme="dark"` on `<html>`. A `useTheme` hook owns theme state (localStorage → else OS preference) and writes the attribute; an inline script in `index.html` applies the theme before React mounts to avoid a flash.

**Tech Stack:** Vite 8, React 19, plain CSS custom properties, Google Fonts (Montserrat, Source Sans 3, IBM Plex Mono).

## Global Constraints

- No new npm dependencies. Only add Google Fonts via `<link>`.
- All colors/spacing/radii/fonts come from `var(--vfo-*)` tokens — never hard-code hex values in component CSS.
- Dark theme is driven solely by `data-theme="dark"` on `document.documentElement` (the mechanism `tokens.css` expects).
- localStorage key is exactly `vfo-theme`; values are exactly `light` or `dark`.
- Buttons/controls use `--vfo-radius-control` (4px) — never pills. Minimum hit target 44px.
- Logo minimum lockup height 28px on screen. Primary logo on light, reversed on dark.
- No page/body content, no nav, no routing, no backend.

**Testing note:** The project has no test runner and the spec explicitly plans no automated tests (the only logic is theme resolution). Each task therefore ends with a **manual verification step against the running dev server** (`npm run dev`, default http://localhost:5173) plus `npm run lint`, in place of a unit-test cycle. Commit after each task.

---

### Task 1: Design tokens, fonts, favicon, no-flash script, cleanup

Establish the design-system foundation and remove template artifacts. After this task the app still renders the old (soon-to-be-replaced) App, but tokens/fonts/favicon/theme-bootstrap are in place.

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `index.html`
- Delete: `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `public/icons.svg`
- Replace: `public/favicon.svg`

**Interfaces:**
- Produces: `src/styles/tokens.css` (defines all `--vfo-*` custom properties on `:root` and `[data-theme="dark"]`); `index.html` bootstraps `document.documentElement.dataset.theme` from `localStorage['vfo-theme']` or `prefers-color-scheme` before React mounts.

- [ ] **Step 1: Create `src/styles/tokens.css`** with the exact contents below (verbatim copy of the VFO design tokens, source of truth `VFO-DS-001 REV 1`):

```css
/* ============================================================
   VFO Simulations — Design Tokens
   VFO-DS-001 · REV 1 · JUL 2026
   Source of truth: VFO Design Standards — Unified.dc.html
   Usage: import this file, style with var(--vfo-*).
   Dark theme: add [data-theme="dark"] on <html> or any subtree.
   ============================================================ */

:root {
  /* ---- 2.1 Blue ramp ---- */
  --vfo-blue-950: #0E1A2B;  /* dark surface, icon tile */
  --vfo-blue-800: #113A6A;  /* hover on primary */
  --vfo-blue-700: #0A4A8F;  /* primary · brand */
  --vfo-blue-500: #2F73B8;  /* focus rings, charts */
  --vfo-blue-400: #4D97D6;  /* interactive on dark */
  --vfo-blue-200: #8FC1EA;  /* active / senior state */
  --vfo-blue-100: #D6E7F5;  /* tinted fills, selection */

  /* ---- 2.2 Neutrals ---- */
  --vfo-ink:       #1A2433; /* text — never pure black */
  --vfo-slate-700: #3C4756;
  --vfo-slate-500: #5A6675;
  --vfo-slate-300: #9FB0C4;
  --vfo-border:    #DDE4EC;
  --vfo-paper:     #F4F6F9;
  --vfo-white:     #FBFCFD;

  /* ---- 2.3 Annunciator status (state only — never decoration) ---- */
  --vfo-normal:        #2E7D4F;
  --vfo-normal-tint:   #E7F2EC;
  --vfo-caution:       #C2851A;
  --vfo-caution-tint:  #F7EFDE;
  --vfo-warning:       #B3362B;
  --vfo-warning-tint:  #F6E5E3;

  /* ---- Semantic aliases (theme-aware) ---- */
  --vfo-bg:             var(--vfo-white);
  --vfo-bg-sunken:      var(--vfo-paper);
  --vfo-surface:        #FFFFFF;
  --vfo-text:           var(--vfo-ink);
  --vfo-text-secondary: var(--vfo-slate-700);
  --vfo-text-muted:     var(--vfo-slate-500);
  --vfo-line:           var(--vfo-border);
  --vfo-accent:         var(--vfo-blue-700);   /* links, CTAs, rules */
  --vfo-accent-hover:   var(--vfo-blue-800);
  --vfo-accent-tint:    #EDF4FB;
  --vfo-focus:          var(--vfo-blue-500);
  --vfo-on-accent:      #FFFFFF;

  /* ---- 3.0 Typography ---- */
  --vfo-font-heading: 'Montserrat', sans-serif;   /* 800/700/600/500 */
  --vfo-font-body:    'Source Sans 3', sans-serif;/* 400/600 — long-form */
  --vfo-font-data:    'IBM Plex Mono', monospace; /* readouts, codes */

  --vfo-text-display: 800 34px/1.15 var(--vfo-font-heading); /* -0.5px tracking */
  --vfo-text-h1:      800 24px/1.2  var(--vfo-font-heading);
  --vfo-text-h2:      700 18px/1.3  var(--vfo-font-heading);
  --vfo-text-label:   700 11px/1.2  var(--vfo-font-heading);  /* uppercase, +1.5px */
  --vfo-text-body:    400 15px/1.6  var(--vfo-font-body);
  --vfo-text-data:    500 13px/1.4  var(--vfo-font-data);
  --vfo-tracking-label: 1.5px;
  --vfo-min-font-ui: 13px;

  /* ---- 4.0 Spacing & shape ---- */
  --vfo-space-1: 8px;
  --vfo-space-2: 16px;
  --vfo-space-3: 24px;
  --vfo-space-4: 32px;
  --vfo-space-6: 48px;
  --vfo-space-compact: 4px;    /* inside compact controls only */

  --vfo-radius-control: 4px;
  --vfo-radius-card:    6px;
  --vfo-radius-modal:   10px;  /* never pills; icon tiles: 21% of size */

  --vfo-shadow-overlay: 0 2px 8px rgba(16, 32, 56, 0.10); /* overlays only */
  --vfo-content-max-width: 1120px;
  --vfo-hit-target-min: 44px;
}

/* ---- Dark theme — apps, extensions, sim tools ---- */
[data-theme="dark"] {
  --vfo-bg:             var(--vfo-blue-950);
  --vfo-bg-sunken:      var(--vfo-blue-950);
  --vfo-surface:        #16263D;
  --vfo-text:           rgba(255, 255, 255, 0.92);
  --vfo-text-secondary: rgba(255, 255, 255, 0.78);
  --vfo-text-muted:     rgba(255, 255, 255, 0.55);
  --vfo-line:           rgba(255, 255, 255, 0.12);
  --vfo-accent:         var(--vfo-blue-400);
  --vfo-accent-hover:   var(--vfo-blue-200);
  --vfo-accent-tint:    rgba(77, 151, 214, 0.12);
  --vfo-on-accent:      var(--vfo-blue-950);

  /* status lightened for dark surfaces */
  --vfo-normal:       #4CAF7A;
  --vfo-normal-tint:  rgba(76, 175, 122, 0.15);
  --vfo-caution:      #E0A63C;
  --vfo-caution-tint: rgba(224, 166, 60, 0.15);
  --vfo-warning:      #E05E52;
  --vfo-warning-tint: rgba(224, 94, 82, 0.15);

  --vfo-shadow-overlay: none; /* dark theme: borders only, no shadows */
}
```

- [ ] **Step 2: Replace `public/favicon.svg`** with the VFO bars mark (exact contents):

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="52" viewBox="0 0 96 52">
  <title>VFO Simulations — bars only (transparent)</title>
  <g transform="translate(10,0)">
    <polygon points="9.46,0 20.46,0 1.54,52 -9.46,52" fill="#0a4a8f"></polygon>
    <polygon points="26.46,0 37.46,0 18.54,52 7.54,52" fill="#0a4a8f"></polygon>
    <polygon points="43.46,0 54.46,0 35.54,52 24.54,52" fill="#0a4a8f"></polygon>
    <polygon points="60.46,0 71.46,0 52.54,52 41.54,52" fill="#8fc1ea"></polygon>
  </g>
</svg>
```

- [ ] **Step 3: Replace `index.html`** with the following (adds fonts, no-flash theme bootstrap, updated title):

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VFO Simulations</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Source+Sans+3:wght@400;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <script>
      // Apply theme before React mounts to prevent a flash of the wrong theme.
      (function () {
        try {
          var stored = localStorage.getItem('vfo-theme');
          var theme =
            stored === 'light' || stored === 'dark'
              ? stored
              : window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
          document.documentElement.dataset.theme = theme;
        } catch (e) {
          document.documentElement.dataset.theme = 'light';
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Delete template assets**

```bash
rm src/assets/react.svg src/assets/vite.svg src/assets/hero.png public/icons.svg
```

- [ ] **Step 5: Verify** the app still boots and tokens/fonts load.

Run: `npm run dev` and open http://localhost:5173. In DevTools Console run `getComputedStyle(document.documentElement).getPropertyValue('--vfo-accent')`.
Expected: returns `#0A4A8F` (light) — confirms `tokens.css` will load once imported in Task 6; for now confirm no build error and the favicon is the VFO bars. Also confirm `document.documentElement.dataset.theme` is set (`light` or `dark`). Then `npm run lint` → no errors.

> Note: `tokens.css` is imported in Task 6. In this task, verifying via the inline script's `dataset.theme` and a clean dev boot is sufficient.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add VFO design tokens, fonts, favicon, theme bootstrap; remove template assets"
```

> If the directory is not a git repo, skip commits (the user has not initialized git). Note this and continue.

---

### Task 2: Brand logo assets

Add the two lockup SVGs the `Logo` component swaps between.

**Files:**
- Create: `src/assets/vfo-logo-primary.svg`
- Create: `src/assets/vfo-logo-reversed.svg`

**Interfaces:**
- Produces: two importable SVG asset URLs used by `Logo` in Task 5.

- [ ] **Step 1: Create `src/assets/vfo-logo-primary.svg`** (for light backgrounds), exact contents:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="670" height="150" viewBox="0 0 670 150" font-family="Montserrat, sans-serif">
  <title>VFO Simulations — primary logo</title>
  <g transform="translate(34,28)">
    <g>
      <polygon points="9.46,0 20.46,0 1.54,52 -9.46,52" fill="#0a4a8f"></polygon>
      <polygon points="26.46,0 37.46,0 18.54,52 7.54,52" fill="#0a4a8f"></polygon>
      <polygon points="43.46,0 54.46,0 35.54,52 24.54,52" fill="#0a4a8f"></polygon>
      <polygon points="60.46,0 71.46,0 52.54,52 41.54,52" fill="#8fc1ea"></polygon>
    </g>
    <text x="80" y="46" font-size="64" letter-spacing="-0.5" fill="#1a2433"><tspan font-weight="800">VFO</tspan><tspan font-weight="500">Simulations</tspan></text>
    <text x="80" y="80" font-size="21" font-weight="600" letter-spacing="2" fill="#0a4a8f">VIRTUAL FIRST OFFICER</text>
    <rect x="402" y="65.5" width="199" height="2" fill="#0a4a8f"></rect>
  </g>
</svg>
```

- [ ] **Step 2: Create `src/assets/vfo-logo-reversed.svg`** (for dark backgrounds), exact contents:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="670" height="150" viewBox="0 0 670 150" font-family="Montserrat, sans-serif">
  <title>VFO Simulations — reversed logo (for dark backgrounds)</title>
  <g transform="translate(34,28)">
    <polygon points="9.46,0 20.46,0 1.54,52 -9.46,52" fill="#4d97d6"></polygon>
    <polygon points="26.46,0 37.46,0 18.54,52 7.54,52" fill="#4d97d6"></polygon>
    <polygon points="43.46,0 54.46,0 35.54,52 24.54,52" fill="#4d97d6"></polygon>
    <polygon points="60.46,0 71.46,0 52.54,52 41.54,52" fill="#8fc1ea"></polygon>
    <text x="80" y="46" font-size="64" letter-spacing="-0.5" fill="#ffffff"><tspan font-weight="800">VFO</tspan><tspan font-weight="500">Simulations</tspan></text>
    <text x="80" y="80" font-size="21" font-weight="600" letter-spacing="2" fill="#4d97d6">VIRTUAL FIRST OFFICER</text>
    <rect x="402" y="65.5" width="199" height="2" fill="#4d97d6"></rect>
  </g>
</svg>
```

- [ ] **Step 3: Verify** both files are valid SVG.

Run: `head -1 src/assets/vfo-logo-primary.svg src/assets/vfo-logo-reversed.svg`
Expected: each starts with `<svg xmlns=...`.

- [ ] **Step 4: Commit**

```bash
git add src/assets/vfo-logo-primary.svg src/assets/vfo-logo-reversed.svg
git commit -m "feat: add VFO primary and reversed logo assets"
```

---

### Task 3: `useTheme` hook

Owns theme state and the DOM/storage side effects.

**Files:**
- Create: `src/hooks/useTheme.js`

**Interfaces:**
- Produces: `export function useTheme()` returning `{ theme, toggle }` where `theme` is `'light' | 'dark'` and `toggle` is `() => void`. On mount it reads `document.documentElement.dataset.theme` (set by the index.html bootstrap) as the initial value, falling back to system preference, then light. On change it writes `document.documentElement.dataset.theme` and `localStorage['vfo-theme']`.

- [ ] **Step 1: Create `src/hooks/useTheme.js`** with exact contents:

```js
import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'vfo-theme'

function resolveInitialTheme() {
  // The inline bootstrap in index.html has already set this before mount.
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage unavailable — fall through to system preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Persistence is best-effort; ignore storage failures.
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors for `src/hooks/useTheme.js`.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useTheme.js
git commit -m "feat: add useTheme hook (system default + persisted toggle)"
```

---

### Task 4: `ThemeToggle` component

**Files:**
- Create: `src/components/ThemeToggle.jsx`
- Create: `src/components/ThemeToggle.css`

**Interfaces:**
- Consumes: nothing from other components; receives props `{ theme: 'light' | 'dark', onToggle: () => void }`.
- Produces: `export default function ThemeToggle({ theme, onToggle })` — a `<button>` with min 44px hit target, `--vfo-radius-control` corners, `--vfo-focus` focus ring, sun icon shown in dark theme (click → light), moon icon shown in light theme (click → dark).

- [ ] **Step 1: Create `src/components/ThemeToggle.jsx`** with exact contents:

```jsx
import './ThemeToggle.css'

function SunIcon() {
  return (
    <svg
      className="theme-toggle__icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      className="theme-toggle__icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
```

- [ ] **Step 2: Create `src/components/ThemeToggle.css`** with exact contents:

```css
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--vfo-hit-target-min);
  height: var(--vfo-hit-target-min);
  padding: 0;
  color: var(--vfo-text-secondary);
  background: transparent;
  border: 1.5px solid var(--vfo-line);
  border-radius: var(--vfo-radius-control);
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.theme-toggle:hover {
  color: var(--vfo-accent);
  border-color: var(--vfo-accent);
  background: var(--vfo-accent-tint);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--vfo-focus);
  outline-offset: 2px;
}

.theme-toggle__icon {
  display: block;
}
```

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ThemeToggle.jsx src/components/ThemeToggle.css
git commit -m "feat: add ThemeToggle button component"
```

---

### Task 5: `Logo` component

**Files:**
- Create: `src/components/Logo.jsx`
- Create: `src/components/Logo.css`

**Interfaces:**
- Consumes: props `{ theme: 'light' | 'dark' }`; the two SVG assets from Task 2.
- Produces: `export default function Logo({ theme })` — an `<img>` using the reversed lockup when `theme === 'dark'`, else primary; alt text `VFO Simulations`; rendered at 40px height (≥ 28px minimum).

- [ ] **Step 1: Create `src/components/Logo.jsx`** with exact contents:

```jsx
import './Logo.css'
import primaryLogo from '../assets/vfo-logo-primary.svg'
import reversedLogo from '../assets/vfo-logo-reversed.svg'

export default function Logo({ theme }) {
  const src = theme === 'dark' ? reversedLogo : primaryLogo
  return <img className="logo" src={src} alt="VFO Simulations" />
}
```

- [ ] **Step 2: Create `src/components/Logo.css`** with exact contents:

```css
.logo {
  display: block;
  height: 40px; /* min lockup height is 28px; 40px for header presence */
  width: auto;
}
```

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Logo.jsx src/components/Logo.css
git commit -m "feat: add theme-aware Logo component"
```

---

### Task 6: `Header` + `App` wiring, global styles, remove old App content

Assemble the header, wire the theme hook, import tokens globally, and replace the template App/CSS.

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.css`
- Modify: `src/App.jsx` (replace entirely)
- Modify: `src/App.css` (replace entirely)
- Modify: `src/index.css` (replace entirely)

**Interfaces:**
- Consumes: `useTheme` (Task 3), `Logo` (Task 5), `ThemeToggle` (Task 4), `tokens.css` (Task 1).
- Produces: `export default function Header({ theme, onToggle })`; `App` renders `<Header>` + empty `<main>`.

- [ ] **Step 1: Create `src/components/Header.jsx`** with exact contents:

```jsx
import './Header.css'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header({ theme, onToggle }) {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo theme={theme} />
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/Header.css`** with exact contents:

```css
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--vfo-surface);
  border-bottom: 1px solid var(--vfo-line);
}

.header__inner {
  max-width: var(--vfo-content-max-width);
  margin: 0 auto;
  padding: var(--vfo-space-2) var(--vfo-space-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--vfo-space-2);
}

@media (max-width: 640px) {
  .header__inner {
    padding: var(--vfo-space-2);
  }
}
```

- [ ] **Step 3: Replace `src/index.css`** with exact contents (global reset + base typography from tokens; imports tokens):

```css
@import './styles/tokens.css';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  color-scheme: light dark;
}

body {
  margin: 0;
  min-height: 100svh;
  font: var(--vfo-text-body);
  color: var(--vfo-text);
  background: var(--vfo-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

::selection {
  background: var(--vfo-blue-100);
}
```

- [ ] **Step 4: Replace `src/App.css`** with exact contents:

```css
.app {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1 1 auto;
  max-width: var(--vfo-content-max-width);
  width: 100%;
  margin: 0 auto;
  padding: var(--vfo-space-4) var(--vfo-space-3);
}
```

- [ ] **Step 5: Replace `src/App.jsx`** with exact contents:

```jsx
import './App.css'
import Header from './components/Header'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="app">
      <Header theme={theme} onToggle={toggle} />
      <main className="app__main" aria-label="Main content">
        {/* No content yet — header-only shell. */}
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 6: Verify end-to-end** in the running dev server.

Run: `npm run dev`, open http://localhost:5173, and check:
1. Header renders with the VFO lockup on the left and the toggle on the right, constrained to a centered 1120px column with a bottom border.
2. On a light OS setting (or `localStorage.clear()` then reload) the page is light and shows the **primary** (dark wordmark) logo.
3. Click the toggle → page switches to dark (`blue-950` background, `#16263D` header) and the **reversed** (white wordmark) logo appears; icon changes moon↔sun.
4. Reload → the toggled choice persists (check `localStorage.getItem('vfo-theme')`).
5. In Console: `localStorage.clear()` then reload with OS dark mode → page loads dark with no visible flash.
6. Keyboard-tab to the toggle → visible `--vfo-focus` outline; Enter/Space toggles.

Then run: `npm run lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx src/App.css src/index.css src/components/Header.jsx src/components/Header.css
git commit -m "feat: assemble VFO header shell with light/dark theming"
```

---

## Self-Review

**Spec coverage:**
- Stack (Vite + React 19, plain CSS, Google Fonts, no new deps) → Task 1, Global Constraints. ✓
- Theme behavior (system default, toggle override, localStorage persist, no flash) → Task 1 (bootstrap), Task 3 (hook), Task 6 (wiring + verify). ✓
- `useTheme` hook → Task 3. ✓
- `Header` (sticky, 1120px, bottom border, logo + toggle) → Task 6. ✓
- `Logo` (primary/reversed swap, ≥28px) → Task 5. ✓
- `ThemeToggle` (44px, sun/moon, focus ring, aria-label, non-pill) → Task 4. ✓
- `App` (header + empty main, --vfo-bg) → Task 6. ✓
- Copy `tokens.css` verbatim, style via `var(--vfo-*)` → Task 1 + all component CSS. ✓
- Cleanup template artifacts (App/CSS rewrite, delete assets, favicon) → Task 1 + Task 6. ✓
- Verification via dev server → each task's verify step. ✓
- Non-goals (no content/nav/routing/backend) respected. ✓

**Placeholder scan:** No TBD/TODO or vague instructions; every code step contains full file contents. ✓

**Type consistency:** `useTheme()` returns `{ theme, toggle }` (Task 3) — consumed in `App` as `{ theme, toggle }` (Task 6). Props `theme`/`onToggle` consistent across `Header`, `ThemeToggle` (Task 4/6). `Logo` prop `theme` consistent (Task 5/6). localStorage key `vfo-theme` consistent across index.html and useTheme.js. ✓

**Note:** The project is not currently a git repo. Commit steps are written for when git is initialized; if not, skip commits and note it (see Task 1 Step 6 note).
