import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { authRoutes } from "./interface_adapter/routes/authRoutes";
import { errorHandler } from "./interface_adapter/middleware/errorHandler";
import { connectDB } from "./infrastructure/database/connectDB";
import { logger } from "./infrastructure/config/dependencies";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors());
app.use(json());

// health
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// mount auth routes
app.use("/api/auth", authRoutes);

// global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// bootstrap function (so tests can import without auto-start)
export async function startServer() {
  try {
    // connect DB
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
}

// if run directly, start
if (require.main === module) {
  startServer();
}

export default app;



// src/index.ts
// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./infrastructure/database/connectDB";
// import userRoutes from './interface_adapter/routes/userRoutes'
// import { errorHandler } from "./interface_adapter/middleware/errorHandler";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // connect DB
// connectDB();

// // routes
// app.use("/api/auth", userRoutes);
// app.use(errorHandler)

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

