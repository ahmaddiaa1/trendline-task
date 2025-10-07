# Trendline Auth (Next.js + Tailwind + shadcn/ui)

This project implements Register, Login, Verify, and Dashboard using the provided API.

## Tech

- Next.js (App Router, TypeScript)
- Tailwind CSS (v4)
- shadcn/ui

## Environment

Create a `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=your_api_base_URL
```

## Scripts

```
npm install
npm run dev
```

Open http://localhost:3000

## Flow

- /register → submit form-data to `/auth/register`. On success, token saved and redirected to /verify.
- /verify → submit code to `/auth/verify-email` (test code: 123456). Resend: `/auth/verify-email/resend-code`.
- /login → submit to `/auth/login`. On success, token saved and redirect to /dashboard.
- /dashboard → shows “Welcome, [User Name]”.
- /ui → UI For Product Details page

Token is stored in localStorage and mirrored to a cookie `auth_token` for middleware-based protection.

## Deploy

Deploy on Vercel. Add env var `NEXT_PUBLIC_API_BASE_URL`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Demo 
Open [https://trendline-seven.vercel.app/](https://trendline-seven.vercel.app/) with your browser to see the Demo result

```bash
Verify Code : 123456
```

