import useUserStore from "@/entity/user/user.store";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import React from "react";

const Profile = () => {
  const { userState } = useUserStore();
  console.log(userState);
  return (
    <div className="flex flex-row gap-sm items-center">
      <Avatar className="h-[50px] w-[50px]">
        <AvatarFallback className="text-neutral-0 bg-primary-80 font-black text-[20px] uppercase">
          {userState?.telegram.username.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <p className="font-bold">{userState?.telegram.username}</p>
    </div>
  );
};

export default Profile;
