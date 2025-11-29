"use client";

import logo from "../../public/logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="block text-primary">
              <Image
                src={logo}
                alt="logo"
                className="w-32 sm:w-40 md:w-48 h-auto"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              className="px-4 py-2 text-sm sm:text-base"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>

            <Button
              className="flex items-center gap-1 px-4 py-2 text-sm sm:text-base"
              onClick={() => router.push("/register")}
            >
              Get Started
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
