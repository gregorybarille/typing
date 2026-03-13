# AGENTS.md — TypingMaster

Guidance for AI coding agents working in this repository.

## Project Overview

A touch-typing trainer web app built with React 18, TypeScript, Vite, and Tailwind CSS.
Uses Radix UI primitives for accessible components, Recharts for stats visualization,
and React Router for navigation. State is persisted to localStorage (no backend).

## Tech Stack

- **Runtime:** Browser (ES2020 target)
- **Language:** TypeScript (strict mode)
- **Framework:** React 18 with react-jsx transform
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS 3 with CSS custom properties (HSL design tokens)
- **UI primitives:** Radix UI (label, progress, select, switch, tabs)
- **Routing:** React Router DOM v6
- **Charts:** Recharts
- **Package manager:** npm
- **Module system:** ESM (`"type": "module"` in package.json)

## Build / Dev / Lint Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (HMR)
npm run build        # Type-check (tsc) then build for production (vite build)
npm run preview      # Preview production build locally
npm run lint         # ESLint across all .ts/.tsx files (zero warnings allowed)
```

### Type Checking

```bash
npx tsc --noEmit     # Type-check without emitting (same as build's first step)
```

### Testing

No test framework is configured yet. When adding tests:
- Prefer Vitest (already Vite-based, zero extra config).
- Place test files adjacent to source as `*.test.ts` or `*.test.tsx`.
- Run a single test file: `npx vitest run src/lib/utils.test.ts`
- Run all tests: `npx vitest run`
- Watch mode: `npx vitest`

## Project Structure

```
typing/
  index.html              # App entry point (SPA shell)
  package.json
  vite.config.ts          # Vite + React plugin
  tsconfig.json           # Strict TS config (ES2020, react-jsx)
  tailwind.config.js      # Tailwind with shadcn/ui-style design tokens
  postcss.config.js       # Tailwind + autoprefixer
  public/                 # Static assets (manifest.json, keyboard.svg)
  src/
    main.tsx              # React root render
    index.css             # Tailwind directives + CSS custom properties
    lib/
      utils.ts            # cn() helper, WPM/accuracy calculators, ID generation
      storage.ts          # localStorage persistence: types, load/save, session tracking
      lessons.ts          # Lesson definitions, drill sentences, progression logic
```

Components and pages should be added under `src/` (e.g., `src/components/`, `src/pages/`).

## Code Style Guidelines

### TypeScript

- **Strict mode is ON.** Do not use `any` without justification. Prefer explicit types.
- `noFallthroughCasesInSwitch` is enabled — always break/return in switch cases.
- `noUnusedLocals` and `noUnusedParameters` are **disabled** — unused vars won't error,
  but keep code clean regardless.
- Use TypeScript interfaces for data shapes (see `storage.ts` for examples).
- Prefer `interface` over `type` for object shapes; use `type` for unions/intersections.
- Use the `Omit<>` utility type when deriving partial shapes (see `addSession`).

### Imports

- Use ES module imports exclusively. No `require()`.
- Use relative paths with explicit `.tsx`/`.ts` extensions for local imports
  (e.g., `import App from './App.tsx'`).
- Package imports come first, then local imports, separated by a blank line.
- Use `import { type Foo }` syntax for type-only imports from value modules.

### Formatting

- **Quotes:** Double quotes for strings (`"hello"`, not `'hello'`).
  Exception: JSX attributes also use double quotes.
- **Semicolons:** Omitted in some files (main.tsx), used in others (storage.ts).
  Follow the convention of the file you're editing. For new files, prefer no semicolons
  to match the Vite template style.
- **Indentation:** 2 spaces.
- **Trailing commas:** Used in multi-line structures.
- **Line length:** Keep reasonable (~100 chars); no hard limit configured.
- **Arrow functions** for inline callbacks; **`function` declarations** for named exports.

### Naming Conventions

- **Files:** camelCase for utility modules (`utils.ts`, `storage.ts`), PascalCase for
  React components (`App.tsx`).
- **Interfaces/Types:** PascalCase (`UserSettings`, `SessionStat`, `Lesson`).
- **Functions:** camelCase (`calculateWPM`, `loadState`, `generateDrillText`).
- **Constants:** UPPER_SNAKE_CASE for top-level module constants
  (`LESSONS`, `DRILL_SENTENCES`, `STORAGE_KEY`, `DEFAULT_STATE`).
- **Variables:** camelCase.
- **React components:** PascalCase function names, PascalCase filenames.

### React Patterns

- Use functional components exclusively. No class components.
- Use React.StrictMode in the app root.
- Styling via Tailwind utility classes composed with the `cn()` helper
  (uses `clsx` + `tailwind-merge`).
- Use Radix UI primitives for interactive elements (select, switch, tabs, etc.).
- Design tokens are defined as CSS custom properties in `index.css` using HSL values
  and referenced via Tailwind's `hsl(var(--token))` pattern from `tailwind.config.js`.

### Error Handling

- Use try/catch for localStorage operations; fail silently with console.error
  (see `saveState`).
- Return safe defaults on parse failures (see `loadState`).
- Guard against division by zero and edge cases with early returns
  (see `calculateWPM`, `calculateAccuracy`).
- Use nullish coalescing (`??`) for fallbacks (see `generateDrillText`).

### State Management

- App state lives in localStorage via `loadState()`/`saveState()` in `storage.ts`.
- No external state management library (no Redux, Zustand, etc.).
- State shape is defined by the `AppState` interface. Use spread-merge when loading
  to handle schema evolution (new fields get defaults automatically).
- Session history is capped at 100 entries.

## Commit Messages

Use imperative mood, concise descriptions:
```
Add project scaffolding: Vite config, Tailwind, storage lib, lessons data
```

## ESLint Configuration

ESLint is configured via `.eslintrc.cjs`. The `npm run lint` script (see
`package.json`) uses this config file and also passes these CLI flags:
- `--report-unused-disable-directives` — flags unnecessary eslint-disable comments
- `--max-warnings 0` — warnings are treated as errors

The config sets:
- Parser: `@typescript-eslint/parser` (with `ecmaVersion: "latest"`, `sourceType: "module"`, `ecmaFeatures.jsx: true`)
- Extends: `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:react-hooks/recommended`
- Plugins: `react-refresh`

When adding or changing lint rules, update `.eslintrc.cjs` (or migrate to a flat
config `eslint.config.js` if the project adopts that style in the future).

## Key Conventions for Agents

1. Always run `npm run build` after changes to verify type-safety.
2. Always run `npm run lint` to catch lint issues before committing.
3. Do not add `any` types without a comment explaining why.
4. Keep localStorage access isolated in `src/lib/storage.ts`.
5. When adding new lessons, follow the `Lesson` interface schema in `lessons.ts`.
6. Use Tailwind utility classes for all styling — do not add custom CSS unless
   defining new design tokens in `index.css`.
7. Radix UI components should be used for interactive primitives (dialogs, dropdowns,
   toggles, etc.) rather than building from scratch.
