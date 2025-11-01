// application/interfaces/IAuthService.ts
import { LoginUserDTO } from "../../dtos/user/UserDTO";
import { LoginResponseDTO } from "../../dtos/user/UserDTO";
import { AuthTokensDTO } from "../../dtos/user/UserDTO";

export interface IAuthService {
  loginUser(data: LoginUserDTO): Promise<LoginResponseDTO>;
  refreshToken(refreshToken:string):Promise<AuthTokensDTO>
}
