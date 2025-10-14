import { LoginUserDTO } from "../../dtos/user/LoginUserDTO";
import { User } from "../../entities/User";

export interface ILoginUserUseCase{
    execute(dto:LoginUserDTO):Promise<User>
}