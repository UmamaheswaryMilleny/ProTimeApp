// // src/interface-adapters/routes/userRoutes.ts
// import { Router } from "express";
// import { AuthController } from "../controllers/user/AuthController";
// import { container } from "../di/container";

// const router = Router();
// const authController = container.resolve<AuthController>("authController");

// router.post("/register", authController.register);
// router.post("/verify-otp", authController.verifyOtp);
// router.post("/login", authController.login);
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password", authController.resetPassword);

// export default router;
// src/interface-adapters/routes/authRoutes.ts
// import { Router } from "express";
// import { AuthController } from "../controllers/user/AuthController";
// import { validateRequest } from "../middleware/validateRequest";
// import { RegisterUserSchema } from "../../application/validators/UserValidator";

// const router = Router();
// const controller = new AuthController();

// // POST /api/auth/register
// router.post(
//   "/register",
//   validateRequest(RegisterUserSchema),
//   (req, res, next) => controller.register(req, res, next)
// );

// export { router as authRoutes };

