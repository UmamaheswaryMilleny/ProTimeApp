import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authRoutes } from "./interface_adapter/routes/authRoutes";
import { errorHandler } from "./interface_adapter/middleware/errorHandler";
import { connectDB } from "./infrastructure/database/connectDB";
import { logger } from "./infrastructure/config/dependencies";
import { adminRoutes } from "./interface_adapter/routes/adminRoutes";

import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet())

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

export async function startServer() {
  try {
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


