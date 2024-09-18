import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";

export const AccountSkeleton = () => {
  return (
    <Skeleton className="px-[16px] py-[24px] flex flex-row gap-md rounded-[20px] w-full">
      <div className="flex flex-col gap-sm w-full items-start">
        <div className="flex flex-row gap-md w-full items-center">
          <Skeleton className="w-[20%] h-[24px]" />
          <Skeleton className="w-[20%] h-[16px]" />
        </div>
        <Skeleton className="w-[40%] h-[16px]" />
      </div>
    </Skeleton>
  );
};
