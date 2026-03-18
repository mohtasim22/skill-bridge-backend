# SkillBridge Backend

A RESTful API backend for the SkillBridge tutoring platform, built with Express.js, TypeScript, Prisma, and PostgreSQL.

## 🔗 Live API

**Base URL:** `https://skill-bridge-backend-kappa.vercel.app/api/v1`

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (Neon)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Deployment:** Vercel

## 📁 Project Structure

```
src/
├── generated/
│   └── prisma/          → Prisma generated client
├── lib/
│   └── prisma.ts        → Prisma client instance
├── middlewares/
│   ├── auth.ts          → JWT auth middleware
│   └── globalErrorHandler.ts
├── modules/
│   ├── auth/            → Register, Login
│   ├── user/            → User management
│   ├── tutor/           → Tutor profile management
│   ├── course/          → Course CRUD
│   ├── courseSlot/      → Course slot management
│   ├── booking/         → Booking management
│   ├── review/          → Review & ratings
│   └── admin/           → Admin operations
├── seedAdmin/           → Admin seeder
├── app.ts               → Express app setup
└── server.ts            → Entry point
prisma/
└── schema.prisma        → Database schema
```

## 🗄 Database Schema

Key models: `User`, `TutorProfile`, `Course`, `CourseSlot`, `Booking`, `Review`

User roles: `STUDENT`, `TUTOR`, `ADMIN`

Booking statuses: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`

Review statuses: `APPROVED`, `REJECTED`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon account)

### Installation

```bash
# Clone the repository
git clone https://github.com/mohtasim22/skill-bridge-backend.git
cd skill-bridge-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
```

### Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed admin user (optional)
npm run seed
```

### Run Locally

```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```


## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: <your_jwt_token>
```

Tokens are issued on login and expire in **7 days**.

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Required Environment Variables on Vercel

```
DATABASE_URL=
JWT_SECRET=
NODE_ENV=production
```

## 📦 Scripts

```bash
npm run dev      # Start development server with ts-node-dev
npm run build    # Compile TypeScript to dist/
npm run start    # Run compiled production build
npm run seed     # Seed admin user to database
```

## 👤 Author

**Mohtasim** — [github.com/mohtasim22](https://github.com/mohtasim22)