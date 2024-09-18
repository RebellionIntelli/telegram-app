import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import AdminHeader, { BreadcrumbItem } from "@/widget/admin/AdminHeader";
import { ReportTable } from "./ReportTable";

export default function MainContent() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Админ-панель", href: "/admin" },
    { name: "Отчёты", href: "/admin/reports" },
  ];
  return (
    <div className="p-5 pl-[76px] w-screen h-screen flex flex-col gap-lg bg-secondary">
      <AdminHeader breadcrumbs={breadcrumbs} />
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <Card className="w-full">
          <CardHeader className="w-full justify-between items-center flex flex-row">
            <div>
              <CardTitle className="w-full">Отчёты</CardTitle>
              <CardDescription className="w-full">
                Управление отчётами и их валидацией
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0 m-0">
            <ReportTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
