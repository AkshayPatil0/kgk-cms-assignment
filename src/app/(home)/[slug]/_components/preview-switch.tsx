"use client";

import { Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function PreviewSwitch({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex w-full justify-end items-center space-x-2">
      <label
        htmlFor="preview-mode"
        className="text-sm font-medium cursor-pointer"
      >
        {value ? (
          <Eye className="h-4 w-4 inline mr-1" />
        ) : (
          <EyeOff className="h-4 w-4 inline mr-1" />
        )}
        Preview
      </label>
      <Switch checked={value} onCheckedChange={onChange} id="preview-mode" />
    </div>
  );
}
