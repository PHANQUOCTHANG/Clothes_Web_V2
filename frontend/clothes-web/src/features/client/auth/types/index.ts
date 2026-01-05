export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
