
import { z } from "zod";



export const LoginAdminSchema = z
  .object({
    email: z.string().trim().email("Invalid email address"),
     password: z.string().min(8).max(20).regex(/[A-Z]/, "Must contain uppercase letter")
             .regex(/[0-9]/, "Must contain a number"),
  })
  

