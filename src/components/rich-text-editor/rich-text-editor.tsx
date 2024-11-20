import "./styles.css";

import { EditorContent } from "@tiptap/react";
import React, { useMemo } from "react";

import { useRichTextEditor } from "./use-rich-text-editor";
import { deserializeContent, serializeContent } from "./utils";
import { toast } from "@/hooks/use-toast";
import EditorMenu from "./rich-text-editor-menu";

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const parsedContent = useMemo(() => {
    try {
      return deserializeContent(content);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Invalid content received !",
        description: "Malformed data detected; content cleared.",
      });
      return null;
    }
  }, [content]);

  const editor = useRichTextEditor({
    content: parsedContent,
    onUpdate({ editor }) {
      onChange(serializeContent(editor.getJSON()));
    },
  });

  if (!editor) return null;

  return (
    <>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
