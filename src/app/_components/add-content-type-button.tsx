import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createContentType } from "@/lib/api/content-type";
import LoadingButton from "@/components/ui/loading-button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export function AddContentTypeButton() {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createContentType,
    onSuccess() {
      setOpen(false);
      toast({
        title: "Content type added successfully!",
      });
    },
    onError() {
      toast({
        title: "Failed to add Content type !",
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values.name);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction title="Add content type">
          <Plus /> <span className="sr-only">Add content type</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add new Content type</DialogTitle>
              <DialogDescription>
                Provide name to new content type. Click add when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton isLoading={isPending} type="submit">
                Add
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
