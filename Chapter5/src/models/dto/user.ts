interface UserRequest {
  name: string;
  email: string;
  role: string;
  profile_picture_file?: Express.Multer.File;
}

export { UserRequest };
