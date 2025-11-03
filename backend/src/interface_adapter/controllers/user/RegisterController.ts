// // src/interface-adapters/controllers/auth/RegisterController.ts
// import { Request, Response, NextFunction, Router } from "express";
// import { RegisterUseCase } from "../../../application/use-cases/user/RegisterUseCase";
// import { RegisterUserSchema } from "../../../application/validators/UserValidator";
// import { ILogger } from "../../../application/interfaces/ILogger";
// import { ResponseMessages } from "../../../application/constants/ResponseMessages";
// import { HttpStatusCode } from "../../../application/constants/statusCodes";
// import { RegisterUserDTO } from "../../../application/dtos/user/UserDTO";

// /**
//  * RegisterController class wraps route handler(s).
//  * - Validates input via Zod
//  * - Calls the RegisterUseCase
//  * - Returns appropriate HTTP response codes/messages
//  */
// export class RegisterController {
//   public router: Router;

//   constructor(private registerUseCase: RegisterUseCase, private logger: ILogger) {
//     this.router = Router();
//     this.router.post("/register", this.register.bind(this));
//   }

//   async register(req: Request, res: Response, next: NextFunction) {
//     try {
//       // Validate incoming request body using Zod schema
//       const parsed = RegisterUserSchema.parse(req.body);

//       // Build DTO matching application DTO shape
//       const dto: RegisterUserDTO = {
//         name: parsed.name,
//         email: parsed.email,
//         password: parsed.password,
//         confirmPassword: parsed.confirmPassword,
//         googleId: parsed.googleId,
//         provider: parsed.provider ?? undefined,
//       };

//       // Execute use case
//       const result = await this.registerUseCase.execute(dto as any);

//       // registerUseCase returns RegisterResponseDTO in your implementation (message + isOtpRequired)
//       // If the use case returned a UserPublicDTO directly instead, adapt response accordingly.
//       return res.status(HttpStatusCode.CREATED).json({
//         message: (result as any).message ?? ResponseMessages.RegistrationSuccess,
//         data: (result as any).data ?? null,
//         isOtpRequired: (result as any).isOtpRequired ?? false,
//       });
//     } catch (err: any) {
//       // Zod validation error
//       if (err?.name === "ZodError") {
//         this.logger.warn("Validation failed for register request");
//         return res.status(HttpStatusCode.BAD_REQUEST).json({
//           message: ResponseMessages.InvalidRegistrationData,
//           details: err.errors,
//         });
//       }

//       // Domain errors (e.g., UserAlreadyExistError, InvalidEmailError, etc.) inherit DomainError
//       // They can be handled here — we send a 400/409 depending on type; for now send 400
//       this.logger.error("Register request failed", err);
//       if (err?.name === "UserAlreadyExistError") {
//         return res.status(HttpStatusCode.CONFLICT).json({ message: ResponseMessages.EmailAlreadyInUse });
//       }

//       // Generic fallback
//       return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//         message: ResponseMessages.RegistrationFailed,
//       });
//     }
//   }
// }









// import { Request, Response } from "express";
// import { registerUserUseCase } from "../../../config/dependencyInjector";
// import { HttpStatusCode } from "../../../application/constants/statusCodes";

// export class RegisterController {
//   static async register(req: Request, res: Response) {
//     try {
//       const dto = req.body;
//       const result = await registerUserUseCase.execute(dto);
//       return res.status(HttpStatusCode.CREATED).json(result);
//     } catch (error) {
//       console.error("Register error", error);
//       if (error instanceof Error) {
//         return res
//           .status(400)
//           .json({ success: false, message: error.message });
//       }
//     }
//   }
// }

// import { Request, Response, NextFunction } from "express";
// import { RegisterUserUseCase } from "../../../application/use-cases/user/RegisterUserUseCase";
// import { RegisterUserDTO } from "../../../application/dtos/user/RegisterUserDTO";

// export class RegisterController {
//   constructor(private registerUserUseCase: RegisterUserUseCase) {}

//   async handle(req: Request, res: Response, next: NextFunction) {
//     try {
//       const dto = new RegisterUserDTO(req.body);
//       const result = await this.registerUserUseCase.execute(dto);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       next(error);
//     }
//   }
// }
