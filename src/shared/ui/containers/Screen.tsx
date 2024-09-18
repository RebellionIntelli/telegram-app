import { cn } from "@/shared/lib/utils";
import { ComponentProps } from "react";

const Screen = ({ children, className = "" }: ComponentProps<"main">) => {
  return (
    <main
      className={cn(
        "p-5 w-screen h-screen flex flex-col gap-lg bg-secondary",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Screen;
