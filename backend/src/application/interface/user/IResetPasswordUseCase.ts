import { ResetPasswordDTO } from '../../dtos/user/ResetPasswordDTO';
import { ResetPasswordResponseDTO } from '../../dtos/user/ResetPasswordResponseDTO';

export interface IResetPasswordUseCase {
  execute(dto: ResetPasswordDTO): Promise<ResetPasswordResponseDTO>;
}
