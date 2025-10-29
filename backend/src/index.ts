// // src/server.ts
// import express from "express";
// import { connectDB } from "./infrastructure/database/connectDB";
// import userRoutes from "./interface-adapters/routes/userRoutes";
// import dotenv from "dotenv"

// dotenv.config()
// const app = express();
// app.use(express.json());
// app.use("/auth", userRoutes);
// const startServer = async () => {
//   const db = new connectDB();
//   await db.connect(); // wait for MongoDB connection
//   const port = process.env.PORT || 5000;
//   app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
// };

// startServer();

// src/index.ts
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/connectDB";
import userRoutes from './interface_adapter/routes/userRoutes'
import { errorHandler } from "./interface_adapter/middleware/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", userRoutes);
app.use(errorHandler)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

