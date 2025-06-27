# KRMCrypto Frontend (English)

This Next.js 14 application provides cryptocurrency news and analysis for an English speaking audience. It consumes the KRMCrypto backend API for authentication, subscriptions, newsletter and price data.

## Tech stack

- Next.js 14 with React 18 and TypeScript
- Tailwind CSS for styling
- Axios for HTTP requests

## Setup

Requirements:

- Node.js 16+
- `NEXT_PUBLIC_API_URL` pointing to the backend

Install dependencies and create an environment file:

```bash
cd frontend-en
npm install
cp .env.local .env.local  # edit if needed
```

`.env.local` should contain:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Useful scripts

- `npm run dev` – start the development server
- `npm run build` – generate a production build
- `npm start` – run the built app
- `npm run lint` – check code with ESLint

## Key features

- Home page sections reordered based on the user's geolocation
- Category pages for regions and topics (UK, USA, Bitcoin …)
- Live cryptocurrency ticker using the backend
- JWT authentication via the `AuthProvider`
- User area to manage profile and subscription
- Newsletter subscription banners and form
- Article search by keyword

## Folder overview

```
frontend-en/
├─ public/
├─ src/
│  ├─ components/
│  ├─ contexts/
│  ├─ hooks/
│  ├─ pages/
│  ├─ services/
│  ├─ styles/
│  └─ utils/
└─ package.json
```

Run locally with:

```bash
npm run dev
```

The app defaults to http://localhost:3000.
