# Quota — Forensic API Cost Monitoring

Quota is a Next.js app that surfaces API usage and cloud spend across providers (Stripe, OpenAI, Twilio, AWS) so engineering teams can find redundant calls, stop runaway loops, and reduce bills.

## Key Features

- Forensic API usage visibility across multiple providers
- Kill-switches for runaway loops and alerts
- Waitlist signup with hosted email confirmations
- Built with Next.js App Router, TypeScript and Tailwind CSS

## Quick Start

1. Install dependencies

```bash
npm install
# or
pnpm install
```

2. Run the dev server

```bash
npm run dev
# Open http://localhost:3000
```

3. Build for production

```bash
npm run build
npm run start
```

## Important environment variables

Set these in your local `.env.local` and in your deployment (Vercel/Netlify):

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase URL (browser-safe)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key (browser-safe)
- `SUPABASE_URL` — Supabase URL for server-side usage (service role)
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-only)
- `RESEND_API_KEY` — Resend API key (server-only)

Notes:
- Do NOT commit server secrets. Use your host's environment variable UI for production.
- The app uses a server API route at `/api/waitlist` which inserts into the `waitlist` table (Supabase) and sends confirmation emails (Resend). That route requires server-side Supabase keys and `RESEND_API_KEY`.

## Fonts & Styling

- `app/layout.tsx` loads `JetBrains_Mono` via `next/font` and injects a CSS variable `--font-jetbrains-mono`.
- `app/globals.css` consumes that variable for the site `font-family` so the mono font applies globally.
- Browser autofill is overridden in `app/globals.css` to keep dark inputs consistent with the UI.

## API Endpoints

- `POST /api/waitlist` — accepts `{ email }` JSON. Validates email, inserts into Supabase `waitlist` table, and sends a confirmation email (best-effort).

## Testing & Quality

- Type check: `npm run type-check` (if configured)
- Lint: `npm run lint`
- Run unit or integration tests (add your test runner of choice)

## Deploying

- Deploy on Vercel: configure the environment variables in your Vercel project settings and push this repo. Vercel automatically handles Next.js builds and serverless functions.

## SEO Notes

- `app/layout.tsx` includes meta `title`, `description`, Open Graph and Twitter card metadata and JSON-LD structured data to improve search result appearance.

## Local troubleshooting

- If fonts do not appear, ensure `app/layout.tsx` includes the `variable` class and that `app/globals.css` uses `var(--font-jetbrains-mono)`.
- If autofill shows a white background for inputs, try clearing browser autofill caches or test in an incognito window; the repository includes autofill overrides in `app/globals.css`.

## Contributing

- PRs and issues welcome. Follow existing code style and run linters/type-checks before submitting.

## License

- Add a license file if you plan to open-source this repository.

