import { baseApi } from "@/shared/api/base.api";
import AccountEntity from "./account.interface";
import { UUID } from "crypto";
import { CreateAccountDto, UpdateAccountDto } from "./account.dto";
import { CreateAccountRo } from "./account.ro";

class AccountService {
  static async getAccounts(): Promise<AccountEntity[]> {
    const response = await baseApi.get<AccountEntity[]>("/accounts");
    return response.data;
  }

  static async getAccountById(id: UUID): Promise<AccountEntity> {
    const response = await baseApi.get<AccountEntity>(`/accounts/${id}`);
    return response.data;
  }
  static async getAccountsByUserId(id: UUID): Promise<AccountEntity[]> {
    const response = await baseApi.get<AccountEntity[]>(`/accounts/user/${id}`);
    return response.data;
  }

  static async createAccount(data: CreateAccountDto): Promise<CreateAccountRo> {
    const response = await baseApi.post<CreateAccountRo>("/accounts", data);
    return response.data;
  }

  static async updateAccount(
    id: UUID,
    data: Partial<UpdateAccountDto> // Partial for update flexibility
  ): Promise<AccountEntity> {
    const response = await baseApi.patch<AccountEntity>(
      `/accounts/${id}`,
      data
    );
    return response.data;
  }

  static async deleteAccount(id: UUID): Promise<void> {
    await baseApi.delete(`/accounts/${id}`);
  }
}

export default AccountService;
