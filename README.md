# Fitness App

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


#### Sample Images
![Screenshot 2025-05-28 171114](https://github.com/user-attachments/assets/d4e3ff10-b562-48ae-89fc-b550b98bedc2)
![Screenshot 2025-05-28 171125](https://github.com/user-attachments/assets/bfbfc889-49bc-4de7-b900-3afc745eb6f6)
![Screenshot 2025-05-28 171136](https://github.com/user-attachments/assets/32093b04-4dec-4f44-bc18-93c23d01ea68)
![Screenshot 2025-05-28 171146](https://github.com/user-attachments/assets/c919ed58-1671-4fe9-a302-6008e1faa0eb)
![Screenshot 2025-05-28 171159](https://github.com/user-attachments/assets/43d9d188-14c2-4734-b01e-02fb49638a4f)
![Screenshot 2025-05-28 171213](https://github.com/user-attachments/assets/da00c400-e7c8-4200-ba8c-ab07d0c88606)
![Screenshot 2025-05-28 171239](https://github.com/user-attachments/assets/6198ad15-a004-4a71-90f5-3309ed7d3b48)
