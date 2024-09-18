import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="text-primary-100 flex flex-col gap-xs">
      <Link href={"/telegram-auth"}>Auth</Link>
      <Link href={"/reports"}>Reports</Link>
    </div>
  );
};

export default page;
