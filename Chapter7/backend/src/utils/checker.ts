import { ErrorResponse } from "../models/dto/default";

function isErrorType(object: any): object is ErrorResponse {
  return "httpCode" in object && "message" in object;
}

export { isErrorType };
