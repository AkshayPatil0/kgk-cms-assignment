/* ------------------------
  Common API types
 ------------------------*/

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

/* ------------------------
  Content API types
 ------------------------*/

// Content entity type
export interface Content {
  id: string;
  title: string;
  slug: string;
  content?: string;
  contentTypeId: string;
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
export type ContentResponse = ApiSuccessResponse<PaginatedResponse<Content>>;

// Type for a paginated list of contents
export type FetchContentsResponse = ApiSuccessResponse<{
  data: Content[];
  total: number;
}>;

/* ------------------------
  Content types API types
 ------------------------*/

// types/contentType.ts

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
export type ContentTypeResponse = ApiSuccessResponse<ContentType>;

// Type for a list of content types
export type FetchContentTypesResponse = ApiSuccessResponse<ContentType[]>;
