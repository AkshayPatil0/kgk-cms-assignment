/** ---- ContentType API Utilities ---- **/

import { handleFetchResponse } from "./api-utils";
import {
  ApiSuccessResponse,
  ContentTypeResponse,
  FetchContentTypesResponse,
} from "./types";

// Fetch all content types
export async function fetchContentTypes(): Promise<FetchContentTypesResponse> {
  const res = await fetch("/api/content-types");

  return handleFetchResponse(res);
}

// Fetch a single content type by ID
export async function fetchContentTypeById(
  id: string
): Promise<ContentTypeResponse> {
  const res = await fetch(`/api/content-types/${id}`);

  return handleFetchResponse(res);
}

// Create a new content type
export async function createContentType(
  name: string
): Promise<ContentTypeResponse> {
  const res = await fetch("/api/content-types", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  return handleFetchResponse(res);
}

// Update an existing content type by ID
export async function updateContentType(
  id: string,
  name: string
): Promise<ContentTypeResponse> {
  const res = await fetch(`/api/content-types/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  return handleFetchResponse(res);
}

// Delete a content type by ID
export async function deleteContentType(
  id: string
): Promise<ApiSuccessResponse<null>> {
  const res = await fetch(`/api/content-types/${id}`, {
    method: "DELETE",
  });

  return handleFetchResponse(res);
}
