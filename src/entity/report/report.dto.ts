import { UUID } from "crypto";

export interface CreateReportDto {
  title: string;
  projectId: UUID;
  accountId: UUID;
  userId: UUID;
  files: string[];
}
