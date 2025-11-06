// Zod is a TypeScript-first validation library.It lets you define schemas for what your data should look like, and automatically:
// Checks if the input is valid Returns detailed errors if not
// So before data enters your domain (like User.create()),we validate it in the application layer using Zod schemas.
import { Provider } from "../../domain/enums/UserEnums";
import { z } from "zod";

// export const RegisterUserSchema = z.object({
//   name: z.string().min(2).max(50),
//   email: z.string().email(),
//   password: z.string().min(8).max(20).regex(/[A-Z]/, "Must contain uppercase letter")
//              .regex(/[0-9]/, "Must contain a number"),
//   confirmPassword: z.string().min(8)
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
// });

export const RegisterUserSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    provider: z.nativeEnum(Provider).default(Provider.LOCAL),
    googleId: z.string().optional(),
  })
  .refine(
    (data) => {
      // For local provider: both password and confirmPassword required
      if (data.provider === Provider.LOCAL) {
        return (
          typeof data.password === "string" &&
          data.password.length >= 8 &&
          data.confirmPassword === data.password
        );
      }
      // For Google provider: skip password validation
      if (data.provider === Provider.GOOGLE) {
        return !!data.googleId;
      }
      return true;
    },
    {
      message:
        "For LOCAL provider, password and confirmPassword must match. For GOOGLE provider, googleId is required.",
      path: ["provider"],
    }
  );

// export const LoginUserSchema = z.object({
//   email: z.string().trim().email(),
//   password: z.string().min(1),
// });

export const LoginUserSchema = z
  .object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().optional(),
    provider: z.nativeEnum(Provider).default(Provider.LOCAL),
    googleId: z.string().optional(),
  })
  .refine(
    (data) => {
      // For LOCAL login → require password
      if (data.provider === Provider.LOCAL) {
        return typeof data.password === "string" && data.password.length > 0;
      }

      // For GOOGLE login → require googleId
      if (data.provider === Provider.GOOGLE) {
        return !!data.googleId;
      }

      return false;
    },
    {
      message:
        "For LOCAL login, password is required. For GOOGLE login, googleId is required.",
      path: ["provider"],
    }
  );

export const VerifyOtpSchema = z.object({
  email: z.string().trim().email(),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});


export const ForgotPasswordSchema = z.object({
  email: z.string().email("Valid email required"),
});

export  const ResetPasswordSchema = z
  .object({
    email: z.string().email("Valid email required"),
    otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
    newPassword: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Must include uppercase letter")
      .regex(/[a-z]/, "Must include lowercase letter")
      .regex(/\d/, "Must include number")
      .regex(/[@$!%*?&]/, "Must include special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });