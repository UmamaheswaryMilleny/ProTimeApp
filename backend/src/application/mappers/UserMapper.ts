// src/application/mappers/UserMapper.ts
import { EmailUser, GoogleUser } from "../../domain/entities/User";
import { UserPublicDTO } from "../dtos/user/UserDTO";
// adjust import path if needed

export const toUserPublicDTO = (user: EmailUser | GoogleUser): UserPublicDTO => ({
  id: user.id,
  name: user.name,
  email: user.email.value, // Email VO -> primitive
  role: user.role,
  status: user.status,
  googleId: (user instanceof GoogleUser) ? user.googleId : undefined,
  isNewUser: false,
  createdAt: user.createdAt,
});
