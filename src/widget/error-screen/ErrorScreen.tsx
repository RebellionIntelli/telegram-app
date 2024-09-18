import Screen from "@/shared/ui/containers/Screen";
import H1 from "@/shared/ui/custom/H1";
import { AxiosError } from "axios";
import Image from "next/image";
import React from "react";
import Description from "../../shared/ui/custom/Description";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Info } from "lucide-react";

interface Props {
  action: () => void;
  error: AxiosError<CustomErrorResponse>; // Используем кастомный тип
}

export interface CustomErrorResponse {
  message: string | string[]; // Сообщение может быть строкой или массивом строк
  [key: string]: unknown; // Для других возможных полей
}

const ErrorScreen = ({ error }: Props) => {
  const errorMessage = Array.isArray(error.response?.data?.message)
    ? error.response?.data?.message[0] // Если это массив
    : error.response?.data?.message || "Неизвестная ошибка";
  return (
    <Screen className="justify-between items-center">
      <div className="not-sr-only"></div>
      <div className="flex flex-col gap-md items-center justify-center">
        <Image
          alt=""
          src={"/placeholder.png"}
          height={280}
          width={280}
          className="w-fit"
        />
        <div className="flex text-center flex-col gap-sm items-center justify-center">
          <H1>Произошла ошибка</H1>
          <Description>
            Попробуйте позже или свяжитесь с поддержкой для дополнительной
            информации.
          </Description>
          <Description>Код ошибки: {errorMessage}</Description>
        </div>
      </div>
      <Link href={"https://t.me/purpletooth"} className="w-full">
        <Button className="w-full gap-xs">
          <Info />
          Связаться с поддержкой
        </Button>
      </Link>
    </Screen>
  );
};

export default ErrorScreen;
