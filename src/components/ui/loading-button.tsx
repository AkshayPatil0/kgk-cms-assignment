import { Button, ButtonProps } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function LoadingButton({
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps & { isLoading: boolean }) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading && (
        <LoaderCircle
          className="-ms-1 me-2 animate-spin"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
      {children}
    </Button>
  );
}
