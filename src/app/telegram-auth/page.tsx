"use client";

import { useUserController } from "@/entity/user/user.controller";
import useUserStore from "@/entity/user/user.store";
import Screen from "@/shared/ui/containers/Screen";
import LoadingSpinner from "@/shared/ui/custom/LoadingSpinner";
import ErrorScreen, {
  CustomErrorResponse,
} from "@/widget/error-screen/ErrorScreen";
import { AxiosError } from "axios";
import { UUID } from "crypto";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const TelegramAuthPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { User, UserError, isUserLoading } = useUserController(
    params.get("id") as UUID
  );

  const { setUserState } = useUserStore();

  // Эффект для обновления состояния и редиректа
  useEffect(() => {
    if (User) {
      setUserState(User);
      router.push("/"); // Редирект на главную страницу
    }
  }, [User, setUserState, router]);

  if (UserError) {
    console.log(UserError);
    return (
      <ErrorScreen
        action={router.refresh}
        error={UserError as AxiosError<CustomErrorResponse>}
      />
    );
  }

  if (isUserLoading) {
    return (
      <Screen className="justify-center items-center">
        <LoadingSpinner />
      </Screen>
    );
  }

  return null;
};

export default TelegramAuthPage;
