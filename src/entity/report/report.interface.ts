import BaseEntity from "@/shared/types/base-entity.interface";
import ProjectEntity from "../project/project.interface";
import AccountEntity from "../account/account.interface";
import ReportWhitelistEntity from "../report-wl/report-wl.interface";

interface ReportEntity extends BaseEntity {
  status: "WAIT" | "REJECTED" | "ACCEPTED";
  title: string;
  project: ProjectEntity;
  account: AccountEntity;
  files: string[];
}

export default ReportEntity;
export type CombinedReportEntity = ReportEntity | ReportWhitelistEntity;
