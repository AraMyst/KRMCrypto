# KRMCrypto Frontend (Portuguese)

This project is a Portuguese version of the KRMCrypto website built with Next.js 14 and React 18. It focuses on presenting cryptocurrency news to a Brazilian and Portuguese audience.

## Stack

- Next.js and TypeScript
- Tailwind CSS
- Axios for API calls

## Getting started

Requirements:

- Node.js 16+
- The backend URL configured in `NEXT_PUBLIC_API_URL`

Install dependencies and prepare the environment:

```bash
cd frontend-pt
npm install
cp .env.local .env.local  # edit to point to your backend
```

Example `.env.local`:

```
NEXT_PUBLIC_API_URL=https://naoseicripto.com/wp-json/jsbackend/v1
```

## Available scripts

- `npm run dev` – start the development server
- `npm run build` – create an optimized build
- `npm start` – run the built application
- `npm run lint` – run ESLint checks

## Highlights

- Pages for regions such as Brasil and Portugal
- Cryptocurrency ticker via the shared backend
- Layout components using Tailwind CSS

Run locally with:

```bash
npm run dev
```

The site will be available on `http://localhost:3000` by default.
