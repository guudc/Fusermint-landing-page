---

# Fusermint Landing Page Server

A simple **TypeScript + Express + MongoDB + Swagger** server with a `/currency/quote` endpoint for converting currency pairs (e.g. **USD → NGN**).

---

## 🚀 Features

* TypeScript + Express + MongoDB
* Currency conversion endpoint (`/currency/quote`)
* Swagger API documentation
* Environment-based configuration (`.env`)
* Caching of exchange rates
* Configurable transaction fees

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/fusermint-landing-page-server.git
cd fusermint-landing-page-server
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the project:

```env
# CONFIG
PORT=
# KEYS
EXCHANGE_RATE_API_KEY=
# FEES
FUSERMINT_FEE=
```

### Explanation

* **PORT** → The port where the server runs (default: `4000`).
* **EXCHANGE\_RATE\_API\_KEY** → API key for fetching live exchange rates.
* **FUSERMINT\_FEE** → Transaction fee percentage applied to currency conversions.

---

## 🛠️ Running the Server

### Development Mode (hot-reload with `ts-node-dev`)

```bash
npm run dev
```

### Build

```bash
npm run build
```

This compiles TypeScript into `/dist`.

### Production

```bash
npm start
```

---

## 📖 API Documentation

Swagger documentation is available at:

```
http://localhost:4000/docs
```

---

## 🌍 API Endpoints

### Get Currency Quote

**POST** `/currency/quote`

Convert an amount from one currency to another (currently supports USD ⇆ NGN).

#### Request Body

```json
{
  "from": "USD",
  "to": "NGN",
  "amount": 100
}
```

#### Successful Response

```json
{
  "from": "USD",
  "to": "NGN",
  "amount": 100,
  "rate": 1560.45,
  "converted": 156045,
  "lastUpdated": 1725286358123
}
```

#### Error Responses

* **400 Bad Request** → Invalid input (missing fields, wrong types, negative amount).
* **500 Internal Server Error** → Conversion failed.

---

## ✅ Testing

Run unit + integration tests:

```bash
npm test
```

---
 