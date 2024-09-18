import BaseEntity from "@/shared/types/base-entity.interface";
import WalletEntity from "../wallet/wallet.interface";
import CredentialEntity from "../credential/credential.interface";
import UserEntity from "../user/user.interface";

interface AccountEntity extends BaseEntity {
  status: "SHADOWBAN" | "BANNED" | "NOT_AUTHORIZED" | null;
  credentials: CredentialEntity[];
  wallets: WalletEntity[];
  user: UserEntity;
}

export default AccountEntity;
