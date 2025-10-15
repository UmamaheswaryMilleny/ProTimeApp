import { ForgotPasswordDTO } from '../../dtos/user/ForgotPasswordDTO';

export interface IForgotPasswordUseCase {
  execute(dto: ForgotPasswordDTO): Promise<{message:string}>;
}
