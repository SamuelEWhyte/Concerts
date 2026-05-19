# Concert Cost Tracker

A simple web app to log concerts you attended, track what you spent, rate how fun each show was, and see charts on a dashboard. Built with Next.js, Tailwind CSS, daisyUI, Recharts, and Supabase.

## What you need

- [Node.js](https://nodejs.org/) (LTS version)
- A Supabase account and project (ConcertCosts)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.local.example` to `.env.local`:

   ```bash
   copy .env.local.example .env.local
   ```

   In Supabase, open your project → **Connect** or **Settings → API Keys**:

   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the **publishable** key (or legacy **anon public** key) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Do **not** use the service role or secret key in this file.

3. **Restart after env changes**

   If the dev server is already running, stop it (Ctrl+C) and start again so it picks up `.env.local`.

4. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Using the app

1. **Sign up** with email and password.
2. **Log in** and open the dashboard.
3. **Add a concert** — artist, venue, date, fun rating (1–5 stars), and one or more costs.
4. **Dashboard** — totals, charts, and your concert list (read-only in v1).

## Sign-up and login (important for local dev)

Supabase may require **email confirmation** before you can log in. If login fails or signup tells you to check email:

1. In Supabase → **Authentication** → **URL Configuration**, set:
   - **Site URL:** `http://localhost:3000`
   - **Redirect URLs:** add `http://localhost:3000/auth/callback`
2. For easier local testing, turn **off** email confirmation:
   - **Authentication** → **Providers** → **Email** → disable **Confirm email** → Save.
3. Restart `npm run dev` after changing `.env.local` (includes `NEXT_PUBLIC_SITE_URL`).

If you already signed up but could not log in, try again now — existing unconfirmed accounts were marked as confirmed for this project.

## Theme selector

Use the theme dropdown in the nav (or mobile menu) to switch styles: light, dark, cupcake, or synthwave. Your choice is saved in the browser.

## UI libraries used

- [daisyUI](https://daisyui.com/components/) — buttons, cards, alerts, themes
- [Lucide](https://lucide.dev/icons/) — icons
- [Sonner](https://sonner.emilkowal.ski/) — toast notifications
- [AutoAnimate](https://auto-animate.formkit.com/) — smooth list updates

## Database

Tables and security rules live in Supabase. The SQL is also in `supabase/migrations/` for reference. Row Level Security ensures you only see your own concerts.

## Scripts

| Command        | Purpose              |
| -------------- | -------------------- |
| `npm run dev`  | Start dev server     |
| `npm run build`| Production build     |
| `npm start`    | Run production build |
| `npm run lint` | Run ESLint           |
