import Image from "next/image";
import demo from "../../public/demo.jpg";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center px-4 py-20 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-3xl text-center space-y-6 mb-16">
        <h1 className="text-5xl md:text-6xl font-normal leading-tight">
          Track Every <span className="italic font-bold">Job</span> That Builds
          Your Career
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Manage all your job applications in one clean dashboard. Stay
          organized, stay consistent, and land your next career opportunity with
          ease.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="px-8 py-3 text-lg rounded-none hover:rounded-xl cursor-pointer bg-black text-white transition-all flex items-center gap-2"
          >
            Get Started <ArrowRight size={20} />
          </Link>

          <Link
            href="/login"
            className="px-8 py-3 text-lg rounded-none hover:rounded-xl cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
          >
            Continue
          </Link>
        </div>
      </div>

      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
        <div className="flex items-center space-x-2 px-4 py-2 border-b bg-gray-100">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>

          <div className="flex-1 mx-4 py-1 px-3 bg-white border rounded-full text-gray-400 text-sm">
            yourcareerbook.com/dashboard
          </div>
        </div>

        {/* Demo Image */}
        <div className="relative w-full">
          <Image
            src={demo}
            alt="Dashboard Demo"
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
