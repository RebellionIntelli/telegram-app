import { Skeleton } from "@/shared/ui/skeleton";
import { TableCell, TableRow } from "@/shared/ui/table";
import React from "react";

export const ReportRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="w-[60px] h-[16px]" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="w-[60px] h-[16px]" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="w-[60px] h-[16px]" />
      </TableCell>
      <TableCell className="flex flex-row gap-sm">
        <Skeleton className=" h-[64px] w-[64px]" />
        <Skeleton className=" h-[64px] w-[64px]" />
        <Skeleton className=" h-[64px] w-[64px]" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="flex flex-row gap-sm items-center w-full">
          <Skeleton className="h-[32px] w-[32px]" />
          <Skeleton className="w-[80%] h-[16px]" />
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="w-[60px] h-[16px]" />
      </TableCell>
    </TableRow>
  );
};
