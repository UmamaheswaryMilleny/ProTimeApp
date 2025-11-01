export enum ResponseMessages {
  // AUTH / REGISTRATION
  RegistrationSuccessEmail = "Registration successful. Please verify your email.",
  RegistrationSuccessGoogle = "Registration successful",
  RegistrationFailed = "Registration failed. Please try again.",
  EmailAlreadyInUse = "Email is already registered.",
  InvalidRegistrationData = "Invalid registration data.",

  LoginSuccess = "Login successful",
  LoginFailed = "Invalid email or password",
  LogoutSuccess = "Logged out successfully",
  Unauthorized = "Unauthorized: No token provided",

  // TOKENS
  NoRefreshToken = "Unauthorized: No refresh token provided",
  AccessTokenRefreshed = "New access token generated successfully",
  InvalidRefreshToken = "Unauthorized: Invalid refresh token",

  // OTP
  OtpVerified = "OTP verified successfully",
  OtpHasBeenSent = "OTP has been sent. Please check your email.",
  InvalidVerificationCode = "Invalid verification code",
  VerificationCodeExpired = "Verification code has expired",

  // USER
  UserNotFound = "User not found",
  UserAlreadyExists = "User already in use",
  UserRetrieved = "User retrieved successfully",
  UserCreated = "User created successfully",
  ProfileUpdated = "Profile updated successfully",
  UserBlocked = "User has been blocked",
  UserStatusUpdated = "User status updated",
  PasswordUpdatedSuccess = "Password updated successfully",
  FetchedUsers = "Users fetched successfully",

  // ADMIN
  AdminNotFound = "Admin not found",

  // ERRORS
  Forbidden = "Access denied",
  BadRequest = "Invalid request data",
  InternalServerError = "Internal server error",
}
