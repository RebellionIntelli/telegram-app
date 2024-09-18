"use client";
import { cn } from "@/shared/lib/utils";
import { Copy } from "lucide-react";
import React, { ReactNode, useState } from "react";

// Define a type for the props
interface ClipboardCopyProps {
  children: ReactNode;
  className?: string;
}

const CopyChildren: React.FC<ClipboardCopyProps> = ({
  children,
  className,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  // Function to handle the copy operation
  const handleCopy = () => {
    setCopied(true);
    if (typeof children === "string") {
      navigator.clipboard
        .writeText(children)
        .then(() => {
          console.log("Copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      console.warn("Children must be a string");
    }
  };

  return (
    <p
      onClick={handleCopy}
      style={{ cursor: "pointer" }}
      className={cn("text-neutral-100 flex gap-xs", className)}
    >
      {children}
      <Copy size={16} className={cn(copied && "text-primary-100")} />
    </p>
  );
};

export default CopyChildren;
