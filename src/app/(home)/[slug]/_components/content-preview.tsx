"use client";

import { ContentResponse } from "@/lib/api/types";
import RichTextPreview from "@/components/rich-text-editor/rich-text-preview";

export default function ContentPreview({
  content,
}: {
  content: ContentResponse;
}) {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl w-full outline-none bg-transparent">
          {content.title}
        </h1>
        <p className="w-full outline-none bg-transparent">{content.slug}</p>
      </div>
      <hr className="pb-4" />
      <RichTextPreview content={content.content || ""} />
    </div>
  );
}
