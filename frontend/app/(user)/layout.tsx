"use client";

import Footer from "@/components/custom/Footer";
import Loader from "@/components/custom/Loader";
import UserNavbar from "@/components/custom/UserNavbar";
import { setJobs } from "@/store/slices/job.slice";
import { setUser } from "@/store/slices/user.slice";
import { RootState, store } from "@/store/store";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { jobs } = useSelector((state: RootState) => state.jobReducer);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const exists = async () => {
      try {
        const res = await axiosInstance.get("/user/exists");
        const jobsRes = await axiosInstance.get("/job/");

        store.dispatch(setUser(res.data.user));
        store.dispatch(setJobs(jobsRes.data.jobs));
      } catch (error: any) {
        router.push("/login");
        toast.error(error.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (!user || !jobs) {
      exists();
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <UserNavbar />
      <div className="flex justify-center">{children}</div>
      <Footer />
    </>
  );
}
