"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getContentByIdOptions } from "@/lib/query/queries";
import ContentEditView from "./_components/content-edit-view";

export default function ContentEditPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: content } = useQuery(getContentByIdOptions(slug));

  if (!content) return null;

  return <ContentEditView content={content} />;
}
