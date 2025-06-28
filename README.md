# KRMCrypto Project

This repository contains the full stack for the KRMCrypto platform. It is split into three subprojects:

- **backend/** – a Node.js REST API that manages users, subscriptions, cryptocurrency prices and newsletter sign ups.
- **frontend-en/** – a Next.js 14 site providing the English version of KRMCrypto.
- **frontend-pt/** – a Next.js 14 site serving Portuguese speaking users.

Each directory has its own `README.md` with detailed instructions. This document gives a high level overview.

## Requirements

- Node.js 16+ for the front‑end apps (Node.js 14+ for the backend)
- MongoDB for data storage

Optional third party services such as Brevo and Coinbase Commerce are required for production features. See `backend/README.md` for the environment variables needed.

## Getting started

1. Clone this repository.
2. Install dependencies for each part:

```bash
# Backend
cd backend
npm install

# English front end
cd ../frontend-en
npm install

# Portuguese front end
cd ../frontend-pt
npm install
```

3. Create environment files:
   - `backend/.env` following the example in `backend/README.md`.
   - `frontend-en/.env.local` and `frontend-pt/.env.local` with `NEXT_PUBLIC_API_URL` pointing to your running backend.

## Running the projects

Start the backend API:

```bash
cd backend
npm run dev      # or npm start for production
```

Then in separate terminals start each frontend:

```bash
cd frontend-en && npm run dev
cd frontend-pt && npm run dev
```

By default the Next.js apps run on `http://localhost:3000`. Adjust the port or API URL as needed.

## Repository layout

```
KRMCrypto/
├─ backend/
├─ frontend-en/
└─ frontend-pt/
```

See the individual `README.md` files in each folder for more details about features, available scripts and project structure.
