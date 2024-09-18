import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";

export const LastReportSkeleton = () => {
  return (
    <div className="flex flex-col gap-sm w-full">
      <Skeleton className="w-[50%] h-[24px] rounded-full" />
      <Skeleton className="p-[16px] flex flex-col gap-md rounded-[20px] w-full">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-xs items-center">
            <Skeleton className="rounded-full h-6 w-6" />
            <Skeleton className="rounded-full h-4 w-[125px]" />
          </div>
          <Skeleton className="rounded-full h-4 w-[135px]" />
        </div>
        <div className="flex flex-col gap-sm font-medium text-[16px] text-neutral-40">
          <Skeleton className="rounded-full h-4 w-[55%]" />
          <Skeleton className="rounded-full h-4 w-[60%]" />
          <Skeleton className="rounded-full h-4 w-[65%]" />
          <Skeleton className="rounded-full h-4 w-[50%]" />
        </div>
      </Skeleton>
    </div>
  );
};

export const AllTimeReportsSkeleton = () => {
  return (
    <div className="flex flex-col gap-sm w-full overflow-hidden h-screen">
      <Skeleton className="w-[50%] h-[24px] rounded-full" />
      <div className="flex flex-col gap-sm flex-grow overflow-y-auto h-full">
        <Skeleton className="p-[16px] flex flex-col gap-md rounded-[20px] w-full">
          <Skeleton className="rounded-full h-4 w-[55%]" />
        </Skeleton>
        <Skeleton className="p-[16px] flex flex-col gap-md rounded-[20px] w-full">
          <Skeleton className="rounded-full h-4 w-[55%]" />
        </Skeleton>
        <Skeleton className="p-[16px] flex flex-col gap-md rounded-[20px] w-full">
          <Skeleton className="rounded-full h-4 w-[55%]" />
        </Skeleton>
        <Skeleton className="p-[16px] flex flex-col gap-md rounded-[20px] w-full">
          <Skeleton className="rounded-full h-4 w-[55%]" />
        </Skeleton>
        <Skeleton className="p-[16px] flex flex-col gap-md rounded-[20px] w-full">
          <Skeleton className="rounded-full h-4 w-[55%]" />
        </Skeleton>
      </div>
    </div>
  );
};
