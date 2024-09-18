"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
// import { Input className="h-4" } from "@/shared/ui/Input className="h-4"";
import { Button } from "@/shared/ui/button";
import { UUID } from "crypto";

import useUserStore from "@/entity/user/user.store";

import LoadingSpinner from "@/shared/ui/custom/LoadingSpinner";
// import { Input className="h-4"Skeletons } from "./Skeletons";
import { useAccountController } from "@/entity/account/account.controller";
import { useUserController } from "@/entity/user/user.controller";
import CredentialEntity from "@/entity/credential/credential.interface";
import WalletEntity from "@/entity/wallet/wallet.interface";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { cn } from "@/shared/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { Skeleton } from "@/shared/ui/skeleton";
import { Input } from "@/shared/ui/input";
import Block from "@/shared/ui/containers/Block";
import Description from "../../shared/ui/custom/Description";

interface Props {
  onSuccessfulSubmit: () => void;
  id: string;
}

// Валидационная схема для формы
const CredentialSchema = z.object({
  social: z.enum(["TWITTER", "DISCORD", "MAIL"]),
  login: z.string(),
  password: z.string(),
  subscribers: z.number().optional(),
});

// Define the Wallet schema
const WalletSchema = z.object({
  type: z.enum(["ETHEREUM", "BITCOIN"]),
  address: z.string().min(1),
  phrase: z.string(),
});

// Define the main schema
const schema = z.object({
  userId: z.string().min(1),
  credentials: z
    .array(CredentialSchema)
    .length(3, { message: "Должно быть ровно 3 учетные записи" }),
  wallets: z
    .array(WalletSchema)
    .length(2, { message: "Должно быть ровно 2 кошелька" }),
});

export default function EditAccountForm({ onSuccessfulSubmit, id }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { account, updateAccount } = useAccountController(id);
  const { Users, isUserLoading } = useUserController();

  const { userState } = useUserStore();
  // Инициализация формы с помощью react-hook-form и zod
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      credentials: [
        {
          social: "TWITTER",
          login: "",
          password: "",
          subscribers: 1,
        },
        { social: "DISCORD", login: "", password: "" },
        {
          social: "MAIL",
          login: "",
          password: "",
        },
      ],
      wallets: [
        {
          type: "ETHEREUM",
          address: "",
          phrase: "",
        },
        {
          type: "BITCOIN",
          address: "",
          phrase: "",
        },
      ],
    },
  });

  useEffect(() => {
    if (account) {
      form.reset({
        userId: account.user.id || "",
        credentials: [
          {
            social: "TWITTER",
            login: account.credentials[0].login,
            password: account.credentials[0].password,
            subscribers: account.credentials[0].subscribers as number,
          },
          {
            social: "DISCORD",
            login: account.credentials[1].login,
            password: account.credentials[1].password,
          },
          {
            social: "MAIL",
            login: account.credentials[2].login,
            password: account.credentials[2].password,
          },
        ],
        wallets: [
          {
            type: "ETHEREUM",
            address: account.wallets[0].address,
            phrase: account.wallets[0].phrase,
          },
          {
            type: "BITCOIN",
            address: account.wallets[1].address,
            phrase: account.wallets[1].phrase,
          },
        ],
      });
    }
  }, [account, form]);

  // Функция для отправки формы
  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    if (!userState) return;

    try {
      // Создание отчёта
      const res = await updateAccount({
        id: id as UUID,
        data: {
          userId: values.userId as UUID,
          credentials: values.credentials.map((cred) => ({
            social: cred.social,
            login: cred.login,
            password: cred.password,
            subscribers: cred.subscribers ?? null,
          })) as Partial<CredentialEntity>[], // Add Partial here
          wallets: values.wallets.map((wallet) => ({
            type: wallet.type,
            address: wallet.address,
            phrase: wallet.phrase,
          })) as Partial<WalletEntity>[], // Add Partial here
        },
      });

      console.log(res);
      form.reset(); // Очистка формы после успешной отправки
      onSuccessfulSubmit();
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-lg flex flex-col"
      >
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пользователь</FormLabel>
              <FormControl>
                <Carousel className="w-full">
                  {isUserLoading ? (
                    <CarouselContent>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-1/4 sm:basis-1/6 justify-center flex"
                        >
                          <Skeleton className="h-[48px] w-[120px] rounded-[20px]" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  ) : (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <CarouselContent>
                        {Users?.map((user, index) => (
                          <CarouselItem
                            key={index}
                            className="basis-1/4 sm:basis-1/6 justify-center flex"
                          >
                            <RadioGroupItem
                              value={user.id}
                              id={user.id}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={user.id}
                              className={cn(
                                "block p-[10px] bg-secondary rounded-[20px] cursor-pointer transition-all border-2",
                                field.value === user.id
                                  ? "border-primary-100"
                                  : "border-secondary"
                              )}
                            >
                              {user.telegram.username}
                            </label>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </RadioGroup>
                  )}
                </Carousel>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="credentials"
          render={() => (
            <div className="flex flex-col gap-sm">
              <Block className="bg-secondary">
                <Description>Твиттер</Description>
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Twitter Login"
                      {...form.register(`credentials.0.login`)}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Twitter Password"
                      {...form.register(`credentials.0.password`)}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </Block>
              <Block className="bg-secondary">
                <Description>Дискорд</Description>

                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Discord Login"
                      {...form.register(`credentials.1.login`)}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Discord Password"
                      {...form.register(`credentials.1.password`)}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </Block>
              <Block className="bg-secondary">
                <Description>Почта</Description>
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Mail Login"
                      {...form.register(`credentials.2.login`)}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Mail Password"
                      {...form.register(`credentials.2.password`)}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </Block>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="wallets"
          render={() => (
            <div className="flex flex-row gap-sm">
              <Block className="bg-secondary w-full">
                <Description>Ethereum</Description>
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Ethereum Address"
                      {...form.register(`wallets.0.address`)}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>Фраза</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Ethereum Phrase"
                      {...form.register(`wallets.0.phrase`)}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </Block>
              <Block className="bg-secondary w-full">
                <Description>Bitcoin</Description>
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Bitcoin Address"
                      {...form.register(`wallets.1.address`)}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel>Фраза</FormLabel>
                  <FormControl>
                    <Input
                      className="h-4"
                      placeholder="Bitcoin Phrase"
                      {...form.register(`wallets.1.phrase`)}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </Block>
            </div>
          )}
        />
        {/* Кнопка отправки */}
        <Button disabled={!form.formState.isValid || loading}>
          {loading ? <LoadingSpinner /> : "Изменить"}
        </Button>
      </form>
    </Form>
  );
}
