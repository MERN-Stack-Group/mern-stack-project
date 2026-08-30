# MERN Stack Project

A full-stack web application built with MongoDB, Express, React, and Node.js.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB connection string (local or Atlas)

### Setup

1. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the `server` directory and configure required variables like your MongoDB URI, JWT secret, and Cloudinary keys.

### Running the Application

You will need two terminals to run the frontend and backend simultaneously.

**Start the Server:**
```bash
cd server
npx nodemon server.js  # or node server.js
```

**Start the Client:**
```bash
cd client
npm run dev
```

## Technologies
- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, Mongoose, JWT Authentication
