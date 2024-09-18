import { baseApi } from "@/shared/api/base.api";
import UserEntity from "./user.interface";
import { UUID } from "crypto";
import { CreateUserDto } from "./user.dto";

class UserService {
  static async getUsers(): Promise<UserEntity[]> {
    const response = await baseApi.get<UserEntity[]>("/Users");
    return response.data;
  }

  static async getUserById(id: UUID): Promise<UserEntity> {
    const response = await baseApi.get<UserEntity>(`/Users/${id}`);
    return response.data;
  }

  static async createUser(data: CreateUserDto): Promise<UserEntity> {
    const response = await baseApi.post<UserEntity>("/Users", data);
    return response.data;
  }

  static async updateUser(
    id: UUID,
    data: Partial<UserEntity>
  ): Promise<UserEntity> {
    const response = await baseApi.put<UserEntity>(`/Users/${id}`, data);
    return response.data;
  }

  static async deleteUser(id: UUID): Promise<void> {
    await baseApi.delete(`/Users/${id}`);
  }
}

export default UserService;
