# KRMCrypto Backend

A Node.js REST API for managing users, subscriptions, cryptocurrency prices and newsletter sign‑ups. The service integrates with MongoDB, Sendinblue (Brevo) and Coinbase Commerce.

## Features

- User registration and JWT based authentication
- Subscription management with basic plans (daily/weekly/monthly)
- Cryptocurrency ticker powered by the CoinGecko API
- Newsletter subscriptions with Brevo mailing list integration
- Payments through Coinbase Commerce
- Optional IP geolocation for personalisation

## Requirements

- Node.js 14+
- MongoDB database
- Brevo (Sendinblue) account
- Coinbase Commerce account

## Installation

```bash
# clone the repo
npm install
```

Create a `.env` file inside `/backend` with the following variables:

```dotenv
MONGODB_URI=mongodb://localhost:27017/krmcrypto
NODE_ENV=development
PORT=3000

JWT_SECRET=changeme
JWT_EXPIRES_IN=7d

SMTP_HOST=smtp-relay.sendinblue.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASSWORD=your_pass
EMAIL_FROM=news@krmcrypto.com
BREVO_API_KEY=your_brevo_key
BREVO_LIST_ID=2

COINBASE_API_KEY=your_coinbase_key
COINGECKO_API_KEY=your_coingecko_key
IPGEO_API_KEY=your_ipgeolocation_key
IPGEO_ASYNC=false
```

Start the API:

```bash
npm run dev    # development
npm start      # production
```

## Project structure

```
backend/
├─ src/
│  ├─ config/
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ models/
│  ├─ routes/
│  ├─ services/
│  └─ utils/
└─ package.json
```

## Main endpoints

- `POST /api/auth/register` – create account
- `POST /api/auth/login` – obtain JWT token
- `GET /api/subscriptions/me` – retrieve the logged user's subscription
- `POST /api/newsletter/subscribe` – add an email to the newsletter list
- `GET /api/crypto/ticker` – list crypto prices
- `GET /api/geo` – resolve requesting IP geolocation

More routes exist for categories, posts, payments and admin functions. Swagger documentation can be enabled if required.

---

This backend powers the KRMCrypto front‑end applications.
