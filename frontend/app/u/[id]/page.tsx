"use client";

import ProfileHeader from "@/app/(user)/profile/components/ProfileHeader";
import Loader from "@/components/custom/Loader";
import { User } from "@/store/slices/user.slice";
import { axiosInstance } from "@/utils/axios";
import { ParamValue } from "next/dist/server/request/params";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProfileView from "./components/ProfileView";

export default function page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async (username: ParamValue) => {
      if (!username) return;
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/user/${username}`);
        setUser(res.data.user);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const checkUserExists = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/user/check-username/${id}`);
        setUserExists(res.data.success);
      } catch (error: any) {
      } finally {
        setLoading(false);
      }
    };

    checkUserExists();
    if (!userExists) {
      fetchUser(id);
    }
  }, []);

  if (loading) return <Loader />;

  if (userExists) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Oops! that's not here, but wait... you can invite them.</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[80vh] w-full max-w-5xl mx-auto my-12 md:my-24 px-4">
        <ProfileHeader user={user!} />

        <ProfileView user={user!} />
      </div>
    </>
  );
}
