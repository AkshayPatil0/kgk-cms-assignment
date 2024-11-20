"use client";

import { PropsWithChildren } from "react";
import { Button } from "../ui/button";

export default function EditorAction({
  onClick,
  disabled,
  children,
}: PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
}>) {
  return (
    <Button
      className="group p-2 hover:bg-indigo-50 hover:text-indigo-500 data-[state=on]:bg-indigo-50 data-[state=on]:text-indigo-500"
      onClick={onClick}
      disabled={disabled}
      variant={"ghost"}
      type="button"
    >
      {children}
    </Button>
  );
}
