import "./styles.css";

import { Editor } from "@tiptap/react";
import React from "react";
import EditorToggle from "./editor-toggle";
import {
  Bold,
  Code,
  CodeSquare,
  Eraser,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";
import EditorAction from "./editor-action";

const Separator = () => {
  return <div className="w-px h-6 mx-2 bg-gray-500"></div>;
};
export default function EditorMenu({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex gap-2 items-center flex-wrap">
        <EditorToggle
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold />
        </EditorToggle>
        <EditorToggle
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic />
        </EditorToggle>
        <EditorToggle
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <Strikethrough />
        </EditorToggle>
        <EditorToggle
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
        >
          <Code />
        </EditorToggle>
        <Separator />
        <EditorToggle
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
        >
          P
        </EditorToggle>
        <EditorToggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
        >
          h1
        </EditorToggle>
        <EditorToggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        >
          h2
        </EditorToggle>
        <EditorToggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
        >
          h3
        </EditorToggle>
        <EditorToggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          active={editor.isActive("heading", { level: 4 })}
        >
          h4
        </EditorToggle>
        <EditorToggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          active={editor.isActive("heading", { level: 5 })}
        >
          h5
        </EditorToggle>
        <EditorToggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          active={editor.isActive("heading", { level: 6 })}
        >
          h6
        </EditorToggle>
        <EditorToggle
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List />
        </EditorToggle>
        <EditorToggle
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered />
        </EditorToggle>
        <EditorToggle
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        >
          <CodeSquare />
        </EditorToggle>
        <EditorToggle
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <Quote />
        </EditorToggle>

        <Separator />
        <EditorToggle
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          active={false}
        >
          <Undo2 />
        </EditorToggle>
        <EditorToggle
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          active={false}
        >
          <Redo2 />
        </EditorToggle>
        <EditorAction
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <Eraser /> mark
        </EditorAction>
        <EditorAction onClick={() => editor.chain().focus().clearNodes().run()}>
          <Eraser /> nodes
        </EditorAction>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <EditorAction
          onClick={() => editor.chain().focus().createImageNode().run()}
        >
          <ImageIcon /> Image
        </EditorAction>
      </div>
    </div>
  );
}
