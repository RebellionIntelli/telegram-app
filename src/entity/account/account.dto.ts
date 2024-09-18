import { UUID } from "crypto";
import CredentialEntity from "../credential/credential.interface";
import WalletEntity from "../wallet/wallet.interface";

export interface CreateAccountDto {
  userId: UUID;
  credentials: CredentialEntity[];
  wallets: WalletEntity[];
}

export interface UpdateAccountDto {
  userId: UUID;
  credentials: Partial<CredentialEntity>[];
  wallets: Partial<WalletEntity>[];
}
