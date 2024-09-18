import { cn } from "@/shared/lib/utils";
import { ComponentProps } from "react";

const Description = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => {
  return (
    <p
      className={cn(className, "font-medium text-[16px] text-neutral-40")}
      {...props}
    >
      {children}
    </p>
  );
};

export default Description;
