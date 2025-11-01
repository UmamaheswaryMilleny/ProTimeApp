// Zod is a TypeScript-first validation library.It lets you define schemas for what your data should look like, and automatically:
// Checks if the input is valid Returns detailed errors if not
// So before data enters your domain (like User.create()),we validate it in the application layer using Zod schemas.

import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(20).regex(/[A-Z]/, "Must contain uppercase letter")
             .regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string().min(8)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

export const LoginUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const VerifyOtpSchema = z.object({
  email: z.string().trim().email(),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});