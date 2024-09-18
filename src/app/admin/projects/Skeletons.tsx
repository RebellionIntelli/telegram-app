import { Skeleton } from "@/shared/ui/skeleton";
import { TableCell, TableRow } from "@/shared/ui/table";
import React from "react";

export const ProjectRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="aspect-square object-cover rounded-[10px]" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="w-full h-[16px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[78px] h-[22px]" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="w-full h-[16px]" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="w-full h-[16px]" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="w-full h-[16px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[40px] h-[40px] rounded-sm" />
      </TableCell>
    </TableRow>
  );
};
