"use client";

import { Toggle } from "@/components/ui/toggle";
import { PropsWithChildren } from "react";

export default function EditorToggle({
  active,
  onClick,
  disabled,
  children,
}: PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  active: boolean;
}>) {
  return (
    <Toggle
      className="group size-9 p-0 hover:bg-indigo-50 hover:text-indigo-500 data-[state=on]:bg-indigo-50 data-[state=on]:text-indigo-500"
      pressed={active}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Toggle>
  );
}
