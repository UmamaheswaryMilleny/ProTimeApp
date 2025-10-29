import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const VerifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});
