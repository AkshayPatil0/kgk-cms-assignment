import ImageNode from "@/plugins/image-block/image-node";
import { useEditor, UseEditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  ImageNode,
];

export const useRichTextEditor = (options: UseEditorOptions) => {
  return useEditor({
    extensions,
    immediatelyRender: false,
    ...options,
  });
};
