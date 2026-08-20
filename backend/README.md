# Straight Drive API (Backend)

Express + Prisma (PostgreSQL) backend for the Straight Drive platform.
This is Phase B of the full-stack transformation: authentication is fully
implemented; every other domain (products, orders, admin, etc.) has a
Prisma model ready and a placeholder route so the architecture is set up
for the phases that follow.

## Quick Start

```bash
cd backend
npm install
cp .env.example .env       # then fill in DATABASE_URL and JWT secrets
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed        # creates an admin user + one sample product
npm run dev                # starts on http://localhost:4000
```

You need a running PostgreSQL instance. Options:
- Local: `postgres://user:pass@localhost:5432/straight_drive`
- Hosted (recommended for quick start): Railway, Render, Supabase, or Neon all offer a free Postgres instance — copy the connection string they give you into `DATABASE_URL`.

## What's implemented (Phase B)

**Auth** (`/api/auth/*`) - fully working against the database:
- `POST /signup` — creates a user, sends (or logs) a verification email, returns tokens
- `POST /login` — validates credentials, returns access + refresh tokens
- `POST /refresh-token` — rotates a refresh token for a new access token
- `POST /logout` — revokes the given refresh token
- `GET /me` — returns the authenticated user (requires `Authorization: Bearer <token>`)
- `POST /forgot-password` / `POST /reset-password` — email-based reset flow
- `POST /change-password` — for logged-in users
- `POST /verify-email` / `POST /resend-verification`

Passwords are hashed with bcrypt (12 rounds). Access tokens are short-lived
JWTs (15 min default); refresh tokens are long-lived, stored in the database
so they can be revoked, and rotated on every use.

**Database schema** (`prisma/schema.prisma`) — all models from the project
brief: User, RefreshToken, EmailVerificationToken, PasswordResetToken,
Notification, Category, Product (+ ProductMedia/Video/Document/Specification/Relation),
Cart/CartItem, Wishlist, Order/OrderItem, Review, ContactMessage,
NewsletterSubscriber, SupportTicket, BookDemoRequest, BlogPost,
ChatConversation/ChatMessage.

**Everything else** (`/api/products`, `/api/orders`, `/api/admin`, etc.) —
routes exist and return a structured `501 Not Implemented` response so the
frontend can already point at real URLs; the actual controllers/services
land in later phases (see root `ANALYSIS_REPORT.md` for the roadmap).

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # full data model
│   └── seed.js            # creates an admin + sample product
└── src/
    ├── server.js          # entry point
    ├── app.js             # express app: security, CORS, routes, error handling
    ├── config/            # env.js (typed env access), db.js (Prisma client)
    ├── middleware/         # auth (protect/authorize), validate, error, rate limit
    ├── validators/         # zod schemas per feature
    ├── services/           # business logic (auth, tokens, email)
    ├── controllers/        # thin HTTP layer calling services
    └── routes/             # one router per feature, mounted in routes/index.js
```

## Security measures already in place

- `helmet` for secure HTTP headers
- CORS locked to `CLIENT_URL`
- `express-rate-limit`: 300 req/15min globally, 20 req/15min on auth routes
- bcrypt password hashing (12 rounds)
- JWT access/refresh split with DB-backed revocation and rotation
- One-time tokens (email verify / password reset) are stored as SHA-256
  hashes, never in plaintext, and expire (24h / 1h respectively)
- Centralized error handler that never leaks stack traces outside development
- zod validation on every auth input

## Next Steps (see ANALYSIS_REPORT.md for the full roadmap)

- Phase C: connect Dashboard's real order/profile data
- Phase D: Product/Category/Order/Review/Wishlist CRUD + admin panel + RBAC
- Phase E: Contact/Newsletter/Support endpoints, chatbot, search
- Phase F: Shopify sync, SEO, security hardening pass
- Phase G: full docs bundle
