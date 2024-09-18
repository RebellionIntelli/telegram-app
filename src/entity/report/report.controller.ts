import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UUID } from "crypto";
import ReportService from "./report.service";
import ReportEntity from "./report.interface";

export const useReportController = (id?: string) => {
  const queryClient = useQueryClient();

  const ReportQuery = useQuery({
    queryKey: ["Reports", id],
    queryFn: () => ReportService.getReportById(id as UUID),
    enabled: !!id,
  });

  const ReportsQuery = useQuery({
    queryKey: ["Reports"],
    queryFn: ReportService.getReports,
  });

  const createReportMutation = useMutation({
    mutationFn: ReportService.createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Reports"],
      });
    },
  });

  const updateReportMutation = useMutation({
    mutationFn: ({ id, data }: { id: UUID; data: Partial<ReportEntity> }) =>
      ReportService.updateReport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Reports"],
      });
    },
  });

  const deleteReportMutation = useMutation({
    mutationFn: ReportService.deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Reports"],
      });
    },
  });

  return {
    Report: ReportQuery.data,
    Reports: ReportsQuery.data,
    isReportLoading: ReportsQuery.isLoading || ReportQuery.isLoading,
    ReportError: ReportsQuery.error || ReportQuery.error,
    createReport: createReportMutation.mutate,
    updateReport: updateReportMutation.mutate,
    deleteReport: deleteReportMutation.mutate,
  };
};
