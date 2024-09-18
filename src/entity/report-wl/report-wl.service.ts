import { baseApi } from "@/shared/api/base.api";
import { UUID } from "crypto";
import ReportWhitelistEntity from "./report-wl.interface";
import { CreateWLReportDto } from "./report-wl.dto";

class ReportWLService {
  static async getReportWLs(): Promise<ReportWhitelistEntity[]> {
    const response = await baseApi.get<ReportWhitelistEntity[]>("/reports-wl");
    return response.data;
  }

  static async getReportWLById(id: UUID): Promise<ReportWhitelistEntity> {
    const response = await baseApi.get<ReportWhitelistEntity>(
      `/reports-wl/${id}`
    );
    return response.data;
  }

  static async createReportWL(
    data: CreateWLReportDto
  ): Promise<CreateWLReportDto> {
    const response = await baseApi.post<CreateWLReportDto>("/reports-wl", data);
    return response.data;
  }

  static async updateReportWL(
    id: UUID,
    data: Partial<ReportWhitelistEntity>
  ): Promise<ReportWhitelistEntity> {
    const response = await baseApi.patch<ReportWhitelistEntity>(
      `/reports-wl/${id}`,
      data
    );
    return response.data;
  }

  static async deleteReportWL(id: UUID): Promise<void> {
    await baseApi.delete(`/reports-wl/${id}`);
  }
}

export default ReportWLService;
