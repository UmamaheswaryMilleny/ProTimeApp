import { Request, Response } from "express";
import { registerUserUseCase } from "../../../config/dependencyInjector";
import { HttpStatusCode } from "../../../application/constants/statusCodes";

export class RegisterController {
  static async register(req: Request, res: Response) {
    try {
      const dto = Rereq.body;
      const result = await registerUserUseCase.execute(dto);
      return res.status(HttpStatusCode.CREATED).json(result);
    } catch (error) {
      console.error("Register error", error);
      if (error instanceof Error) {
        return res
          .status(400)
          .json({ success: false, message: error.message });
      }
    }
  }
}

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
