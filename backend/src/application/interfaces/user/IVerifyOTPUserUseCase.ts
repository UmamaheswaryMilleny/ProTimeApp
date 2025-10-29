import { VerifyOtpRequestDTO } from '../../dtos/user/UserDTO';
import { VerifyOtpResponseDTO } from '../../dtos/user/UserDTO';

export interface IVerifyOTPUserUseCase {
  execute(dto: VerifyOtpRequestDTO): Promise<VerifyOtpResponseDTO>;
}
