import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UUID } from "crypto";
import ProjectService from "./project.service";
import ProjectEntity from "./project.interface";

export const useProjectController = (id?: string) => {
  const queryClient = useQueryClient();

  const ProjectQuery = useQuery({
    queryKey: ["Projects", id],
    queryFn: () => ProjectService.getProjectById(id as UUID),
    enabled: !!id,
  });

  const ProjectsQuery = useQuery({
    queryKey: ["Projects"],
    queryFn: ProjectService.getProjects,
  });

  const createProjectMutation = useMutation({
    mutationFn: ProjectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Projects"],
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: UUID; data: Partial<ProjectEntity> }) =>
      ProjectService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Projects"],
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: ProjectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Projects"],
      });
    },
  });

  return {
    Project: ProjectQuery.data,
    Projects: ProjectsQuery.data,
    isProjectLoading: ProjectsQuery.isLoading || ProjectQuery.isLoading,
    ProjectError: ProjectsQuery.error || ProjectQuery.error,
    createProject: createProjectMutation.mutate,
    updateProject: updateProjectMutation.mutate,
    deleteProject: deleteProjectMutation.mutate,
  };
};
