import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageNodeView from "./image-node-view";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    ImageNode: {
      /**
       * create a card node
       */
      createImageNode: () => ReturnType;
    };
  }
}

const ImageNode = Node.create({
  name: "imageNode",
  group: "block",
  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "imageNode",
      },
    ];
  },
  addAttributes() {
    return {
      url: {
        default: null,
      },
      size: {
        default: "full",
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)];
  },
  addCommands() {
    return {
      createImageNode:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export default ImageNode;
