# Fitness App (Public Version)

## Overview
The Fitness App is a web application designed to help users create personalized workout plans and explore a library of exercises. It consists of a Next.js frontend and an Express.js backend, with MongoDB as the database. This public repository excludes `node_modules` and `.env` files for security and size reasons.

### Features
- **Workout Planner**: Generate a 7-day workout plan based on user goals, difficulty level, age, weight, and muscle group preferences.
- **Exercise Library**: Browse exercises organized by muscle group and difficulty level.
- **Responsive Design**: A modern, user-friendly interface built with Next.js and styled with CSS.

### Tech Stack
- **Frontend**: Next.js, React, TypeScript, Axios
- **Backend**: Express.js, Mongoose, MongoDB
- **Deployment**: Vercel (Frontend), Local/Server (Backend)

## Installation

### Prerequisites
- **Node.js**: Version 18.x or higher
- **MongoDB**: A MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- **Git**: To clone the repository

### Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/shantanu-ingle/fitness-app-public.git
cd fitness-app-public
```
```bash
cd frontend         # Navigate to frontend directory
npm install         # Install frontend dependencies
npm run dev         # Start frontend development server

cd backend          # Navigate to backend directory
npm install         # Install backend dependencies
```
#### Now, create a .env file inside the backend/ directory and add your MongoDB connection string:
MONGO_URI=your-mongodb-connection-string

```bash
npm start
```
