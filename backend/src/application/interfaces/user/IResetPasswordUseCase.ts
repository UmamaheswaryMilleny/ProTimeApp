import { ResetPasswordRequestDTO } from '../../dtos/user/UserDTO';
import { ResetPasswordResponseDTO } from '../../dtos/user/UserDTO';

export interface IResetPasswordUseCase {
  execute(dto: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO>;
}
