import { ForgotPasswordRequestDTO } from "../../dtos/user/UserDTO";

export interface IForgotPasswordUseCase {
  execute(dto: ForgotPasswordRequestDTO): Promise<{ message: string }>;
}
