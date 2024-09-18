import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";

export const InputSkeletons = ({ w }: { w?: string }) => {
  return (
    <div className="w-full">
      <Skeleton
        className="h-[55px] w-full rounded-[20px]"
        style={w ? { width: w } : {}}
      />
    </div>
  );
};
