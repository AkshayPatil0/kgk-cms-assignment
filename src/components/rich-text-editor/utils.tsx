import { JSONContent } from "@tiptap/react";

export const serializeContent = (content: JSONContent) =>
  JSON.stringify(content);

export const deserializeContent = (content: string): JSONContent =>
  JSON.parse(content);
