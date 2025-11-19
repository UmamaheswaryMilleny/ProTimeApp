import { Request, Response, NextFunction } from "express";
import { adminLoginUseCase } from "../../../infrastructure/config/dependencies";
import { HttpStatusCode } from "../../../application/constants/statusCodes";
import { AdminLoginRequestDTO, AdminLoginResponseDTO } from "../../../application/dtos/admin/adminDTO";

export class AdminController {

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as AdminLoginRequestDTO;
      const result: AdminLoginResponseDTO = await adminLoginUseCase.execute(dto);
      return res.status(HttpStatusCode.OK).json(result);
    } catch (err) {
      return next(err);
    }
  }

}

