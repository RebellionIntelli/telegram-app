"use client";
import { Edit } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import CustomDrawer from "@/shared/ui/custom/Drawer";
import { useAccountController } from "@/entity/account/account.controller";
import { AccountRowSkeleton } from "./Skeletons";
import CopyChildren from "@/shared/ui/custom/CopyChildren";
import EditAccountForm from "@/widget/admin/EditAccountForm";

export function AccountTable() {
  const { accounts, isAccountLoading } = useAccountController();

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Пользователь</TableHead>
          <TableHead>Соц-сети</TableHead>
          <TableHead className="hidden lg:table-cell">Кошельки</TableHead>
          <TableHead className="hidden lg:table-cell">Статус</TableHead>
          <TableHead>
            <span className="sr-only">Действия</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isAccountLoading && !accounts ? (
          <>
            <AccountRowSkeleton />
          </>
        ) : (
          accounts && (
            <>
              {accounts.map((account, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {account.user.telegram.username}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col gap-md">
                      <ul className="flex flex-col gap-sm font-medium text-[14px] text-neutral-40">
                        <li className="flex flex-col gap-xs">
                          Логин:{" "}
                          <CopyChildren>
                            {account.credentials[0].login}
                          </CopyChildren>
                        </li>
                        <li className="flex flex-col gap-xs">
                          Пароль:{" "}
                          <CopyChildren>
                            {account.credentials[0].password}
                          </CopyChildren>
                        </li>
                      </ul>
                      <ul className="flex flex-col gap-sm font-medium text-[14px] text-neutral-40">
                        <li className="flex flex-col gap-xs">
                          Логин:{" "}
                          <CopyChildren>
                            {account.credentials[1].login}
                          </CopyChildren>
                        </li>
                        <li className="flex flex-col gap-xs">
                          Пароль:{" "}
                          <CopyChildren>
                            {account.credentials[1].password}
                          </CopyChildren>
                        </li>
                      </ul>
                      <ul className="flex flex-col gap-sm font-medium text-[14px] text-neutral-40">
                        <li className="flex flex-col gap-xs text-wrap">
                          Почта:{" "}
                          <CopyChildren>
                            {account.credentials[2].login}
                          </CopyChildren>
                        </li>
                        <li className="flex flex-col gap-xs">
                          Пароль:{" "}
                          <CopyChildren>
                            {account.credentials[2].password}
                          </CopyChildren>
                        </li>
                      </ul>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium hidden lg:table-cell">
                    <ul className="flex flex-col gap-sm font-medium text-[16px] text-neutral-40">
                      <li className="flex flex-row gap-xs">
                        Биткоин:{" "}
                        <CopyChildren className={"max-w-10 truncate"}>
                          {account.wallets[0].address}
                        </CopyChildren>
                      </li>
                      <li className="flex flex-row gap-xs">
                        Фраза:{" "}
                        <CopyChildren className={"max-w-10 truncate"}>
                          {account.wallets[0].phrase}
                        </CopyChildren>
                      </li>
                      <li className="flex flex-row gap-xs ">
                        Эфир:{" "}
                        <CopyChildren className={"max-w-10 truncate"}>
                          {account.wallets[1].address}
                        </CopyChildren>
                      </li>
                      <li className="flex flex-row gap-xs">
                        Фраза:{" "}
                        <CopyChildren className={"max-w-10 truncate"}>
                          {account.wallets[1].phrase}
                        </CopyChildren>
                      </li>
                    </ul>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge
                      className="text-neutral-0"
                      style={{
                        background:
                          account.status === null ? "#00CA48" : "#FC9828",
                      }}
                    >
                      {account.status === null ? "Без банов" : account.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <CustomDrawer
                      data={{}}
                      description={`Изменить аккаунт ${account.credentials[0].login}`}
                      form={EditAccountForm}
                      id={account.id}
                      header={{ colored: "аккаунт", neutral: "Изменить" }}
                      trigger={
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="h-8 w-8 p-0"
                        >
                          <Edit />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )
        )}
      </TableBody>
    </Table>
  );
}
