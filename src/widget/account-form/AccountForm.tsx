import AccountEntity from "@/entity/account/account.interface";
import Block from "@/shared/ui/containers/Block";
import Image from "next/image";
import CopyChildren from "@/shared/ui/custom/CopyChildren";

interface Props {
  onSuccessfulSubmit: () => void;
  data: AccountEntity;
}

export default function AccountForm({ onSuccessfulSubmit, data }: Props) {
  return (
    <div className="flex flex-col gap-lg">
      <Block className="bg-secondary">
        <div className="flex flex-row gap-xs font-bold text-[#5865F2]">
          <Image alt="" src={"/discord.svg"} width={24} height={24} />
          Discord
        </div>
        <ul className="flex flex-col gap-sm font-medium text-[16px] text-neutral-40">
          <li className="flex flex-row gap-xs">
            Логин:{" "}
            <span className="text-neutral-100">
              <CopyChildren>{data.credentials[1].login}</CopyChildren>
            </span>
          </li>
          <li className="flex flex-row gap-xs">
            Пароль:{" "}
            <span className="text-neutral-100">
              <CopyChildren>{data.credentials[1].password}</CopyChildren>
            </span>
          </li>
        </ul>
      </Block>
      <Block className="bg-secondary">
        <div className="flex flex-row gap-xs font-bold text-[#1D9CEB]">
          <Image alt="" src={"/twitter.svg"} width={24} height={24} />
          Twitter
        </div>
        <ul className="flex flex-col gap-sm font-medium text-[16px] text-neutral-40">
          <li className="flex flex-row gap-xs">
            Логин:{" "}
            <span className="text-neutral-100">
              <CopyChildren>{data.credentials[0].login}</CopyChildren>
            </span>
          </li>
          <li className="flex flex-row gap-xs">
            Пароль:{" "}
            <span className="text-neutral-100">
              <CopyChildren>{data.credentials[0].password}</CopyChildren>
            </span>
          </li>
        </ul>
      </Block>
      <Block className="bg-secondary">
        <div className="flex flex-row gap-xs font-bold text-primary-100">
          <Image alt="" src={"/mail.svg"} width={24} height={24} />
          Почта
        </div>
        <ul className="flex flex-col gap-sm font-medium text-[16px] text-neutral-40">
          <li className="flex flex-row gap-xs">
            Логин:{" "}
            <span className="text-neutral-100">
              <CopyChildren>{data.credentials[2].login}</CopyChildren>
            </span>
          </li>
          <li className="flex flex-row gap-xs">
            Пароль:{" "}
            <span className="text-neutral-100">
              <CopyChildren>{data.credentials[2].password}</CopyChildren>
            </span>
          </li>
        </ul>
      </Block>
    </div>
  );
}
