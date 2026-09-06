# MERN Stack Project

A full-stack web application built with MongoDB, Express, React, and Node.js.

## Getting Started

### Prerequisites
- Node.js installed (v16 or higher recommended)
- [MongoDB Compass](https://www.mongodb.com/products/compass) installed for local database management

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
   Inside the `server` directory, create a `.env` file based on the provided `.env.example`.
   ```bash
   cd server
   cp .env.example .env
   ```
   **Required variables in `.env`:**
   - `PORT`: The port your server runs on (e.g., 5000)
   - `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/mern_stack_db`)
   - `JWT_SECRET`: Secret key for signing authentication tokens
   - `CLOUDINARY_CLOUD_NAME`: Cloudinary service name (for image uploads)
   - `CLOUDINARY_API_KEY`: Cloudinary API Key
   - `CLOUDINARY_API_SECRET`: Cloudinary API Secret

### Running the Application

You will need two terminals to run the frontend and backend simultaneously.

**Start the Server:**
```bash
cd server
npm run dev # or node server.js / npx nodemon server.js
```

**Start the Client:**
```bash
cd client
npm run dev
```

---

## 🗄️ Setting Up the Database (MongoDB Compass)

To get the app working quickly, we use MongoDB Compass and provide mock data for you to use.

### 1. Connect to MongoDB
1. Open **MongoDB Compass**.
2. Create a new connection by pasting your local connection string (usually `mongodb://localhost:27017`) and click **Connect**.
3. In the left sidebar, click the **+** icon (Create Database).
4. Enter the **Database Name** (e.g., `mern_stack_db` – make sure this matches your `MONGO_URI`).
5. Enter a **Collection Name** for your first dataset (e.g., `users`) and click **Create Database**.

### 2. Importing the Mock Data
To provide users with a working environment out of the box, we have included sample JSON files in the `mock-data/` folder in the root directory.

To import this data:
1. In MongoDB Compass, open the database you just created (e.g., `mern_stack_db`) and select the collection (e.g., `users`).
2. Click the **Add Data** button near the top center and select **Import JSON or CSV file**.
3. Browse to the `mock-data` folder in this repository and select the corresponding JSON file (e.g., `users.json`).
4. Select **JSON** as the input format and click **Import**.
5. Repeat this process for any other collections you create (e.g., `opportunities`, `mentorships`) by creating the collection in Compass and importing the corresponding JSON file.

This instantly populates your local database with valid dummy data so you can test all the features of the application locally!

---

## Technologies
- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, Mongoose, JWT Authentication
- **Database:** MongoDB, Cloudinary
