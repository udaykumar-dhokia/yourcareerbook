"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";

const page = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <div className="w-full max-w-7xl flex justify-center mt-26">
      <div className="flex-col justify-between w-full">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-bold">
            {user?.fullName}'s <span className="font-normal">career book</span>
          </h1>

          <div className="flex gap-2">
            <Input
              placeholder="e.g. Microsoft"
              className="rounded-none hover:rounded-xl focus-visible:rounded-xl"
            />
            <Button className="rounded-none hover:rounded-xl">
              <Plus /> Add job
            </Button>
          </div>
        </div>

        <div className="flex justify-evenly mt-12 gap-2">
          {/* Applied */}
          <div className="bg-gray-50 border border-gray-300 rounded-none hover:rounded-xl shadow-sm p-6 w-60 text-center transition-all">
            <h1 className="text-lg font-semibold text-gray-800">Applied</h1>
          </div>

          {/* Test/OA */}
          <div className="bg-gray-50 border border-gray-300 rounded-none hover:rounded-xl shadow-sm p-6 w-60 text-center transition-all">
            <h1 className="text-lg font-semibold text-gray-800">Test/OA</h1>
          </div>

          {/* Interview */}
          <div className="bg-gray-50 border border-gray-300 rounded-none hover:rounded-xl shadow-sm p-6 w-60 text-center transition-all">
            <h1 className="text-lg font-semibold text-gray-800">Interview</h1>
          </div>

          {/* Offer */}
          <div className="bg-gray-50 border border-green-400 rounded-none hover:rounded-xl shadow-sm p-6 w-60 text-center transition-all">
            <h1 className="text-lg font-semibold text-green-700">Offer</h1>
          </div>

          {/* Rejected */}
          <div className="bg-gray-50 border border-red-400 rounded-none hover:rounded-xl shadow-sm p-6 w-60 text-center transition-all">
            <h1 className="text-lg font-semibold text-red-600">Rejected</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
