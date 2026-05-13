# Subscription Management System API

A production-ready RESTful API built with Node.js, Express, and MongoDB to manage user subscriptions efficiently. It features robust authentication, database transactions, rate limiting, and security protections.

## 🚀 Features

- **User Authentication**: Secure sign-up and sign-in using JWT and Bcrypt for password hashing.
- **Subscription Management**: CRUD operations for tracking subscriptions, with automated renewal date logic.
- **Database Transactions**: Atomic operations using Mongoose Sessions to ensure data integrity during complex writes.
- **Advanced Security**: 
  - **Rate Limiting**: Protection against DDoS and brute-force attacks via Arcjet.
  - **Bot Detection**: Identifies and blocks automated bot traffic.
  - **Content Protection**: Shielding the API from common web vulnerabilities.
- **Global Error Handling**: Centralized middleware to handle validation, database, and internal server errors gracefully.
- **API Versioning**: Structured under `/api/v1` for future-proof scalability.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: Arcjet (Rate limiting & Bot protection)
- **Auth**: JWT (JSON Web Tokens)
- **Validation**: Mongoose Schemas

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance
- [Arcjet](https://arcjet.com/) API Key

## ⚙️ Environment Variables

Create a `.env.development.local` file in the root directory and add the following:

```env
# Server Configuration
PORT=5500
NODE_ENV=development

# Database
DB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Security (Arcjet)
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sbongiseni88/Subscription_Management_System.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm run dev
   ```

## 🛣️ API Endpoints

### Auth
- `POST /api/v1/auth/sign-up`: Register a new user
- `POST /api/v1/auth/sign-in`: Login and receive JWT

### Users
- `GET /api/v1/users`: Get all users (Protected)
- `GET /api/v1/users/:id`: Get specific user details (Protected)

### Subscriptions
- `POST /api/v1/subscriptions`: Create a new subscription (Protected)
- `GET /api/v1/subscriptions/user/:id`: Get all subscriptions for a specific user (Protected)

---

## 📝 Documentation
For more detailed technical notes on Idempotency, HTTP Status Codes, and Atomic Operations, refer to the [Confluence Notes](./confluence_notes.md).