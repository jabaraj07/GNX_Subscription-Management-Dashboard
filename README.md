# GNX Project

This repository contains both the backend and frontend applications for the GNX Project.

## Project Overview

The GNX Project is a full-stack application with:
- `Backend/` for user authentication, plan management, and subscription handling.
- `FrontEnd/` for a React + Vite web interface with protected routes and admin access.

The backend exposes REST API routes under `/api`, while the frontend consumes these APIs and provides an authenticated user experience.

## Project Structure

- `Backend/` - Node.js + Express backend
- `FrontEnd/` - React application built with Vite

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, cookie-parser
- Frontend: React, Vite, React Router, Zustand, React Hook Form, Axios, React Toastify
- Validation: Zod
- Deployment: Vercel (frontend) / any Node.js-compatible host for backend

## Backend Features

- User registration and login with JWT authentication
- Refresh token and logout support
- Protected user profile endpoint
- Subscription creation and status checking
- Plan listing for authenticated users
- Admin-only endpoint for viewing all subscriptions

## Frontend Features

- Login and signup forms
- Protected routes for authenticated users
- Role-based access control for admin pages
- Plan browsing and subscription actions
- Built with React, React Router, Zustand, and React Hook Form

## Getting Started

### Backend

1. Open a terminal in `Backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `Backend/.env` file with values like:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   ```
4. Start the backend:
   ```bash
   npm start
   ```

### Frontend

1. Open a terminal in `FrontEnd/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## API Base URL

If the backend runs on port `5000`, the base API URL is:

```text
http://localhost:5000/api
```

## Postman Route Details

### Authentication

- `POST /api/auth/register`
  - Body: `{ "username": "user", "email": "user@example.com", "password": "pass123" }`
  - Registers a new user.

- `POST /api/auth/login`
  - Body: `{ "email": "user@example.com", "password": "pass123" }`
  - Returns access token and refresh token cookies.

- `POST /api/logout`
  - Requires authentication.
  - Logs out the user and clears cookies.

- `POST /api/refresh`
  - Refreshes the JWT access token using stored refresh token.

- `GET /api/me`
  - Requires authentication.
  - Returns the current authenticated user profile.

### Plans

- `GET /api/plans`
  - Requires authentication.
  - Returns the available plans.

### Subscriptions

- `POST /api/subscribe/:planId`
  - Requires authentication.
  - Subscribes the current user to the plan with the given `planId`.

- `GET /api/my-subscription`
  - Requires authentication.
  - Requires an active subscription.
  - Returns the current user subscription details.

### Admin

- `GET /api/admin/subscriptions`
  - Requires authentication and admin role.
  - Returns all subscriptions for admin review.

## Notes

- Ensure `CLIENT_URL` in `Backend/.env` matches the frontend origin (for example `http://localhost:5173`).
- If using Postman, enable cookie support to preserve authenticated sessions for protected routes.
- The frontend app should be started after the backend is running.

## Maintainer

- Name: `jebaraj k`
- Contact: https://github.com/jabaraj07
- Email: raj07.182000@gmail.com
