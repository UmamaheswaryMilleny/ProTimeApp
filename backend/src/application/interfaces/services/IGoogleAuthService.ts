export interface IGoogleAuthService {
  verifyGoogleToken(idToken: string): Promise<{
    email: string;
    name: string;
    picture?: string;
    googleId: string;
  }>;
}
