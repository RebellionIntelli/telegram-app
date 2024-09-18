/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import { ReportRowSkeleton } from "./Skeletons";
import { useReportController } from "@/entity/report/report.controller";
import { CombinedReportEntity } from "@/entity/report/report.interface";
import React, { useState } from "react";
import { useReportWLController } from "@/entity/report-wl/report-wl.controller";
import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import formatDate from "../../../shared/lib/format-date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { isReportWhitelistEntity } from "@/widget/all-time-reports/AllTimeReports";
import { StatusENUM } from "@/entity/report-wl/report-wl.interface";
import Link from "next/link";
export function ReportTable() {
  const { Reports, ReportError, isReportLoading, updateReport } =
    useReportController();
  const { ReportWLs, ReportWLError, isReportWLLoading, updateReportWL } =
    useReportWLController();

  const [loading, setLoading] = useState<boolean>(false);

  // Combine reports and reportWLs
  let AllReports: CombinedReportEntity[] = [];

  // Check for loading states
  if (!isReportLoading && !isReportWLLoading) {
    // Check for errors
    if (ReportError || ReportWLError) {
      console.error("Error fetching reports:", ReportError || ReportWLError);
    } else {
      // Combine and sort reports and reportWLs
      AllReports = [...(Reports || []), ...(ReportWLs || [])].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  }

  async function updateSomeReport(
    type: boolean,
    statusReport: StatusENUM,
    report: CombinedReportEntity
  ) {
    setLoading(true);
    try {
      const {
        status,
        id,
        created_at,
        updated_at,
        account,
        project,
        ...reportWithoutExcludedFields
      } = report;
      const updateData = {
        status: statusReport.status,
        ...reportWithoutExcludedFields,
      };
      if (type) {
        await updateReportWL({
          id: report.id,
          data: updateData,
        });
      } else {
        await updateReport({
          id: report.id,
          data: updateData,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Тема отчёта</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="hidden lg:table-cell">Аккаунт</TableHead>
          <TableHead className="hidden lg:table-cell">Файлы</TableHead>
          <TableHead className="hidden lg:table-cell">Проект</TableHead>
          <TableHead className="hidden lg:table-cell">Дата</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isReportLoading || (isReportWLLoading && !AllReports) ? (
          <>
            <ReportRowSkeleton />
            <ReportRowSkeleton />
            <ReportRowSkeleton />
            <ReportRowSkeleton />
            <ReportRowSkeleton />
            <ReportRowSkeleton />
          </>
        ) : (
          AllReports && (
            <>
              {AllReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell className="font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Badge
                          role="button"
                          className="text-neutral-0"
                          style={{
                            background:
                              (report.status === "WAIT" &&
                                "rgba(0, 0, 0, 0.4)") ||
                              (report.status === "ACCEPTED" && "#00CA48") ||
                              (report.status === "REJECTED" && "#FF0B18") ||
                              "blue",
                          }}
                        >
                          {(report.status === "WAIT" && "На рассмотрении") ||
                            (report.status === "ACCEPTED" && "Одобрено") ||
                            (report.status === "REJECTED" && "Отклонено")}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="items-center flex flex-col gap-xs">
                        <DropdownMenuItem>
                          <Badge
                            onClick={() =>
                              updateSomeReport(
                                isReportWhitelistEntity(report),
                                { status: "WAIT" },
                                report
                              )
                            }
                            className="text-neutral-0 w-full"
                            style={{
                              background: "rgba(0, 0, 0, 0.4)",
                            }}
                          >
                            На рассмотрении
                          </Badge>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Badge
                            onClick={() =>
                              updateSomeReport(
                                isReportWhitelistEntity(report),
                                { status: "ACCEPTED" },
                                report
                              )
                            }
                            className="text-neutral-0 w-full"
                            style={{
                              background: "#00CA48",
                            }}
                          >
                            Одобрено
                          </Badge>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Badge
                            onClick={() =>
                              updateSomeReport(
                                isReportWhitelistEntity(report),
                                { status: "REJECTED" },
                                report
                              )
                            }
                            className="text-neutral-0 w-full"
                            style={{
                              background: "#FF0B18",
                            }}
                          >
                            Отклонено
                          </Badge>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="font-medium">
                    {report.account.credentials[1].login}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className=" flex flex-row gap-sm flex-wrap max-w-[250px]">
                      {report.files.map((file, index) => (
                        <Link href={file} key={index} target="_blank">
                          <Image
                            alt="Product image"
                            className="aspect-square object-cover rounded-[10px]"
                            height="64"
                            src={file}
                            width="64"
                          />
                        </Link>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-[16px] flex-row flex items-center gap-sm">
                    <Image
                      alt="Product image"
                      className="aspect-square object-cover rounded-[10px]"
                      height="32"
                      src={report.project.logotype}
                      width="32"
                    />
                    <p
                      style={{
                        color: report.project.color,
                      }}
                    >
                      {report.project.name}
                    </p>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatDate(report.created_at)}
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
