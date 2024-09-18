import ReportEntity from "@/entity/report/report.interface";
import formatDate from "@/shared/lib/format-date";
import getFileWord from "@/shared/lib/get-file-word";
import Block from "@/shared/ui/containers/Block";
import SectionLabel from "@/shared/ui/custom/SectionLabel";
import Image from "next/image";
import React from "react";
interface Props {
  reports: ReportEntity[];
}
const LastReport = ({ reports }: Props) => {
  const lastReport = reports[reports.length - 1];

  return (
    <section className="flex flex-col gap-xs w-full h-full">
      <SectionLabel>Последний отчёт</SectionLabel>
      <Block>
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-xs">
            <Image
              src={lastReport.project.logotype}
              alt=""
              width={24}
              height={24}
              className="rounded-full"
            />
            <p
              className="font-bold text-[16px] uppercase"
              style={{ color: lastReport.project.color }}
            >
              {lastReport.project.name}
            </p>
          </div>
          {lastReport.status === "WAIT" && (
            <p className="font-medium text-[16px] text-neutral-40">
              На рассмотрении
            </p>
          )}
          {lastReport.status === "ACCEPTED" && (
            <p className="font-medium text-[16px] text-success">Одобрено</p>
          )}
          {lastReport.status === "REJECTED" && (
            <p className="font-medium text-[16px] text-error">Отклонено</p>
          )}
        </div>
        <ul className="flex flex-col gap-sm font-medium text-[16px] text-neutral-40">
          <li>
            Тема отчёта:{" "}
            <span className="text-neutral-100">{lastReport.title}</span>
          </li>
          <li>
            Файлы отчёта:{" "}
            <span className="text-neutral-100">
              {lastReport.files.length} {getFileWord(lastReport.files.length)}
            </span>
          </li>
          <li>
            Аккаунт:{" "}
            <span className="text-neutral-100">
              {lastReport.account.credentials[1].login}
            </span>
          </li>
          <li>
            Дата:{" "}
            <span className="text-neutral-100">
              {formatDate(lastReport.created_at)}
            </span>
          </li>
        </ul>
      </Block>
    </section>
  );
};

export default LastReport;
