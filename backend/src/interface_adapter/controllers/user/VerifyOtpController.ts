// import { Request, Response, NextFunction } from "express";
// import { verifyOtpUseCase } from "../../../infrastructure/config/dependencies";
// import { VerifyOtpRequestDTO, VerifyOtpResponseDTO } from "../../../application/dtos/user/UserDTO";
// import { HttpStatusCode } from "../../../application/constants/statusCodes";

// export class VerifyOtpController {
// async verifyOtp(req: Request, res: Response, next: NextFunction) {
//     try {
//       const dto = req.body as VerifyOtpRequestDTO;

//       const result: VerifyOtpResponseDTO = await verifyOtpUseCase.execute(dto);

//       logger.info(`VerifyOtpController: OTP verified for ${dto.email}`);

//       return res.status(HttpStatusCode.OK).json(result);
//     } catch (err) {
//       next(err);
//     }
//   }
// }

