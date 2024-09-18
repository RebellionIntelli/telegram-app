import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-[55px] w-full rounded-[20px] border border-neutral-40
          bg-[transparent] px-[16px] py-[18px] text-[16px] 
          file:border-0 file:bg-[transparent] file:text-neutral-40 file:font-medium file:placeholder:text-neutral-40
          placeholder:text-neutral-40 focus-visible:outline-none
        focus-visible:border-primary-100
          focus-visible:ring-offset-2 disabled:cursor-not-allowed
          disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950
          dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400
          dark:focus-visible:ring-neutral-300`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
