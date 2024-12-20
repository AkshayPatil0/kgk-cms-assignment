/** ---- Content API Utilities ---- **/

import { handleFetchResponse } from "./api-utils";
import {
  ApiSuccessResponse,
  ContentResponse,
  FetchContentsRequest,
  FetchContentsResponse,
  UpdateContentRequest,
} from "./types";

// Fetch all contents with optional filters, sorting, and pagination
export async function fetchContents(params: FetchContentsRequest = {}) {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const res = await fetch(`/api/contents?${query}`);

  return handleFetchResponse<FetchContentsResponse>(res);
}

// Fetch a single content item by ID
export async function fetchContentById(id: string): Promise<ContentResponse> {
  const res = await fetch(`/api/contents/${id}`);

  return handleFetchResponse(res);
}

// Create a new content
export async function createContent(data: {
  title: string;
  slug: string;
  contentTypeId: string;
  content?: string;
}): Promise<ContentResponse> {
  const res = await fetch("/api/contents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleFetchResponse(res);
}

// Update an existing content by ID
export async function updateContent(
  id: string,
  data: UpdateContentRequest
): Promise<ContentResponse> {
  const res = await fetch(`/api/contents/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleFetchResponse(res);
}

// Delete a content by ID
export async function deleteContent(
  id: string
): Promise<ApiSuccessResponse<null>> {
  const res = await fetch(`/api/contents/${id}`, {
    method: "DELETE",
  });

  return handleFetchResponse(res);
}
