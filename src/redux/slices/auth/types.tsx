export interface AuthState {
  jwtToken: string | null;
  refreshToken: string | null;
  userLoginId: string | null;
  loading: boolean;
  error: string | null;
}
