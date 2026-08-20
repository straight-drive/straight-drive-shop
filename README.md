# Straight Drive — Full-Stack Project

This is a monorepo containing:

- **`frontend/`** — the original React/Vite/Tailwind site, restructured with a
  real API client, auth context, and protected routes (Phase A + C started).
- **`backend/`** — a new Express + Prisma (PostgreSQL) API. Authentication is
  fully implemented; every other domain from the project brief has a
  database model ready and a placeholder route (Phase B).
- **`ANALYSIS_REPORT.md`** — the Step 1 analysis of the original project,
  plus the full phased roadmap (Phases A–G) for the remaining work.

## Getting Started

### 1. Restore your assets
Your images/video were left out of this delivery to keep it small. Copy the
`src/assets/images/` and `src/assets/videos/` folders from your original
project into `frontend/src/assets/`.

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env      # set DATABASE_URL + JWT secrets
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev               # http://localhost:4000
```

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env.local   # defaults already point at localhost:4000
npm run dev                  # http://localhost:5173
```

Sign up, log in, and try "Forgot password" — with no SMTP configured, the
backend logs the verification/reset email content straight to its console
so you can copy the link and test the full flow locally.

## What changed vs. the original upload

- Nothing about the visual design changed — same Tailwind theme, same
  components, same pages.
- `src/services/`, `src/context/`, `src/hooks/`, `src/constants/` are new.
- `LoginForm`, `SignupForm`, `ForgotPassword` now call the real backend
  instead of `setTimeout`. A new `ResetPassword` page completes that flow.
- `/dashboard` is now behind a `ProtectedRoute` and shows the real logged-in
  user's name/email; Logout actually revokes the session.
- A brand new `backend/` app with a 20+ model Prisma schema and a working
  JWT auth system (signup/login/refresh/logout/forgot/reset/change/verify).

## Roadmap (see ANALYSIS_REPORT.md for details)

| Phase | Status | Contents |
|---|---|---|
| A — Frontend restructure | ✅ Done | services/context/hooks/constants, API client |
| B — Backend + auth | ✅ Done | Express, Prisma schema, JWT auth |
| C — Wire real dashboard data | Next | Orders/profile from DB instead of placeholders |
| D — Products/Admin | Planned | CRUD APIs, admin panel, RBAC |
| E — Contact/Chatbot/Search | Planned | Forms persist to DB, chatbot scaffold, search/filters |
| F — Shopify/SEO/Security | Planned | Shopify sync, sitemap/schema, hardening pass |
| G — Docs | Planned | Full documentation bundle |
