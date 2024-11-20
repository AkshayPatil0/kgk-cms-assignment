"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getContentTypesOptions } from "@/lib/query/queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { slugify } from "@/lib/utils";
import { createContent } from "@/lib/api/content";
import { CreateContentRequest } from "@/lib/api/types";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string(),
  contentTypeId: z.string({
    required_error: "Please select a content type.",
  }),
});

export default function CreateContentButton() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      contentTypeId: "",
    },
  });

  const { data: contentTypes } = useQuery(getContentTypesOptions());

  const { mutate } = useMutation({
    mutationFn: (params: CreateContentRequest) => createContent(params),
    onSuccess(data) {
      console.log(data.data);
      setIsOpen(false);
      form.reset();
    },
  });

  const [defaultSlug, setDefaultSlug] = useState("");
  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      setDefaultSlug(slugify(value.title || ""));
    });
    return () => unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission logic here
    console.log({
      ...values,
      slug: values.slug || defaultSlug,
    });
    mutate({
      ...values,
      slug: values.slug || defaultSlug,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full w-16 h-16"
          size="icon"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Create new content</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter content title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={defaultSlug || "Enter slug for content"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contentTypes?.data.map((contentType) => (
                        <SelectItem key={contentType.id} value={contentType.id}>
                          {contentType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                You can edit and refine your content in the next steps.
              </AlertDescription>
            </Alert>
            <Button type="submit" className="w-full">
              Create Content
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
