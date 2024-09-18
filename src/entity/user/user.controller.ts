import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UUID } from "crypto";
import UserEntity from "./user.interface";
import UserService from "./user.service";
export const useUserController = (id?: string) => {
  const queryClient = useQueryClient();

  const UserQuery = useQuery({
    queryKey: ["User", id],
    queryFn: () => UserService.getUserById(id as UUID),
    enabled: !!id,
  });

  const UsersQuery = useQuery({
    queryKey: ["Users"],
    queryFn: UserService.getUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: UserService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Users"],
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: UUID; data: Partial<UserEntity> }) =>
      UserService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Users"],
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Users"],
      });
    },
  });

  return {
    User: UserQuery.data,
    Users: UsersQuery.data,
    isUserLoading: UsersQuery.isLoading || UserQuery.isLoading,
    UserError: UsersQuery.error || UserQuery.error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  };
};
