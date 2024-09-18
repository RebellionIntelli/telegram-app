import { UUID } from "crypto";

interface BaseEntity {
  id: UUID;
  created_at: string;
  updated_at: string;
}

export default BaseEntity;
