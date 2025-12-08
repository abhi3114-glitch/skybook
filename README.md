# SkyBook - Hotel Booking Platform

A full-stack hotel booking application inspired by Booking.com. Built with the MERN stack (MongoDB, Express.js, React, Node.js) using TypeScript.

## Features

- User authentication (register, login, JWT tokens)
- Hotel browsing with search and filters
- Detailed hotel pages with image galleries
- Room selection and booking
- Booking management (view, cancel)
- Responsive dark theme UI with glassmorphism design

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- React Router for navigation
- Axios for API requests
- Custom CSS with glassmorphism effects

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
skybook/
├── backend/
│   ├── src/
│   │   ├── models/         # Mongoose models (Hotel, User, Booking)
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── server.ts       # Express server entry
│   │   └── seed.ts         # Database seed script
│   ├── .env.example        # Environment template
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── context/        # React context (Auth)
    │   ├── services/       # API service layer
    │   └── types/          # TypeScript interfaces
    ├── index.html
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure `.env` with your settings:
   ```
   MONGODB_URI=mongodb://localhost:27017/skybook
   JWT_SECRET=your-secret-key-here
   PORT=5000
   CORS_ORIGIN=http://localhost:5173
   NODE_ENV=development
   ```

5. Seed the database with sample hotels:
   ```bash
   npx ts-node src/seed.ts
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile

### Hotels
- `GET /api/hotels` - List all hotels (with filters)
- `GET /api/hotels/:id` - Get hotel details

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - Get user bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking

## Environment Variables

| Variable | Description |
|----------|-------------|
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| PORT | Backend server port (default: 5000) |
| CORS_ORIGIN | Frontend URL for CORS |
| NODE_ENV | Environment (development/production) |

## License

MIT