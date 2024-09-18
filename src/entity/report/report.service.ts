import { baseApi } from "@/shared/api/base.api";
import { UUID } from "crypto";
import ReportEntity from "./report.interface";
import { CreateReportDto } from "./report.dto";

class ReportService {
  static async getReports(): Promise<ReportEntity[]> {
    const response = await baseApi.get<ReportEntity[]>("/Reports");
    return response.data;
  }

  static async getReportById(id: UUID): Promise<ReportEntity[]> {
    const response = await baseApi.get<ReportEntity[]>(`/Reports/user/${id}`);
    return response.data;
  }

  static async createReport(data: CreateReportDto): Promise<CreateReportDto> {
    const response = await baseApi.post<CreateReportDto>("/Reports", data);
    return response.data;
  }

  static async updateReport(
    id: UUID,
    data: Partial<ReportEntity>
  ): Promise<ReportEntity> {
    const response = await baseApi.patch<ReportEntity>(`/Reports/${id}`, data);
    return response.data;
  }

  static async deleteReport(id: UUID): Promise<void> {
    await baseApi.delete(`/Reports/${id}`);
  }
}

export default ReportService;
