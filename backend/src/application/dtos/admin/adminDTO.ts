
import type { UserStatus,UserRole } from "../../../domain/enums/UserEnums";

export interface IAdminDTO {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface IAdminLoginRequestDTO {
  email: string;
  password: string;
}

export interface IAdminLoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  data: IAdminDTO;
}

export interface IAdminListUsersRequestDTO {
  search?: string;
  status?: string;
  role?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  skip?: number;
  limit?: number;
}


export interface IUserBlockRequestDTO {
  status: UserStatus;
}

