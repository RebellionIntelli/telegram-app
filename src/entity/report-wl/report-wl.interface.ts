import BaseEntity from "@/shared/types/base-entity.interface";
import ProjectEntity from "../project/project.interface";
import AccountEntity from "../account/account.interface";
import WalletEntity from "../wallet/wallet.interface";
export interface StatusENUM {
  status: "WAIT" | "REJECTED" | "ACCEPTED";
}
interface ReportWhitelistEntity extends BaseEntity {
  status: "WAIT" | "REJECTED" | "ACCEPTED";
  title: string;
  project: ProjectEntity;
  account: AccountEntity;
  wallet: WalletEntity;
  files: string[];
}

export default ReportWhitelistEntity;
