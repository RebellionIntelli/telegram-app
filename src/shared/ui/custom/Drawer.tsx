"use client";
import { useState, ReactNode, FC } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { X } from "lucide-react";
import H1 from "./H1";
import Description from "./Description";

interface FormProps {
  onSuccessfulSubmit: () => void;
  id: string; // Изменено с id?: string на id: string
  data: any;
}

interface Props {
  trigger: ReactNode;
  form: FC<FormProps>;
  header: {
    colored: string;
    neutral: string;
  };
  description: string | ReactNode;
  id: string; // Изменено с id?: string на id: string
  data: any;
}

const CustomDrawer: FC<Props> = ({
  trigger,
  form: FormComponent,
  header,
  description,
  id,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerClose className="flex flex-row-reverse">
          <X className="text-primary-100" />
        </DrawerClose>
        <div className="flex flex-col gap-sm">
          <H1 colored={header.colored}>{header.neutral}</H1>
          <Description>{description}</Description>
        </div>
        <FormComponent
          onSuccessfulSubmit={() => setIsOpen(false)}
          id={id}
          data={data}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
