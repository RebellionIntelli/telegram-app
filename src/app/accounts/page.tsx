"use client";
import Screen from "@/shared/ui/containers/Screen";
import Heading from "@/shared/ui/custom/Heading";
import ErrorScreen, {
  CustomErrorResponse,
} from "@/widget/error-screen/ErrorScreen";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/shared/ui/button";
import CustomDrawer from "@/shared/ui/custom/Drawer";
import { useAccountController } from "@/entity/account/account.controller";
import Block from "@/shared/ui/containers/Block";
import { AccountSkeleton } from "./Skeletons";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import AccountForm from "@/widget/account-form/AccountForm";
import Navigation from "@/widget/navigation/Navigation";
import Profile from "@/widget/Profile/Profile";
import useUserStore from "@/entity/user/user.store";

const AccountsPage = () => {
  const { userState } = useUserStore();
  const { telegramAccounts, accountError, isAccountLoading } =
    useAccountController(userState?.id);

  const router = useRouter();

  if (accountError) {
    return (
      <ErrorScreen
        error={accountError as AxiosError<CustomErrorResponse>}
        action={router.refresh}
      />
    );
  }
  console.log(telegramAccounts);
  return (
    <Screen className="flex flex-col justify-between h-full max-h-screen">
      <Profile />
      <section className="flex flex-col gap-lg justify-center items-center flex-grow w-full overflow-auto">
        <Heading>Аккаунты</Heading>
        {isAccountLoading && !telegramAccounts ? (
          <section className="flex flex-col gap-xs w-full overflow-hidden h-screen">
            <div className="flex flex-col gap-sm flex-grow overflow-y-auto">
              <AccountSkeleton />
              <AccountSkeleton />
              <AccountSkeleton />
            </div>
          </section>
        ) : (
          <>
            {telegramAccounts && telegramAccounts.length < 0 ? (
              <>Нет аккаунтов</>
            ) : (
              <section className="flex flex-col gap-xs w-full overflow-hidden h-screen">
                <div className="flex flex-col gap-sm flex-grow overflow-y-auto">
                  {telegramAccounts?.map((account, index) => (
                    <CustomDrawer
                      id="1"
                      header={{ colored: "аккаунта", neutral: "Данные" }}
                      trigger={
                        <Button
                          variant={"ghost"}
                          size={"sm"}
                          className="w-full p-1 rounded-[24px] hover:bg-primary-40"
                        >
                          <Block
                            key={index}
                            className="flex-row items-center cursor-pointer w-full"
                          >
                            <Avatar className="h-[50px] w-[50px]">
                              <AvatarFallback className="text-neutral-0 bg-primary-80 font-black text-[20px] uppercase">
                                {account.credentials[0].login.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-col gap-xs">
                              <p className="font-bold flex flex-row gap-sm">
                                @{account.credentials[0].login}
                                <p className="text-neutral-40 font-medium">
                                  {account.credentials[1].login}
                                </p>
                              </p>
                              <p className="text-neutral-40 font-medium">
                                {account.credentials[2].login}
                              </p>
                            </div>
                          </Block>
                        </Button>
                      }
                      description={
                        <>
                          <span className="text-error">Важно:</span> Не
                          сообщайте и не меняйте данные аккаунта.{" "}
                          <span className="text-error font-semibold">
                            Это запрещено и карается блокировкой
                          </span>
                        </>
                      }
                      data={account}
                      form={AccountForm}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </section>
      <Navigation />
    </Screen>
  );
};

export default AccountsPage;
