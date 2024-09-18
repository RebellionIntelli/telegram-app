import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { ProductTable } from "./ProductTable";
import AdminHeader, { BreadcrumbItem } from "@/widget/admin/AdminHeader";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import CustomDrawer from "@/shared/ui/custom/Drawer";
import CreateProjectForm from "@/widget/admin/CreateProjectForm";

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
              <CardTitle className="w-full">Проекты</CardTitle>
              <CardDescription className="w-full">
                Управление серверами и проектами
              </CardDescription>
            </div>
            <CustomDrawer
              data={{}}
              description={"Добавление нового проекта"}
              form={CreateProjectForm}
              id={"1"}
              header={{ colored: "проект", neutral: "Добавить" }}
              trigger={
                <Button size={"sm"} className="items-center gap-xs">
                  Добавить проект <PlusCircle size={20} />
                </Button>
              }
            />
          </CardHeader>
          <CardContent className="p-0 m-0">
            <ProductTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
