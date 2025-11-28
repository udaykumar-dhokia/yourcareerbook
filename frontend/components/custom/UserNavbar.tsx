"use client";
import { RootState, store } from "@/store/store";
import { User2 } from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../../public/logo.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteCookie } from "cookies-next";
import { setLogout } from "@/store/slices/user.slice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import FeedbackDialog from "./dialogs/FeedbackDialog";

const UserNavbar = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    store.dispatch(setLogout());
    router.push("/login");
  };
  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-primary" href="/dashboard">
              {/* <h1 className="text-2xl font-bold">
                yourcareerbook<span className="font-normal">.com</span>
              </h1> */}
              <Image src={logo} alt="logo" className="w-50" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-medium">{user?.fullName}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User2 className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <FeedbackDialog />
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
