"use client";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";

const page = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <div className="min-h-screen w-full max-w-6xl flex justify-center m-6">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold">{user?.fullName}'s career book</h1>
        <Button className="rounded-none hover:rounded-xl">
          <Plus /> Add job
        </Button>
      </div>
    </div>
  );
};

export default page;
