"use client";

import UserNavbar from "@/components/custom/UserNavbar";
import { setUser } from "@/store/slices/user.slice";
import { store } from "@/store/store";
import { axiosInstance } from "@/utils/axios";
import { useEffect } from "react";
import { toast } from "sonner";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const exists = async () => {
      try {
        const res = await axiosInstance.get("/users/exists");
        store.dispatch(setUser(res.data.user));
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };

    exists();
  }, []);

  return (
    <>
      <div className="">
        <UserNavbar />
        {children}
      </div>
    </>
  );
}
