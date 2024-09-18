import React from "react";
import { Sidebar } from "@/widget/admin/AdminSidebar";
import Screen from "@/shared/ui/containers/Screen";
import AdminHeader from "@/widget/admin/AdminHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
