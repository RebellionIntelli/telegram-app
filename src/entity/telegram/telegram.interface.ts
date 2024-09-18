import BaseEntity from "@/shared/types/base-entity.interface";

interface TelegramEntity extends BaseEntity {
  telegramId: number;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
}

export default TelegramEntity;
