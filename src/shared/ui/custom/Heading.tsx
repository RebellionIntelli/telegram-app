import { cn } from "@/shared/lib/utils";
import { ComponentProps } from "react";

const Heading = ({ children, className, ...props }: ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        className,
        "font-bold text-[20px] text-neutral-100 w-full text-center"
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Heading;
