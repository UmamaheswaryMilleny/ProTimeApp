import { User } from "../../../domain/entities/User";
import { UserPublicDTO } from "../../dtos/user/UserDTO";
import { GoogleUser } from "../../../domain/entities/User";

export const toUserPublicDTO = (user: User): UserPublicDTO => ({
  id: user.id.value,
  name: user.name,
  email: user.email.value, 
  role: user.role,
  status: user.status,
  isVerified:user.isVerified,
  provider:user.provider,
  googleId:  user instanceof GoogleUser ? user.googleId : undefined,
  createdAt: user.createdAt,
  
});


