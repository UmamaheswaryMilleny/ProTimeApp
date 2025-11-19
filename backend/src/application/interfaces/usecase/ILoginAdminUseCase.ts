// src/application/interfaces/usecase/ILoginAdminUseCase.ts
import { AdminLoginRequestDTO,AdminLoginResponseDTO } from "../../dtos/admin/adminDTO";

export interface ILoginAdminUseCase {
  execute(dto: AdminLoginRequestDTO): Promise<AdminLoginResponseDTO>;
}
