import { User } from "../../entities/User";
import { RegisterUserDTO } from "../../dtos/user/RegisterUserDTO";

export default interface IRegisterUserUseCase{
       execute(dto:RegisterUserDTO):Promise<User>
}