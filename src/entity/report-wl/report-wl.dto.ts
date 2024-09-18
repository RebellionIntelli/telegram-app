import { UUID } from "crypto";

export interface CreateWLReportDto {
  title: string;
  projectId: UUID;
  walletId: UUID;
  accountId: UUID;
  userId: UUID;
  files: string[];
}
