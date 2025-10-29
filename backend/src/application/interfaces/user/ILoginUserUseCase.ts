import { LoginUserDTO } from '../../dtos/user/UserDTO';
import { VerifyOtpResponseDTO } from '../../dtos/user/UserDTO';

export interface ILoginUserUseCase {
  execute(dto: LoginUserDTO): Promise<VerifyOtpResponseDTO>;
}
