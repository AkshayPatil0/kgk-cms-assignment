"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PreviewSwitch from "./preview-switch";
import ContentEditForm, {
  contentEditFormSchema,
  ContentEditFormValues,
} from "./content-edit-form";
import ContentPreview from "./content-preview";
import { ContentResponse, UpdateContentRequest } from "@/lib/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContent } from "@/lib/api/content";
import { toast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loading-button";
import { getContentByIdOptions } from "@/lib/query/queries";

export default function ContentEditView({
  content,
}: {
  content: ContentResponse;
}) {
  const [isPreview, setIsPreview] = useState(false);

  const form = useForm<ContentEditFormValues>({
    resolver: zodResolver(contentEditFormSchema),
    defaultValues: {
      title: content.title,
      slug: content.slug,
      content: content.content,
    },
  });

  const currentContent = form.watch();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: UpdateContentRequest) =>
      updateContent(content.id, values),
    onSuccess(updatedContentRes) {
      toast({
        title: "Content updated successfully!",
      });
      queryClient.setQueryData(
        getContentByIdOptions(content.slug).queryKey,
        (data) => {
          return {
            ...data,
            ...updatedContentRes,
          };
        }
      );
    },
    onError() {
      toast({
        title: "Failed to update Content !",
        variant: "destructive",
      });
    },
  });

  function onSubmit() {
    const values = form.getValues();
    mutate(values);
  }

  console.log({ currentContent });
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end items-center gap-4">
        <PreviewSwitch value={isPreview} onChange={setIsPreview} />
        <LoadingButton isLoading={isPending} onClick={onSubmit}>
          Save Changes
        </LoadingButton>
      </div>
      {isPreview ? (
        <ContentPreview content={{ ...content, ...currentContent }} />
      ) : (
        <ContentEditForm form={form} />
      )}
    </div>
  );
}
