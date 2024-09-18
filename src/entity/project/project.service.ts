import { baseApi } from "@/shared/api/base.api";
import { UUID } from "crypto";
import ProjectEntity from "./project.interface";
import { CreateProjectDto } from "./project.dto";

class ProjectService {
  static async getProjects(): Promise<ProjectEntity[]> {
    const response = await baseApi.get<ProjectEntity[]>("/projects");
    return response.data;
  }

  static async getProjectById(id: UUID): Promise<ProjectEntity> {
    const response = await baseApi.get<ProjectEntity>(`/projects/${id}`);
    return response.data;
  }

  static async createProject(
    data: CreateProjectDto
  ): Promise<CreateProjectDto> {
    const response = await baseApi.post<CreateProjectDto>("/projects", data);
    return response.data;
  }

  static async updateProject(
    id: UUID,
    data: Partial<ProjectEntity>
  ): Promise<ProjectEntity> {
    const response = await baseApi.patch<ProjectEntity>(
      `/projects/${id}`,
      data
    );
    return response.data;
  }

  static async deleteProject(id: UUID): Promise<void> {
    await baseApi.delete(`/projects/${id}`);
  }
}

export default ProjectService;
