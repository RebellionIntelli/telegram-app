import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UUID } from "crypto";
import AccountService from "./account.service";
import { UpdateAccountDto } from "./account.dto";
export const useAccountController = (id?: string) => {
  const queryClient = useQueryClient();

  const AccountQuery = useQuery({
    queryKey: ["accounts", id],
    queryFn: () => AccountService.getAccountById(id as UUID),
    enabled: !!id,
  });

  const AccountsQuery = useQuery({
    queryKey: ["accounts"],
    queryFn: AccountService.getAccounts,
  });

  const createAccountMutation = useMutation({
    mutationFn: AccountService.createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });

  const updateAccountMutation = useMutation({
    mutationFn: ({ id, data }: { id: UUID; data: Partial<UpdateAccountDto> }) =>
      AccountService.updateAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: AccountService.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });

  return {
    account: AccountQuery.data,
    accounts: AccountsQuery.data,
    isAccountLoading: AccountsQuery.isLoading || AccountQuery.isLoading,
    accountError: AccountsQuery.error || AccountQuery.error,
    createAccount: createAccountMutation.mutate,
    updateAccount: updateAccountMutation.mutate,
    deleteAccount: deleteAccountMutation.mutate,
  };
};
