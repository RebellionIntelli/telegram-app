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
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { UUID } from "crypto";
import { useProjectController } from "@/entity/project/project.controller";

import useUserStore from "@/entity/user/user.store";
import { imagesApi } from "@/shared/api/images.api";
import getFileWord from "@/shared/lib/get-file-word";
import LoadingSpinner from "@/shared/ui/custom/LoadingSpinner";
import { InputSkeletons } from "./Skeletons";

interface Props {
  onSuccessfulSubmit: () => void;
  id: string;
}

// Валидационная схема для формы
const schema = z.object({
  name: z.string().min(1, "Название обязательно"),
  color: z.string().min(1, "Цвет обязателен"),
  link: z.string().min(1, "Ссылка на канал обязательна"),
  chat: z.string().min(1, "Ссылка на чат обязательна"),

  files: z
    .custom<FileList>()
    .refine(
      (files) => files?.length > 0,
      "Пожалуйста, загрузите хотя бы один файл."
    ),
});

export default function EditProjectForm({ onSuccessfulSubmit, id }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { Project, updateProject } = useProjectController(id);
  const { userState } = useUserStore();
  const [files, setFiles] = useState<number>(0);
  // Инициализация формы с помощью react-hook-form и zod
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      chat: "",
      color: "",
      link: "",
      name: "",
    },
  });

  useEffect(() => {
    if (Project) {
      form.reset({
        chat: Project.chat || "",
        color: Project.color || "",
        link: Project.link || "",
        name: Project.name || "",
      });
    }
  }, [Project, form]);

  // Функция для отправки формы
  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    if (!userState) return;

    try {
      // Загрузка файлов через API
      const filesUrls = await imagesApi(values.files);
      console.log("Sending update request for project ID:", id);
      // Создание отчёта
      const res = await updateProject({
        id: id as UUID,
        data: {
          name: values.name,
          color: values.color,
          logotype: filesUrls[0],
          link: values.link,
          chat: values.chat,
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
        {/* Поле для ввода темы отчёта */}
        <div className="flex flex-row gap-sm">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Название проекта</FormLabel>
                {Project ? (
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Введите название проекта"
                      {...field}
                    />
                  </FormControl>
                ) : (
                  <InputSkeletons />
                )}

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-[60px]">
                <FormLabel>Цвет</FormLabel>
                {Project ? (
                  <FormControl>
                    <Input
                      placeholder="Выберите цвет проекта"
                      {...field}
                      type="color"
                    />
                  </FormControl>
                ) : (
                  <InputSkeletons w="60px" />
                )}

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на проект</FormLabel>
              {Project ? (
                <FormControl>
                  <Input placeholder="Введите ссылку на проект" {...field} />
                </FormControl>
              ) : (
                <InputSkeletons />
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на чат</FormLabel>
              {Project ? (
                <FormControl>
                  <Input placeholder="Введите ссылку на чат" {...field} />
                </FormControl>
              ) : (
                <InputSkeletons />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Поле для загрузки файлов */}
        <FormField
          control={form.control}
          name="files"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Фото проекта</FormLabel>
              <FormControl className="relative inline-block">
                <>
                  <label
                    htmlFor="file-input"
                    className={
                      value +
                      " " +
                      "w-full h-[80px] border-dashed border-neutral-40 border rounded-[16px] flex justify-center items-center gap-xs text-[16px] font-semibold text-neutral-40"
                    }
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
          {loading ? <LoadingSpinner /> : "Изменить"}
        </Button>
      </form>
    </Form>
  );
}
