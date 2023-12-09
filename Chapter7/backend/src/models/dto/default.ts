interface DefaultResponse {
  status: string;
  message: string;
  data: any;
}

interface ErrorResponse {
  httpCode: number;
  message: string;
}

export { DefaultResponse, ErrorResponse };
