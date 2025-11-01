import { ForgotPasswordRequestDTO,ForgotPasswordResponseDTO } from "../../dtos/user/UserDTO";

export interface IForgotPasswordUseCase {
  execute(dto: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO>;
}
