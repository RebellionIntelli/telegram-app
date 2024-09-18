import ReportWhitelistEntity from "@/entity/report-wl/report-wl.interface";
import { CombinedReportEntity } from "@/entity/report/report.interface";
import { formatDateV2 } from "@/shared/lib/format-date";
import Block from "@/shared/ui/containers/Block";
import SectionLabel from "@/shared/ui/custom/SectionLabel";
import { FileDown } from "lucide-react";
import React from "react";
interface Props {
  reports: CombinedReportEntity[];
}

export function isReportWhitelistEntity(
  report: CombinedReportEntity
): report is ReportWhitelistEntity {
  return (report as ReportWhitelistEntity).wallet !== undefined;
}
const AllTimeReports = ({ reports }: Props) => {
  return (
    <section className="flex flex-col gap-xs w-full overflow-hidden h-screen">
      <SectionLabel>Отчёты за всё время</SectionLabel>
      <div className="flex flex-col gap-sm flex-grow overflow-y-auto">
        {reports.map((report, index) => (
          <Block
            className="flex flex-row items-center justify-between w-full"
            key={index}
          >
            {isReportWhitelistEntity(report) ? (
              <p>
                {report.wallet.address
                  ? `Отчёт вайтлист за ${formatDateV2(report.created_at)}`
                  : `Отчёт за ${formatDateV2(report.created_at)}`}
              </p>
            ) : (
              <p>Отчёт за {formatDateV2(report.created_at)}</p>
            )}{" "}
            <FileDown className="text-primary-40" />
          </Block>
        ))}
      </div>
    </section>
  );
};

export default AllTimeReports;
