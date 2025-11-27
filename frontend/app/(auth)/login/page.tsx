"use client";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      return;
    }
    setLoading(true);
    try {
      const payload = {
        email: email,
        password: password,
      };

      const res = await axiosInstance.post("/auth/login", payload);
      toast.success(res.data.message);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="space-y-4 border p-8 border-dashed rounded-xl">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold">Welcome back!</h1>
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-xs rounded-none hover:rounded-xl focus-visible:rounded-xl transition-all"
              placeholder="example@mail.com"
              type="email"
            />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-xs rounded-none hover:rounded-xl focus-visible:rounded-xl transition-all"
              placeholder="********"
              type="password"
            />
          </div>

          <Button
            onClick={() => {
              login(email, password);
            }}
            className="w-full rounded-none hover:rounded-xl"
          >
            Create
          </Button>

          <Separator />

          <div className="flex justify-center items-center gap-1">
            <p>Don't have an account?</p>
            <Link href={"/register"} className="underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
