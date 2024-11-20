import { ApiException, NotFoundError, ValidationError } from "@/lib/error";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  Content,
  ContentResponse,
} from "./types";

export const mapSuccessResponse = <T>(data: T): ApiSuccessResponse<T> => {
  return {
    data,
    success: true,
  };
};

export const mapErrorResponse = (error: unknown): ApiErrorResponse => {
  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: false,
    error: "Internal server error",
  };
};

export const getStatusFromError = (error: unknown): number => {
  if (error instanceof ValidationError) return 400;
  if (error instanceof NotFoundError) return 404;
  return 500;
};

export const getDefaultErrorResponse = (error: unknown) => {
  return [
    mapErrorResponse(error),
    {
      status: getStatusFromError(error),
    },
  ] as const;
};

// Utility to handle errors in fetch response
export async function handleFetchResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    const data = (await response.json()) as ApiSuccessResponse<T>;
    return data.data;
  } else {
    const errorData = (await response.json()) as ApiErrorResponse;
    throw new ApiException(errorData.error ?? "Http request failed", errorData);
  }
}

export function mapContentResponse(contentRes: ContentResponse): Content {
  return {
    ...contentRes,
    content: contentRes.content && JSON.parse(contentRes.content),
  };
}
