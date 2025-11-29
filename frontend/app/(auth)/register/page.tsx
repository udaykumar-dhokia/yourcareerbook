"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import logo from "../../../public/logo.svg";
import { Loader2 } from "lucide-react";

const page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    if (!fullName || !email || !password) {
      return;
    }
    setLoading(true);
    try {
      const payload = {
        fullName: fullName,
        email: email,
        password: password,
      };

      const res = await axiosInstance.post("/auth/register", payload);
      toast.success(res.data.message);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="space-y-4 border p-8 border-dashed rounded-xl">
          <Link href={"/"}>
            <Image src={logo} alt="logo" className="w-50 mb-6" />
          </Link>

          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold">Create your account</h1>
          </div>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-xs rounded-none hover:rounded-xl focus-visible:rounded-xl transition-all"
              placeholder="Udaykumar Dhokia"
              type="text"
            />
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
              register(name, email, password);
            }}
            className="w-full rounded-none hover:rounded-xl"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>

          <Separator />

          <div className="flex justify-center items-center gap-1">
            <p>Already have an account?</p>
            <Link href={"/login"} className="underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
