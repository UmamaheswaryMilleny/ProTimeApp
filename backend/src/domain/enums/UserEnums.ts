export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum OtpPurpose {   REGISTER= 'register',
  RESET = 'reset'}

export enum Provider {
  LOCAL = "local",
  GOOGLE = "google",
}
