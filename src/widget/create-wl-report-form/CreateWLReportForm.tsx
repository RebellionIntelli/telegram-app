"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { cn } from "@/shared/lib/utils";
import { UUID } from "crypto";
import { Skeleton } from "@/shared/ui/skeleton";
import { useProjectController } from "@/entity/project/project.controller";
import { useAccountController } from "@/entity/account/account.controller";
import { useReportWLController } from "@/entity/report-wl/report-wl.controller";
import useUserStore from "@/entity/user/user.store";
import LoadingSpinner from "@/shared/ui/custom/LoadingSpinner";
import WalletEntity from "@/entity/wallet/wallet.interface";
import { imagesApi } from "@/shared/api/images.api";
import getFileWord from "@/shared/lib/get-file-word";
import { Input } from "@/shared/ui/input";

interface Props {
  onSuccessfulSubmit: () => void;
}

// Валидационная схема для формы
const schema = z.object({
  projectId: z.string().min(1, "Проект обязателен").uuid(),
  accountId: z.string().min(1, "Аккаунт обязателен").uuid(),
  walletId: z.string().min(1, "Кошелек обязателен").uuid(),
  files: z
    .custom<FileList>()
    .refine(
      (files) => files?.length > 0,
      "Пожалуйста, загрузите хотя бы один файл."
    ),
});

export default function CreateWLReportForm({ onSuccessfulSubmit }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedWallets, setSelectedWallets] = useState<any[]>([]);
  const { Projects } = useProjectController();
  const { isAccountLoading, accounts } = useAccountController();
  const { createReportWL } = useReportWLController();
  const { userState } = useUserStore();
  const [files, setFiles] = useState<number>(0);

  // Инициализация формы с помощью react-hook-form и zod
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectId: "",
      accountId: "",
      walletId: "",
    },
  });

  // Функция для обновления списка кошельков при выборе аккаунта
  const handleAccountChange = (accountId: string) => {
    if (!accounts) {
      return;
    }
    const selectedAccount = accounts.find(
      (account) => account.id === accountId
    );
    setSelectedWallets(selectedAccount?.wallets || []); // Обновляем кошельки
    form.setValue("accountId", accountId); // Устанавливаем выбранный аккаунт
    form.setValue("walletId", ""); // Сбрасываем выбранный кошелек
  };

  // Функция для отправки формы
  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log("clicked");
    try {
      setLoading(true);
      const filesUrls = await imagesApi(values.files);

      console.log("sumbited");
      console.log(userState);
      if (!userState) return;
      console.log("creating");
      // Создание отчёта
      await createReportWL({
        title: "Получен вайтлист",
        accountId: values.accountId as UUID,
        walletId: values.walletId as UUID,
        projectId: values.projectId as UUID,
        userId: userState.id,
        files: filesUrls,
      });

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
        {/* Поле для выбора проекта */}
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Проект</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите проект" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Projects?.map((project) => (
                    <SelectItem
                      key={project.id}
                      value={project.id}
                      className="flex gap-xs flex-row"
                    >
                      <div className="flex gap-xs flex-row">
                        <Image
                          alt={project.name}
                          src={"https://i.ibb.co/cFdKyhj/placeholder-dark.png"}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <p
                          style={{
                            color: project.color,
                          }}
                        >
                          {project.name}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Поле для выбора аккаунта */}
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аккаунт</FormLabel>
              <FormControl>
                <Carousel className="w-full">
                  {isAccountLoading ? (
                    <CarouselContent>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-1/4 sm:basis-1/6 justify-center flex"
                        >
                          <Skeleton className="h-[70px] w-[70px] rounded-[20px]" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  ) : (
                    <RadioGroup
                      onValueChange={(value) => handleAccountChange(value)}
                      value={field.value}
                    >
                      <CarouselContent>
                        {accounts?.map((account, index) => (
                          <CarouselItem
                            key={index}
                            className="basis-1/4 sm:basis-1/6 justify-center flex"
                          >
                            <RadioGroupItem
                              value={account.id}
                              id={account.id}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={account.id}
                              className={cn(
                                "block p-[10px] h-[70px] w-[70px] bg-secondary rounded-[20px] cursor-pointer transition-all border-2",
                                field.value === account.id
                                  ? "border-primary-100"
                                  : "border-secondary"
                              )}
                            >
                              <Image
                                alt={account.id}
                                src={
                                  "https://i.ibb.co/cFdKyhj/placeholder-dark.png"
                                }
                                width={50}
                                height={50}
                                className={cn(
                                  "rounded-full transition-all",
                                  field.value === account.id ? "scale-110" : ""
                                )}
                              />
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

        {/* Поле для выбора кошелька */}
        <FormField
          control={form.control}
          name="walletId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Кошелёк</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedWallets.length}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedWallets.length
                          ? "Выберите кошелёк"
                          : "Сначала выберите аккаунт"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectedWallets.length > 0 ? (
                    selectedWallets.map((wallet: WalletEntity) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.type}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value={"Нет доступных кошельков"} disabled>
                      Нет доступных кошельков
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="files"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Файлы отчёта</FormLabel>
              <FormControl className="relative inline-block">
                <>
                  <label
                    htmlFor="file-input"
                    className="w-full h-[80px] border-dashed border-neutral-40 border rounded-[16px] flex justify-center items-center gap-xs text-[16px] font-semibold text-neutral-40"
                  >
                    Выберите файлы:{" "}
                    <span className="font-normal">
                      {files === 0
                        ? "файлы не выбраны"
                        : `${files} ${getFileWord(files)} загружено`}
                    </span>
                  </label>
                  <Input
                    id="file-input"
                    className="sr-only hidden"
                    type="file"
                    multiple
                    accept="image/*, application/pdf"
                    onChange={(e) => {
                      const selectedFiles = e.target.files;
                      if (selectedFiles) {
                        onChange(selectedFiles);
                        setFiles(selectedFiles.length);
                      }
                    }}
                    {...field}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Кнопка отправки */}
        <Button disabled={!form.formState.isValid || loading}>
          {loading ? <LoadingSpinner /> : "Отправить"}
        </Button>
      </form>
    </Form>
  );
}
