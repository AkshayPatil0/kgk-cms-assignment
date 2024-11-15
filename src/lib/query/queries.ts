import { queryOptions } from "@tanstack/react-query";
import { fetchContentTypes } from "../api/content-type";

export const getContentTypesOptions = () =>
  queryOptions({
    queryKey: ["content-types"],
    queryFn: async () => fetchContentTypes(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
