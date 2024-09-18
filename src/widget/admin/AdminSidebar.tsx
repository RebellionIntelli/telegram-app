"use client";
import Link from "next/link";
import {
  Home,
  ShoppingCart,
  Users2,
  Settings,
  Target,
  FileCheck,
  LucideIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r border-neutral-20 bg-neutral-0 flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <SidebarIcon icon={Home} label="Dashboard" isActive />
        <SidebarIcon icon={ShoppingCart} label="Orders" />
        <SidebarIcon icon={FileCheck} label="Reports" />
        <SidebarIcon icon={Users2} label="Accounts" />
        <SidebarIcon icon={Target} label="Projects" />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <SidebarIcon icon={Settings} label="Settings" />
      </nav>
    </aside>
  );
}

function SidebarIcon({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}) {
  const router = usePathname();
  const isActive = router === `/admin/${label.toLowerCase()}`;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/admin/${label.toLowerCase()}`}
            className={`flex h-9 w-9 items-center rounded-full justify-center transition-all hover:scale-110 md:h-8 md:w-8 ${
              isActive
                ? "bg-[rgba(0,125,255,1)] text-[rgba(255,255,255,1)]"
                : "text-[rgba(0,0,0,0.4)]"
            }`}
          >
            <Icon
              className={cn("h-5 w-5 group-hover:scale-110 transition-all")}
            />
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
