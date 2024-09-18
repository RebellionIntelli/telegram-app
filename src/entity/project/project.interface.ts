import BaseEntity from "@/shared/types/base-entity.interface";

interface ProjectEntity extends BaseEntity {
  name: string;
  logotype: string;
  color: string;
  link?: string;
  chat: string;
}

export default ProjectEntity;
