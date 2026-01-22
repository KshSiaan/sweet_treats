# Copilot / AI Agent Instructions for Sweet Treats

Purpose: Help AI coding agents be productive quickly by describing the repo layout, conventions, build/dev commands, and key integration points.

- Repo type: Next.js (App Router) TypeScript project. App code lives under `src/app` (server components by default).
- Primary entry: `src/app/page.tsx`. Role-aware route groups exist: `src/app/admin`, `src/app/business`, `src/app/employee`.
- UI primitives: `src/components/ui/*` — shadcn-style wrappers. Use these rather than ad-hoc HTML.
- Layouts & route groups: Each role folder uses `layout.tsx` to provide sidebars and wrappers (see `src/components/sidebars/*`). Add page components in the same folder alongside `layout.tsx`.

Key patterns and conventions
- Server vs Client: Files under `src/app` are server components by default. Add `"use client"` at the top of a file when it needs browser APIs or hooks. Example: client-only interactive widgets under `src/components/ui` and pages that use `useState`, `useEffect`, or Stripe.
- API clients: Network helpers live in `src/lib/api/*` (e.g., `auth.ts`, `admin.ts`, `business.ts`). Prefer calling those modules from server components where possible, and wrap client fetches with `react-query` when used in the browser.
- State & queries: Uses `@tanstack/react-query` and `zustand`. Look at `src/lib/store/stripe.ts` for Stripe-specific state patterns.
- Providers: App-wide context is in `src/provider/god-provider.tsx` — ensure components that need auth or theme are wrapped by the provider used in app layouts.
- Types: Shared types live in `src/types/*`. Use these for request/response shapes to maintain consistency.

Build / dev / tooling
- Dev server: `npm run dev` (script uses `next dev --turbopack`). Alternatives shown in README: `pnpm dev`, `yarn dev`, or `bun dev` if you prefer those package managers.
- Build: `npm run build` (`next build --turbopack`).
- Linting/formatting: `npm run lint` runs `biome check`. `npm run format` runs `biome format --write`.

Integration points to watch
- Stripe: Frontend integration uses `@stripe/react-stripe-js` and `src/lib/store/stripe.ts`. When changing payment flows, update both client Stripe usage and any backend handlers (API calls) under `src/lib/api`.
- Charts & reports: Recharts and other chart components appear under `src/app/admin` and `src/app/business` (e.g., `bar-chart.tsx`, `pie-chart.tsx`). These pages often fetch aggregated data via `src/lib/api/*`.
- Authentication flows: There is an `(auth)` route group in `src/app/(auth)` with nested protected flows. Use `src/lib/api/auth.ts` and `src/provider/god-provider.tsx` as the canonical auth paths.

Editing guidance & examples
- Adding a client component (minimal):

  1. Create file and add `"use client"` at the top.
  2. Import hooks and UI primitives from `src/components/ui`.

  Example header:

  ```tsx
  "use client"
  import { useState } from 'react'
  import { Button } from '../components/ui/button'
  ```

- Making server-side API calls inside a page: import helper from `src/lib/api/*` and call it directly in the server component (no browser fetch required).

What not to change without context
- Avoid altering global layout wrappers (`src/app/layout.tsx` or role `layout.tsx`) without checking how sidebars and providers are wired — small changes can break auth or theming across the app.
- Don’t introduce browser-only code into server components. If you need interactivity, extract a client component and include it inside the server component.

Where to look for examples
- `src/components/ui/*` — common UI patterns and how props are passed.
- `src/lib/api/*` — canonical API client structure and error handling.
- `src/app/admin/*` and `src/app/business/*` — real page implementations showing data fetching and layout usage.

If something is missing
- Ask the repo owner for CI, environment variables, or secret management details before modifying integrations (Stripe keys, external APIs). Local dev uses `npm run dev` and port 3000 by default.

Feedback
- I created this baseline to accelerate AI agent work — tell me which areas need more depth (examples, test commands, CI, env setup) and I'll expand.
