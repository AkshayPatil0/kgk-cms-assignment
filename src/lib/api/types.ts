/* ------------------------
  Common API types
 ------------------------*/

import { RichTextContent } from "@/components/rich-text-editor/types";

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SortingParams {
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface RouteParams<T> {
  params: Promise<T>;
}

/* ------------------------
  Content API types
 ------------------------*/

// Content entity type
export interface Content {
  id: string;
  title: string;
  slug: string;
  content?: RichTextContent;
  contentTypeId: string;
  contentType: ContentType;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Request types

// Type for creating new content
export interface CreateContentRequest {
  title: string;
  slug: string;
  contentTypeId: string;
  content?: string;
}

// Type for updating existing content (partial fields allowed)
export interface UpdateContentRequest {
  title?: string;
  slug?: string;
  content?: string;
  contentTypeId?: string;
  published?: boolean;
}

// Type for fetching multiple contents with filters, pagination, and sorting
export interface FetchContentsRequest extends PaginationParams, SortingParams {
  title?: string;
  published?: boolean;
  contentTypeId?: string;
}

// Response types

// Type for a single content response
export type ContentResponse = Omit<Content, "content"> & { content?: string };

// Type for a paginated list of contents
export type FetchContentsResponse = PaginatedResponse<ContentResponse>;

/* ------------------------
  Content types API types
 ------------------------*/

// ContentType entity type
export interface ContentType {
  id: string;
  name: string;
  slug: string;
}

// Request types

// Type for creating new content type
export interface CreateContentTypeRequest {
  name: string;
}

// Type for updating existing content type
export interface UpdateContentTypeRequest {
  name: string;
}

// Response types

// Type for a single content type response
export type ContentTypeResponse = ContentType;

// Type for a list of content types
export type FetchContentTypesResponse = ContentType[];
