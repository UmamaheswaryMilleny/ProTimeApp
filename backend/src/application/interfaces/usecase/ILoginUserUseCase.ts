import { LoginUserDTO,LoginResponseDTO } from '../../dtos/user/UserDTO';


export interface ILoginUserUseCase {
  execute(dto: LoginUserDTO): Promise<LoginResponseDTO>;
}
