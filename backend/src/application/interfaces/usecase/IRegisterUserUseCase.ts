import { RegisterUserDTO} from "../../dtos/user/UserDTO";
import { RegisterResponseDTO } from "../../dtos/user/UserDTO";

export interface IRegisterUserUseCase {
  execute(dto: RegisterUserDTO): Promise<RegisterResponseDTO>;
  // execute(dto: RegisterUserDTO): Promise<{ success: boolean; message: string }>;
}
