import { RegisterUserDTO } from '../../dtos/user/RegisterUserDTO';

export interface IRegisterUserUseCase {
  execute(dto: RegisterUserDTO): Promise<{ success: boolean; message: string }>;
}
