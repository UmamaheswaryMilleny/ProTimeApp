import { VerifyOtpDTO } from '../../dtos/user/VerifyOtpDTO';
import { VerifyOtpResponseDTO } from '../../dtos/user/VerifyOtpResponseDTO';

export interface IVerifyOTPUserUseCase {
  execute(dto: VerifyOtpDTO): Promise<VerifyOtpResponseDTO>;
}
