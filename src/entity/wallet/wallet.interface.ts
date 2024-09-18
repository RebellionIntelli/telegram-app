import BaseEntity from "@/shared/types/base-entity.interface";

interface WalletEntity extends BaseEntity {
  type: "ETHEREUM" | "BITCOIN";
  address: string;
  phrase: string;
}

export default WalletEntity;
