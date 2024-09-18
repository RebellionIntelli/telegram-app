import { cn } from "@/shared/lib/utils";
import { File, Home, User2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div className="w-full bg-neutral-0 p-4 rounded-full flex flex-row justify-center gap-xl items-center">
      <Link href={"/reports"}>
        <File size={32} className={cn("hover:scale-105 text-primary-100")} />
      </Link>
      <Link href={"/accounts"}>
        <User2 size={32} className={cn("hover:scale-105 text-primary-100")} />
      </Link>
    </div>
  );
};

export default Navigation;
