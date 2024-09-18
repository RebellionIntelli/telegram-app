import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UUID } from "crypto";
import ReportWLService from "./report-wl.service";
import ReportWhitelistEntity from "./report-wl.interface";

export const useReportWLController = (id?: string) => {
  const queryClient = useQueryClient();

  const ReportWLQuery = useQuery({
    queryKey: ["ReportWLs", id],
    queryFn: () => ReportWLService.getReportWLById(id as UUID),
    enabled: !!id,
  });

  const ReportWLsQuery = useQuery({
    queryKey: ["ReportWLs"],
    queryFn: ReportWLService.getReportWLs,
  });

  const createReportWLMutation = useMutation({
    mutationFn: ReportWLService.createReportWL,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ReportWLs"],
      });
    },
  });

  const updateReportWLMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: UUID;
      data: Partial<ReportWhitelistEntity>;
    }) => ReportWLService.updateReportWL(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ReportWLs"],
      });
    },
  });

  const deleteReportWLMutation = useMutation({
    mutationFn: ReportWLService.deleteReportWL,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ReportWLs"],
      });
    },
  });

  return {
    ReportWL: ReportWLQuery.data,
    ReportWLs: ReportWLsQuery.data,
    isReportWLLoading: ReportWLsQuery.isLoading || ReportWLQuery.isLoading,
    ReportWLError: ReportWLsQuery.error || ReportWLQuery.error,
    createReportWL: createReportWLMutation.mutate,
    updateReportWL: updateReportWLMutation.mutate,
    deleteReportWL: deleteReportWLMutation.mutate,
  };
};
