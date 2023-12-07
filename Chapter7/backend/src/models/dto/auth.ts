interface RegisterRequest {
  email: string;
  username: string;
  role: string;
  password: string;
  // profile_picture_url: string;
}

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

export { RegisterRequest, AuthGoogle, AuthRequest, AuthResponse };
