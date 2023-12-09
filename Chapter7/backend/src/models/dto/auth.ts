interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: String;
}

interface AuthGoogle {
  credential: string;
  clientId: string;
}

export { AuthRequest, AuthResponse, AuthGoogle };
