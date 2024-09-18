import { cn } from "@/shared/lib/utils";
import { ComponentProps } from "react";

const Block = ({ children, className }: ComponentProps<"main">) => {
  return (
    <div
      className={cn(
        "p-[16px] flex flex-col gap-md bg-neutral-0 rounded-[20px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Block;
