interface CarRequest {
  id: number;
  name: string;
  price: string;
  car_foto_url?: Express.Multer.File;
  created_by_id?: number;
  updated_by_id?: number;
  deleted_by_id?: number;
  deleted_at: Date;
}

// interface CarResponse {
//   id: number;
//   name: string;
//   price: string;
//   car_foto_url?: string;
//   created_by_id?: UserResponse;
//   updated_by_id?: UserResponse;
//   deleted_by_id?: UserResponse;
//   deleted_at?: Date;
// }

export { CarRequest };
