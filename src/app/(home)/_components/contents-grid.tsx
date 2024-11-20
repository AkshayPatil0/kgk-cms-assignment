"use client";
import { useQuery } from "@tanstack/react-query";
import ContentTile from "./content-tile";
import { getContentsOptions } from "@/lib/query/queries";

export default function ContentsGrid() {
  const { data } = useQuery(getContentsOptions({}));

  console.log({ data });
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.records.map((content) => (
        <ContentTile key={content.id} content={content} />
      ))}
    </div>
  );
}
