import { ResetPasswordDTO } from "../../dtos/user/ResetPasswordDTO";
import { User } from "../../entities/User";

export interface IRegisterUserUseCase {
    execute(dto: ResetPasswordDTO): Promise<User>;
}
