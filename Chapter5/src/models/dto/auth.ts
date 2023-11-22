interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  role: string;
  password: string;
  profile_picture_url: string;
}

export { LoginRequest, RegisterRequest };
