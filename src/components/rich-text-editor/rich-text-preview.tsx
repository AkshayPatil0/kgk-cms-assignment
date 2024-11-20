import "./styles.css";

import React, { useMemo } from "react";
import { useRichTextEditor } from "./use-rich-text-editor";
import { EditorContent } from "@tiptap/react";
import { deserializeContent } from "./utils";
import { toast } from "@/hooks/use-toast";

export default function RichTextPreview({ content }: { content: string }) {
  const parsedContent = useMemo(() => {
    try {
      return deserializeContent(content);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Invalid content received !",
        description: "Malformed data detected",
      });
      return null;
    }
  }, [content]);

  const editor = useRichTextEditor({
    content: parsedContent,
    editable: false,
  });
  return <EditorContent editor={editor} />;
}
