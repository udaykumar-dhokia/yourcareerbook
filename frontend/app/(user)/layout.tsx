"use client";

import Loader from "@/components/custom/Loader";
import UserNavbar from "@/components/custom/UserNavbar";
import { setJobs } from "@/store/slices/job.slice";
import { setUser } from "@/store/slices/user.slice";
import { RootState, store } from "@/store/store";
import { axiosInstance } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { jobs } = useSelector((state: RootState) => state.jobReducer);

  useEffect(() => {
    setLoading(true);
    const exists = async () => {
      try {
        const res = await axiosInstance.get("/user/exists");
        const jobs = await axiosInstance.get("/job/");

        store.dispatch(setUser(res.data.user));
        store.dispatch(setJobs(jobs.data.jobs));
      } catch (error: any) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    if (!user || jobs?.length == 0) {
      exists();
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="">
        <UserNavbar />
        <div className="flex justify-center">{children}</div>
      </div>
    </>
  );
}
