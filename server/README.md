# Project2 API

Simple Node/Express API to record contact and newsletter submissions to MongoDB.

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI`.
2. Install dependencies: `npm install`.
3. Start server: `npm run dev` (requires `nodemon`) or `npm start`.

Endpoints:
- POST /api/contact  --> Save contact form submissions
- POST /api/newsletter --> Save newsletter signups

Note: Make sure CORS is acceptable for your front-end origin (default configuration allows all origins).