import { LoginUserDTO } from '../../dtos/user/LoginUserDTO';
import { VerifyOtpResponseDTO } from '../../dtos/user/VerifyOtpResponseDTO';

export interface ILoginUserUseCase {
  execute(dto: LoginUserDTO): Promise<VerifyOtpResponseDTO>;
}
