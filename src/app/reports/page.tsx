"use client";
import { useReportController } from "@/entity/report/report.controller";
import Screen from "@/shared/ui/containers/Screen";
import Heading from "@/shared/ui/custom/Heading";
import ErrorScreen, {
  CustomErrorResponse,
} from "@/widget/error-screen/ErrorScreen";
import LastReport from "@/widget/last-report/LastReport";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { LastReportSkeleton, AllTimeReportsSkeleton } from "./Skeletons";
import AllTimeReports from "@/widget/all-time-reports/AllTimeReports";
import { Button } from "@/shared/ui/button";
import CustomDrawer from "@/shared/ui/custom/Drawer";
import CreateWLReportForm from "@/widget/create-wl-report-form/CreateWLReportForm";
import CreateReportForm from "@/widget/create-report-form/CreateReportForm";
import { useReportWLController } from "@/entity/report-wl/report-wl.controller";
import { CombinedReportEntity } from "@/entity/report/report.interface";
import Navigation from "@/widget/navigation/Navigation";
import Profile from "@/widget/Profile/Profile";
import useUserStore from "@/entity/user/user.store";

const ReportsPage = () => {
  const { userState } = useUserStore();
  const { Reports, ReportError, isReportLoading } = useReportController(
    userState?.id
  );
  const { ReportWLs, ReportWLError, isReportWLLoading } = useReportWLController(
    userState?.id
  );

  const router = useRouter();
  // Combine reports and reportWLs
  let AllReports: CombinedReportEntity[] = [];

  // Check for loading states
  if (!isReportLoading && !isReportWLLoading) {
    // Check for errors
    if (ReportError || ReportWLError) {
      console.error("Error fetching reports:", ReportError || ReportWLError);
    } else {
      // Combine and sort reports and reportWLs
      AllReports = [...(Reports || []), ...(ReportWLs || [])].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  }

  return (
    <Screen className="flex flex-col justify-between h-full max-h-screen">
      <Profile />
      <section className="flex flex-col gap-lg justify-center items-center flex-grow w-full overflow-auto">
        <Heading>Отчёты</Heading>
        {isReportLoading && !Reports ? (
          <>
            <LastReportSkeleton />
            <AllTimeReportsSkeleton />
          </>
        ) : (
          <>
            {Reports && Reports.length > 0 ? (
              <>
                <LastReport reports={Reports} />
                <AllTimeReports reports={AllReports} />
              </>
            ) : (
              <section className="flex flex-col gap-xs w-full overflow-hidden h-screen">
                <div className="flex flex-col gap-sm flex-grow overflow-y-auto">
                  Нет отчётов
                </div>
              </section>
            )}
          </>
        )}
      </section>
      <section className="w-full flex flex-col gap-sm">
        <CustomDrawer
          id="1"
          header={{ colored: "вайтлисте", neutral: "Отчёт о" }}
          trigger={
            <Button variant={"ghost"} size={"sm"} className="text-primary-100">
              Отчёт о вайтлисте
            </Button>
          }
          description={"Предоставьте отчёт о полученном вайтлисте"}
          data={{}}
          form={CreateWLReportForm}
        />
        <CustomDrawer
          data={{}}
          id="1"
          header={{ colored: "отчёт", neutral: "Отправьте" }}
          trigger={<Button>Добавить отчёт</Button>}
          description={"Предоставьте отчёт о проделанной работе"}
          form={CreateReportForm}
        />
      </section>
      <Navigation />
    </Screen>
  );
};

export default ReportsPage;
