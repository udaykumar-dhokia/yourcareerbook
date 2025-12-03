"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import logo from "../../../public/logo.svg";
import { Loader2, Verified } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true);
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(username);
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    const checkUsername = async () => {
      setIsCheckingUsername(true);
      try {
        const res = await axiosInstance.get(`/user/check-username/${username}`);
        setIsUsernameAvailable(res.data.success);
      } catch (error: any) {
        toast.error(error.response.data.error);
      } finally {
        setIsCheckingUsername(false);
      }
    };

    if (debouncedQuery) {
      checkUsername();
    }
  }, [debouncedQuery]);

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
          <div className="space-y-2">
            <Label>
              Username
              {isCheckingUsername && (
                <Loader2 className="w-4 animate-spin inline-block ml-1" />
              )}
              {username && !isCheckingUsername && isUsernameAvailable && (
                <Verified className="text-green-500 w-4 inline-block ml-1" />
              )}
            </Label>

            <InputGroup>
              <InputGroupInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-xs rounded-none hover:rounded-xl 
    focus-visible:rounded-xl transition-all
    ${
      username && !isCheckingUsername && isUsernameAvailable
        ? "border-green-500"
        : ""
    }
  `}
                placeholder="udthedeveloper"
                type="text"
              />
            </InputGroup>
            {username && !isUsernameAvailable && (
              <p className="text-red-500 text-sm">Username already taken</p>
            )}
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
            disabled={
              !email ||
              !password ||
              !name ||
              !username ||
              isCheckingUsername ||
              !isUsernameAvailable
            }
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
