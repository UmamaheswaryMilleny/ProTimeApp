// import type { Request, Response, NextFunction } from "express";
// import { HttpStatusCode } from "../../../../domain/enums/constants/status-codes.js";
// import { ResponseMessages } from "../../../../domain/enums/constants/response-messages.js";
// import { ApiResponse } from "../../../common/api-response.js";
// import env from  "../../../infrastructure/config/env.js"
// import type { ILoginUserUseCase } from "../../../application/interfaces/user/ILoginUserUseCase.js";

// export class LoginController {
//   constructor(private readonly loginUserUseCase: ILoginUserUseCase) {}

//   handle = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { accessToken, refreshToken, data } =
//         await this.loginUserUseCase.execute(req.body);

//       res.cookie("accessToken", accessToken, {
//         httpOnly: true,
//         maxAge: env.jwt.access_expires,
//         sameSite: "strict",
//         secure: env.node_env,
//       });

//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: env.jwt.refresh_expires,
//         sameSite: "strict",
//         secure: env.node_env,
//       });

//       res
//         .status(HttpStatusCode.OK)
//         .json(ApiResponse.success(ResponseMessages.LoginSuccess, data));
//     } catch (error) {
//       next(error);
//     }
//   };
// }
