import { queryOptions } from "@tanstack/react-query";
import { fetchContentTypes } from "../api/content-type";
import { fetchContentById, fetchContents } from "../api/content";
import { FetchContentsRequest } from "../api/types";

export const getContentTypesOptions = () =>
  queryOptions({
    queryKey: ["content-types"],
    queryFn: async () => fetchContentTypes(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export const getContentsOptions = (params: FetchContentsRequest) =>
  queryOptions({
    queryKey: ["contents", params],
    queryFn: async () => fetchContents(params),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export const getContentByIdOptions = (id: string) =>
  queryOptions({
    queryKey: ["content-by-id", id],
    queryFn: async () => fetchContentById(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
