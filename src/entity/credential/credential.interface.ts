import BaseEntity from "@/shared/types/base-entity.interface";

interface CredentialEntity extends BaseEntity {
  social: "TWITTER" | "DISCORD" | "MAIL";
  login: string;
  password: string;
  subscribers: number | null;
}

export default CredentialEntity;
