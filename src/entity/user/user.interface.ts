import BaseEntity from "@/shared/types/base-entity.interface";
import TelegramEntity from "../telegram/telegram.interface";
import MetaEntity from "../meta/meta.interface";
import AccountEntity from "../account/account.interface";
import ReportWhitelistEntity from "../report-wl/report-wl.interface";
import ReportEntity from "../report/report.interface";

interface UserEntity extends BaseEntity {
  telegram: TelegramEntity;
  meta: MetaEntity;
  accounts: AccountEntity[];
  reports: {
    common: ReportEntity[];
    wl: ReportWhitelistEntity[];
  };
}

export default UserEntity;
