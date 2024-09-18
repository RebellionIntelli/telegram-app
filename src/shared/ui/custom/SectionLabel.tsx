import { cn } from "@/shared/lib/utils";
import { ComponentProps } from "react";

const SectionLabel = ({
  children,
  className,
  ...props
}: ComponentProps<"h3">) => {
  return (
    <p
      className={cn(
        className,
        "font-bold text-[24px] text-left w-full text-neutral-100"
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default SectionLabel;
