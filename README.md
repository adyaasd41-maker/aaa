# Family + Cafe Finance Dashboard 💰☕

Modern SaaS-style finance dashboard for both family/personal finance and small cafe business finance.

## Stack
- Next.js App Router + React + TailwindCSS
- PostgreSQL + Prisma ORM
- Recharts, Framer Motion, XLSX export
- JWT cookie auth
- Vercel-ready

## Local setup
```bash
npm install
cp .env.example .env
# set DATABASE_URL and JWT_SECRET
npx prisma db push
npm run prisma:seed
npm run dev
```

Open `http://localhost:3000`.

Demo login after seed:
- email: `demo@finance.mn`
- password: `password123`

## Vercel deployment
1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Add a PostgreSQL database, for example Vercel Marketplace Prisma Postgres or Neon/Supabase.
4. Set environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
5. Deploy.
6. Run migration once from local or Vercel build shell:
```bash
npx prisma db push
```

## Included features
- Unified dashboard: Family + Cafe balance
- Add/Edit/Delete API for transactions
- Family categories and source filter support
- Budget, savings goals, loan models
- Cafe daily sales with cash/card/QPay
- Charts: income vs expense, pie breakdown, line trend
- Dark/light mode
- Toast notification
- Skeleton loading
- Excel export
- Mongolian-first UI and i18n-ready structure

## Main API routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET/POST /api/transactions`
- `PUT/DELETE /api/transactions/:id`
- `GET/POST /api/budgets`
- `GET/POST /api/goals`
- `GET/POST /api/loans`
- `GET/POST /api/sales`
- `GET /api/export`

## Notes
This is a strong production starter. For a real paid product, add password reset, email verification, recurring loan payments, audit logs, and row-level database hardening.
