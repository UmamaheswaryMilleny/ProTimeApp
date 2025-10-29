import { RegisterUserDTO } from "../../dtos/user/UserDTO";

export interface IRegisterUserUseCase {
  execute(dto: RegisterUserDTO): Promise<{ success: boolean; message: string }>;
}
