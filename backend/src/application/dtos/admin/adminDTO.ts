
import type { UserStatus,UserRole } from "../../../domain/enums/UserEnums";

export interface AdminPublicDTO {
 id: string;
  name: string;
  email: string;
  role: UserRole.ADMIN;
  status: UserStatus.ACTIVE;
  createdAt: Date;
}

export interface AdminLoginRequestDTO {
  email: string;
  password: string;

}

export interface AdminLoginResponseDTO {
data: AdminPublicDTO;
  message?: string;
     accessToken: string;
  refreshToken: string;
}

// export interface IAdminListUsersRequestDTO {
//   search?: string;
//   status?: string;
//   role?: string;
//   sortField?: string;
//   sortOrder?: "asc" | "desc";
//   skip?: number;
//   limit?: number;
// }


// export interface IUserBlockRequestDTO {
//   status: UserStatus;
// }

