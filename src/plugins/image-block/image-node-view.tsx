import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LabelHTMLAttributes, PropsWithChildren, useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type ImageSize = "sm" | "md" | "full";

const imageSizesMap: Record<ImageSize, string> = {
  sm: "w-1/3",
  md: "w-2/3",
  full: "w-full",
};

const ImageNodeView = ({ node, updateAttributes, editor }: NodeViewProps) => {
  const [url, setUrl] = useState("");
  const handleUrlUpdate = () => {
    if (url) {
      updateAttributes({ url });
    }
  };

  const size = (node.attrs.size || "full") as ImageSize;
  const setSize = (size: string) => {
    updateAttributes({ size });
  };

  if (!editor.isEditable && !node.attrs.url) return null;
  return (
    <NodeViewWrapper>
      <div contentEditable={false}>
        <div className="relative flex w-full justify-center">
          {!node.attrs.url && (
            <div className="flex gap-2">
              <Input value={url} onChange={(e) => setUrl(e.target.value)} />
              <Button onClick={handleUrlUpdate} disabled={!url}>
                <Plus /> Add
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          {node.attrs.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={cn("relative", imageSizesMap[size])}
              src={node.attrs.url}
              alt={""}
              style={{ objectFit: "contain" }}
            />
          )}
          <div className="w-1/3"></div>
          {node.attrs.url && editor.isEditable && (
            <SizeSelect value={size} onChange={setSize} />
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
};

function SizeSelect({
  value,
  onChange,
}: {
  value: ImageSize;
  onChange: (value: ImageSize) => void;
}) {
  return (
    <RadioGroup
      className="flex gap-2 justify-center py-2"
      defaultValue="full"
      value={value}
      onValueChange={onChange}
    >
      <SizeLabel htmlFor="radio-size-sm">
        <RadioGroupItem
          id="radio-size-sm"
          value="sm"
          className="sr-only after:absolute after:inset-0"
        />
        Small
      </SizeLabel>
      <SizeLabel>
        <RadioGroupItem
          id="radio-size-md"
          value="md"
          className="sr-only after:absolute after:inset-0"
        />
        Medium
      </SizeLabel>
      <SizeLabel>
        <RadioGroupItem
          id="radio-size-full"
          value="full"
          className="sr-only after:absolute after:inset-0"
        />
        Full
      </SizeLabel>
    </RadioGroup>
  );
}

const SizeLabel = ({
  children,
  ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => {
  return (
    <label
      className="relative text-sm flex cursor-pointer rounded-lg border border-input px-2 py-1 text-center shadow-sm shadow-black/5 ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2"
      {...props}
    >
      {children}
    </label>
  );
};

export default ImageNodeView;
