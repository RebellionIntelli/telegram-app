import TelegramEntity from "../telegram/telegram.interface";

export interface CreateUserDto
  extends Omit<TelegramEntity, "id" | "created_at" | "updated_at"> {}
