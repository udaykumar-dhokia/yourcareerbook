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
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-primary" href="/">
              {/* <h1 className="text-2xl font-bold">
                yourcareerbook<span className="font-normal">.com</span>
              </h1> */}
              <Image src={logo} alt="logo" className="w-50" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                router.push("/register");
              }}
            >
              Get Started <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
