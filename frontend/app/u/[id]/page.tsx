"use client";

import Loader from "@/components/custom/Loader";
import { axiosInstance } from "@/utils/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/user/check-username/${id}`);
        setUserExists(res.data.success);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    checkUserExists();
  }, []);

  if (loading) return <Loader />;

  if (!userExists) {
    return (
      <div className="flex justify-center items-center">
        <p>Oops! that's not here, but wait... you can invite them.</p>
      </div>
    );
  }

  return (
    <>
      <div className=""></div>
    </>
  );
}
