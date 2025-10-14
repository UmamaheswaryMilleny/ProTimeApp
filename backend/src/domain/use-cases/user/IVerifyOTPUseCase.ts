import { VerifyOtpDTO } from "../../dtos/user/VerifyOtpDTO";
import { User } from "../../entities/User";

export interface IVerifyUserUseCase{
    execute(dto:VerifyOtpDTO):Promise<User>
}