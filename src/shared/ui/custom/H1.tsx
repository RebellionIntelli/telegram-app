import { cn } from "@/shared/lib/utils";
import { ComponentProps } from "react";
interface Props extends ComponentProps<"h1"> {
  colored?: string;
}
const H1 = ({ children, colored, className, ...props }: Props) => {
  return (
    <p
      className={cn(
        className,
        "font-bold text-[36px] text-neutral-100 leading-[120%]"
      )}
      {...props}
    >
      {children}{" "}
      {colored && <span className="text-primary-100">{colored}</span>}
    </p>
  );
};

export default H1;
