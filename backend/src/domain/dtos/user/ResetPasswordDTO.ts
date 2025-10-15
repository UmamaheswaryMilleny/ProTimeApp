export interface ResetPasswordDTO {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}
