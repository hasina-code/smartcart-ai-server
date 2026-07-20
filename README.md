# 🛒 SmartCart AI Server

Backend API for **SmartCart AI**, an AI-powered e-commerce platform built with **Node.js, Express, TypeScript, MongoDB, JWT Authentication, and Google Gemini AI**.

---

# 🚀 Live Server

https://smartcart-ai-server.vercel.app

---

# ✨ Features

- JWT Authentication
- Google Authentication
- Secure HTTP-only Cookie Authentication
- Product CRUD Operations
- Featured Products API
- Related Products API
- My Products API
- Protected Routes
- MongoDB Database
- Mongoose ODM
- AI Shopping Assistant API
- RESTful API
- Error Handling
- TypeScript Support

---

# 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS
- dotenv
- Google Gemini API

---

# 📁 Folder Structure

```text
smartcart-ai-server
│
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── types
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙ Environment Variables

Create a `.env` file in the root directory.

PORT=5000

NODE_ENV=

MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=
GEMINI_API_KEY=
CLIENT_URL=

---

# 📦 Installation

```bash
cd smartcart-ai-server
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

Start production server

```bash
npm start




# 🔐 Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/google` | Google Login |
| POST | `/api/auth/logout` | Logout User |
| GET | `/api/auth/me` | Get Current User |
| PUT | `/api/auth/profile` | Update Profile |

---

# 📦 Product APIs

## Public

| Method | Endpoint |
|---------|----------|
| GET | `/api/products` |
| GET | `/api/products/featured` |
| GET | `/api/products/:id` |
| GET | `/api/products/:id/related` |

## Protected

| Method | Endpoint |
|---------|----------|
| GET | `/api/products/my-products` |
| POST | `/api/products` |
| PUT | `/api/products/:id` |
| DELETE | `/api/products/:id` |

---

# 🤖 AI APIs

| Method | Endpoint |
|---------|----------|
| POST | `/api/ai/chat` |

---

# 🚀 Planned APIs

## Products

| Method | Endpoint |
|---------|----------|
| GET | `/api/products/search` |
| GET | `/api/products/filter` |
| GET | `/api/products/sort` |
| GET | `/api/products/paginated` |
| GET | `/api/products/category/:category` |
| GET | `/api/products/brand/:brand` |
| GET | `/api/products/latest` |
| GET | `/api/products/top-rated` |
| GET | `/api/products/in-stock` |
| PATCH | `/api/products/:id/stock` |
| PATCH | `/api/products/:id/rating` |
| PATCH | `/api/products/:id/feature` |

## AI

| Method | Endpoint |
|---------|----------|
| POST | `/api/ai/recommend` |
| POST | `/api/ai/compare` |
| POST | `/api/ai/search` |

## User

| Method | Endpoint |
|---------|----------|
| PATCH | `/api/auth/change-password` |
| DELETE | `/api/auth/delete-account` |

## Future Modules

- Wishlist API
- Shopping Cart API
- Orders API
- Checkout API
- Payment Gateway API
- Product Reviews API
- Coupons API
- Notifications API
- Admin Dashboard API
- Analytics API

---

# 🛡 Security

- JWT Authentication
- HTTP-only Cookies
- Password Hashing using bcryptjs
- Protected Routes
- CORS Configuration
- Environment Variables
- Secure Middleware

```
