This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🔑 API Key Setup

This application relies on the Real-Time Amazon Data API from RapidAPI to fetch product information. To enable data fetching, you must configure your API key locally.
1. Obtain Key: Get your personal API key by subscribing (free tier available) to the service [here.](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-amazon-data/playground)
2. Locate or Create File: Find or locate the .env.local file in the root directory.
3. Configure: Replace the placeholder with your copied key:

```bash
NEXT_PUBLIC_RAPIDAPI_KEY=PASTE_API_KEY_HERE
```

Note: The .env.local file is automatically excluded from Git, keeping your private key secure.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
