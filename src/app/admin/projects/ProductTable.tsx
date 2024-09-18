"use client";
import Image from "next/image";
import { Edit } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useProjectController } from "@/entity/project/project.controller";
import formatDate from "@/shared/lib/format-date";

import { ProjectRowSkeleton } from "./Skeletons";
import CustomDrawer from "@/shared/ui/custom/Drawer";
import EditProjectForm from "@/widget/admin/EditProjectForm";

export function ProductTable() {
  const { Projects, isProjectLoading } = useProjectController();

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Цвет</TableHead>
          <TableHead className="hidden md:table-cell">
            Ссылка на канал
          </TableHead>
          <TableHead className="hidden md:table-cell">Ссылка на чат</TableHead>
          <TableHead className="hidden md:table-cell">Дата создания</TableHead>
          <TableHead>
            <span className="sr-only">Действия</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isProjectLoading && !Projects ? (
          <>
            <ProjectRowSkeleton />
            <ProjectRowSkeleton />
            <ProjectRowSkeleton />
            <ProjectRowSkeleton />
            <ProjectRowSkeleton />
          </>
        ) : (
          Projects && (
            <>
              {Projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square object-cover rounded-[10px]"
                      height="64"
                      src={project.logotype}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge
                      className="text-neutral-0"
                      style={{
                        background: project.color,
                      }}
                    >
                      {project.color.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {project.link}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {project.chat}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(project.created_at)}
                  </TableCell>
                  <TableCell className="">
                    <CustomDrawer
                      data={{}}
                      description={`Изменить проект ${project.name}`}
                      form={EditProjectForm}
                      id={project.id}
                      header={{ colored: "проект", neutral: "Изменить" }}
                      trigger={
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="h-8 w-8 p-0"
                        >
                          <Edit />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )
        )}
      </TableBody>
    </Table>
  );
}
