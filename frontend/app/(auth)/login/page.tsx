import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const page = () => {
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
              className="w-xs rounded-none hover:rounded-xl focus-visible:rounded-xl transition-all"
              placeholder="example@mail.com"
              type="email"
            />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              className="w-xs rounded-none hover:rounded-xl focus-visible:rounded-xl transition-all"
              placeholder="********"
              type="password"
            />
          </div>

          <Button className="w-full rounded-none hover:rounded-xl">
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
