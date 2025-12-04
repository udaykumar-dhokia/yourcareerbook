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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddJobDialog from "@/components/custom/dialogs/AddJobDialog";
import AddJobDrawer from "@/components/custom/drawers/AddJobDrawer";
import { Input } from "@/components/ui/input";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, agentMode } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { jobs } = useSelector((state: RootState) => state.jobReducer);
  const router = useRouter();

  const isProfileComplete = (user: any) => {
    if (!user) return false;
    const requiredFields = ["fullName", "city", "country", "summary", "mobile"];
    return requiredFields.every((field) => !!user[field]);
  };

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
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <UserNavbar />

      <div
        className={`relative min-h-screen ${
          agentMode ? "grid grid-cols-2" : ""
        }`}
      >
        <div className="">
          {user && !isProfileComplete(user) && (
            <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 py-2 px-4 w-full max-w-5xl mx-auto mt-4 rounded-md">
              <p>
                Your profile is incomplete.{" "}
                <Link href="/profile" className="underline font-semibold">
                  Complete your profile
                </Link>{" "}
                to get the most out of our platform.
              </p>
            </div>
          )}

          <div className="flex justify-center w-full">{children}</div>
        </div>

        {agentMode && (
          <div className="p-4 border my-2 ml-2 rounded-xl bg-gray-50 min-h-screen">
            <div className="min-h-[60vh]"></div>
            <div className="p-4">
              <Input />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
