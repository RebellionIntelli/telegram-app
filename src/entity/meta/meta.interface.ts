import BaseEntity from "@/shared/types/base-entity.interface";
import { UUID } from "crypto";

interface MetaEntity extends BaseEntity {
  id: UUID;
  teamName: string;
  role: string;
}

export default MetaEntity;
