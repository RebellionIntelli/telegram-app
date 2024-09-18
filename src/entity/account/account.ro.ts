import BaseEntity from "@/shared/types/base-entity.interface";
import CredentialEntity from "../credential/credential.interface";
import WalletEntity from "../wallet/wallet.interface";

export interface CreateAccountRo extends BaseEntity {
  status: null;
  credentials: CredentialEntity[];
  wallets: WalletEntity[];
  user: BaseEntity;
}
