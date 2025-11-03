import { Request, Response, NextFunction } from "express";
import { registerUseCase,logger } from "../../../infrastructure/config/dependencies";
import { RegisterUserDTO,RegisterResponseDTO } from "../../../application/dtos/user/UserDTO";
import { HttpStatusCode } from "../../../application/constants/statusCodes";

export class AuthController {
  // POST /api/auth/register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // Request body already validated by validateRequest middleware
      const dto = req.body as RegisterUserDTO;

      const result: RegisterResponseDTO = await registerUseCase.execute(dto);

      // If OTP required, registration returns isOtpRequired true
      const status = result.isOtpRequired ? HttpStatusCode.CREATED : HttpStatusCode.CREATED;

      logger.info(`RegisterController: registration result for ${dto.email}: ${result.message}`);

      return res.status(status).json(result);
    } catch (err) {
      return next(err);
    }
  }
}

























// // src/interface-adapters/controllers/user/AuthController.ts
// import { Request, Response } from "express";
// import { RegisterUserUseCase } from "../../../application/usecases/user/RegisterUserUseCase";
// import { VerifyOTPUserUseCase } from "../../../application/usecases/user/VerifyOTPUserUseCase";
// import { LoginUserUseCase } from "../../../application/usecases/user/LoginUserUseCase";
// import { ForgotPasswordUseCase } from "../../../application/usecases/user/ForgotPasswordUseCase";
// import { ResetPasswordUseCase } from "../../../application/usecases/user/ResetPasswordUseCase";

// export class AuthController {
//   constructor(
//     private registerUserUseCase: RegisterUserUseCase,
//     private verifyOtpUseCase: VerifyOTPUserUseCase,
//     private loginUserUseCase: LoginUserUseCase,
//     private forgotPasswordUseCase: ForgotPasswordUseCase,
//     private resetPasswordUseCase: ResetPasswordUseCase
//   ) {}

//   register = async (req: Request, res: Response) => {
//     try {
//       const result = await this.registerUserUseCase.execute(req.body);
//       res.status(200).json(result);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   verifyOtp = async (req: Request, res: Response) => {
//     try {
//       const result = await this.verifyOtpUseCase.execute(req.body);
//       res.status(200).json(result);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   login = async (req: Request, res: Response) => {
//     try {
//       const result = await this.loginUserUseCase.execute(req.body);
//       res.status(200).json(result);
//     } catch (error: any) {
//       res.status(401).json({ error: error.message });
//     }
//   };

//   forgotPassword = async (req: Request, res: Response) => {
//     try {
//       const result = await this.forgotPasswordUseCase.execute(req.body);
//       res.status(200).json(result);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   resetPassword = async (req: Request, res: Response) => {
//     try {
//       const result = await this.resetPasswordUseCase.execute(req.body);
//       res.status(200).json(result);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   };
// }
