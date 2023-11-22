interface CarRequest {
  id: number;
  name: string;
  price: string;
  car_foto_url?: Express.Multer.File;
}

interface CarResponse {
  id: number;
  name: string;
  price: string;
  car_foto_url?: string;
}

export { CarRequest, CarResponse };
