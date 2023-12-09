interface CarRequest {
  name: string;
  cost_per_day: bigint;
  size: string;
  car_picture_url: string;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

export default CarRequest;
