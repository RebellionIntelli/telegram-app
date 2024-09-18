import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { AccountTable } from "./AccountTable";
import AdminHeader, { BreadcrumbItem } from "@/widget/admin/AdminHeader";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import CustomDrawer from "@/shared/ui/custom/Drawer";
import CreateAccountForm from "@/widget/admin/CreateAccountForm";

export default function MainContent() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Админ-панель", href: "/admin" },
    { name: "Проекты", href: "/admin/projects" },
  ];
  return (
    <div className="p-5 pl-[76px] w-screen h-screen flex flex-col gap-lg bg-secondary">
      <AdminHeader breadcrumbs={breadcrumbs} />
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <Card className="w-full">
          <CardHeader className="w-full justify-between items-center flex flex-row">
            <div>
              <CardTitle className="w-full">Аккаунты</CardTitle>
              <CardDescription className="w-full">
                Управление аккаунтами и их данными и доступами
              </CardDescription>
            </div>
            <CustomDrawer
              data={{}}
              description={"Добавление нового аккаунта"}
              form={CreateAccountForm}
              id={"1"}
              header={{ colored: "аккаунт", neutral: "Добавить" }}
              trigger={
                <Button size={"sm"} className="items-center gap-xs">
                  Создать <PlusCircle size={20} />
                </Button>
              }
            />
          </CardHeader>
          <CardContent className="p-0 m-0">
            <AccountTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
