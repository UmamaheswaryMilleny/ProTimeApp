import { Router } from "express";
import { AuthController } from "../controllers/user/AuthController";
import { validateRequest } from "../middleware/validateRequest";
import { RegisterUserSchema } from "../../application/validators/UserValidator";
import { VerifyOtpSchema } from "../../application/validators/UserValidator";
import { LoginUserSchema } from "../../application/validators/UserValidator";
import { ForgotPasswordSchema } from "../../application/validators/UserValidator";
import { ResetPasswordSchema } from "../../application/validators/UserValidator";


const router = Router();
const controller = new AuthController();

// POST /api/auth/register
router.post("/register", validateRequest(RegisterUserSchema), (req, res, next) =>
  controller.register(req, res, next)
);

router.post("/verify-otp", validateRequest(VerifyOtpSchema), (req, res, next) =>
  controller.verifyOtp(req, res, next)
);

router.post("/login", validateRequest(LoginUserSchema), (req, res, next) =>
  controller.login(req, res, next)
);

router.post(
  "/forgot-password",
  validateRequest(ForgotPasswordSchema),
  (req, res, next) => controller.forgotPassword(req, res, next)
);


router.post(
  "/reset-password",
  validateRequest(ResetPasswordSchema),
  (req, res, next) => controller.resetPassword(req, res, next)
);
export { router as authRoutes };
