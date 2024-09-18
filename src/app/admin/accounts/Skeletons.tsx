import { Skeleton } from "@/shared/ui/skeleton";
import { TableCell, TableRow } from "@/shared/ui/table";
import React from "react";

export const AccountRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-full h-[16px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-[16px]" />
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
      <TableCell className="hidden md:table-cell">
        <Skeleton className="w-full h-[16px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[78px] h-[22px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[40px] h-[40px] rounded-sm" />
      </TableCell>
    </TableRow>
  );
};
//   <TableHead>Пользователь</TableHead>
//           <TableHead>Твиттер</TableHead>
//           <TableHead className="hidden md:table-cell">Дискорд</TableHead>
//           <TableHead className="hidden md:table-cell">Почта</TableHead>
//           <TableHead className="hidden md:table-cell">
//             Биткоин кошелек
//           </TableHead>
//           <TableHead className="hidden md:table-cell">Эфир кошелек</TableHead>
//           <TableHead className="hidden md:table-cell">Статус</TableHead>
//           <TableHead>
//             <span className="sr-only">Действия</span>
//           </TableHead>
