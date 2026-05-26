# Mokusei AI

A Jupiter-themed AI agent ecosystem frontend built with **Vite 8 + React 19 + Tailwind CSS v4**.

> "Mokusei" (木星) means Jupiter in Japanese.

## Tech Stack

- **Framework:** Vite 8 + React 19
- **Styling:** Tailwind CSS v4 with `@theme` design tokens
- **Routing:** React Router DOM v7
- **Auth:** Laravel Sanctum SPA (session cookie-based)
- **Testing:** Vitest + React Testing Library (15 tests)
- **Linting:** ESLint (flat config)

## Features

- Jupiter banded gradient backgrounds with animated drift
- Dark mode default with full token system
- Hover-triggered agents dropdown (Ganymede + Europa)
- Sanctum SPA authentication (register / login / logout)
- Password visibility toggle (eye icon)
- Separate pages: Home, Agents, Ganymede, Pricing, Login
- Rate-limited login (5 attempts/minute)

## Prerequisites

- Node.js 20+
- Laravel 12 backend (see [Backend Setup](#backend-setup))

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (proxies /api and /sanctum to :8000)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm test` | Run Vitest test suite |
| `npm run lint` | Run ESLint |

## Auth System

Sanctum SPA (Same-Origin) authentication flow:

1. **Frontend** calls `GET /sanctum/csrf-cookie` → Laravel sets `XSRF-TOKEN` + session cookies
2. **Frontend** sends `POST /api/login` (or `/api/register`) with credentials + `X-XSRF-TOKEN` header
3. **Laravel** validates, logs in user, sets session cookie
4. Subsequent requests are authenticated via session cookie

All auth state is managed by `AuthContext` (`src/context/AuthContext.jsx`) and proxied through `api.js` (`src/services/api.js`).

## Project Structure

```
src/
├── components/   # Reusable UI (Nav)
├── context/      # React context (AuthContext)
├── pages/        # Route pages (Home, Agents, Pricing, Login)
├── services/     # API layer (api.js)
├── App.jsx       # Route definitions
├── App.test.jsx  # App integration tests
├── main.jsx      # Entry point
└── index.css     # Tailwind + design tokens + animations
```

## Design System

| Token | Value |
|-------|-------|
| Primary (Jupiter) | `#c67b3d` / `#a8642e` |
| Cream (background) | `#faf6f0` / dark `#191613` |
| Red Spot (accent) | `#c0392b` / `#e74c3c` |
| Surface | `#ffffff` / dark `#2a2520` |
| Font (brand) | Press Start 2P (pixel) |
| Font (body) | Lora (serif) |

Dark mode is enabled by default via `<html class="dark">`.

## Backend Setup

The Laravel backend lives in a separate directory:

```
../mokusei-ai-api/
├── routes/api.php         # Auth endpoints
├── app/Http/Controllers/Api/AuthController.php
├── config/sanctum.php     # Stateful domains
├── config/cors.php        # Credentials: true
└── bootstrap/app.php      # Sanctum middleware + API exception handling
```

```bash
cd ../mokusei-ai-api
php artisan serve --port=8000
```

### Key Backend Config

- **CSRF:** Disabled in Sanctum frontend middleware (`validate_csrf_token: null`) — API routes use session auth directly
- **Auth guard:** `sanctum` (falls back to `web` for stateful requests)
- **Rate limiting:** `throttle:5,1` on POST `/api/login`
- **Unauthenticated:** Returns JSON `{"message": "Unauthenticated."}` for `api/*` routes

## Testing

```bash
npm test
```

15 tests across 3 files:
- `App.test.jsx` — navigation and page rendering
- `Nav.test.jsx` — brand, links, dropdown
- `Login.test.jsx` — form elements, password toggle, register/login toggle

## Production Build

```bash
npm run build
# Output in dist/
```

Serve `dist/` from your Laravel backend or any static host. Ensure CORS and Sanctum `stateful` domains are configured for your production URL.
