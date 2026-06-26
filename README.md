# Auth-API

A full-featured authentication REST API built with **Node.js** and **Express**, supporting user registration, login, JWT-based authentication, email verification, and a complete forgot/reset password flow.

---

## 📁 Project Structure

```
Auth-API/
├── controllers/
│   └── auth.js           # Route handler logic (register, login, forgot/reset password, etc.)
├── models/
│   └── user.js           # Mongoose/Sequelize User model with schema definition
├── routes/
│   └── routes.js         # Express router — maps HTTP endpoints to controller functions
├── utils/
│   ├── email.js          # Email sending utility (Nodemailer / Mailtrap integration)
│   └── generateToken.js  # JWT token generation helpers (auth token & reset token)
├── views/
│   ├── index.ejs         # Landing / home page
│   ├── login.ejs         # Login form
│   ├── sign-in.ejs       # Sign-up / registration form
│   ├── forgot.ejs        # Forgot password form
│   └── reset.ejs         # Reset password form
├── .env                  # Environment variables (not committed)
├── .gitignore            # Ignores node_modules, .env, etc.
├── app.js                # Express app entry point
├── package.json          # Project metadata and dependencies
└── package-lock.json     # Locked dependency tree
```

---

## ✨ Features

- **User Registration** — Create an account with hashed password storage
- **User Login** — Authenticate and receive a signed JWT
- **Protected Routes** — JWT middleware to guard private endpoints
- **Forgot Password** — Sends a time-limited reset link to the user's email
- **Reset Password** — Validates reset token and updates password securely
- **Password History** — Prevents reuse of the last 5 passwords
- **Email Integration** — Mailtrap sandbox for development email testing
- **EJS Views** — Server-side rendered forms for auth flows

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS |
| Authentication | JSON Web Tokens (JWT) |
| Password Hashing | bcrypt |
| Email | Nodemailer + Mailtrap |
| Database | MongoDB (Mongoose) / PostgreSQL |
| Environment | dotenv |

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ashishnetha/auth-api.git
cd auth-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_RESET_SECRET=your_jwt_reset_secret_key
JWT_EXPIRES_IN=7d
JWT_RESET_EXPIRES_IN=15m

# Email (Mailtrap)
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password
EMAIL_FROM=noreply@authapi.dev
```

### 4. Start the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server will run at `http://localhost:3000`.

---

## 🔐 Security Highlights

- Passwords hashed with **bcrypt** before storage
- Separate JWT secrets for **auth tokens** and **reset tokens**
- Reset tokens are **short-lived** (15 minutes)
- **Password history** (last 5) enforced to prevent reuse
- `.env` excluded from version control via `.gitignore`
- `node_modules` not committed

---

## 🧪 Testing Emails (Development)

This project uses **Mailtrap** as a sandbox SMTP server. All emails sent during development are caught by Mailtrap and never reach real inboxes.

1. Sign up at [mailtrap.io](https://mailtrap.io)
2. Copy your SMTP credentials into `.env`
3. Trigger a forgot-password flow and check your Mailtrap inbox

---

## 📦 Scripts

```json
{
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---
