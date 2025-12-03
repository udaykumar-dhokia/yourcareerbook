"use client";

import { RootState, store } from "@/store/store";
import { Menu, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../../public/logo.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie } from "cookies-next";
import { setLogout } from "@/store/slices/user.slice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FeedbackDialog from "./dialogs/FeedbackDialog";
import AddJobDrawer from "./drawers/AddJobDrawer";
import { useState } from "react";

const UserNavbar = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    deleteCookie("token");
    store.dispatch(setLogout());
    router.push("/login");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="block text-primary">
              <Image
                src={logo}
                alt="logo"
                className="w-28 sm:w-36 md:w-44 h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Link href="/profile" className="hover:text-primary">
              Profile
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <p className="text-base sm:text-lg font-medium hidden xs:block">
              {user?.fullName}
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User2 className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/profile");
                  }}
                  className="cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <FeedbackDialog />
            <AddJobDrawer />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm animate-slide-down transition-all">
          <div className="px-4 py-3 flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="py-1 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="py-1 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>

            <hr />

            <div className="flex items-center justify-between">
              <span className="font-medium">{user?.fullName}</span>
              <User2 className="w-5 h-5" />
            </div>

            <button
              onClick={handleLogout}
              className="text-left text-red-600 mt-2"
            >
              Log out
            </button>

            <AddJobDrawer />
          </div>
        </div>
      )}
    </header>
  );
};

export default UserNavbar;
