import { Router } from "express";
import { AuthController } from "../controllers/user/AuthController";
import { validateRequest } from "../middleware/validateRequest";
import { RegisterUserSchema } from "../../application/validators/UserValidator";

const router = Router();
const controller = new AuthController();

// POST /api/auth/register
router.post("/register", validateRequest(RegisterUserSchema), (req, res, next) =>
  controller.register(req, res, next)
);

export { router as authRoutes };
