import { ApiErrorResponse } from "./api/types";

export function withError<T>(op: () => T) {
  try {
    const result = op();
    return [null, result] as const;
  } catch (error) {
    return [error as Error, null] as const;
  }
}

export class ValidationError extends Error {}
export class NotFoundError extends Error {}

export class ApiException extends Error {
  constructor(public message: string, public data: ApiErrorResponse) {
    super(message);
  }
}
