import Image from "next/image";
import jobAgent from "../../public/job_agent.png";
import { Sparkles, MessageSquareText } from "lucide-react";

const JobAgentLanding = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-50">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden shadow-xl">
          <Image
            alt="Job Agent Interface"
            className="object-cover object-center h-full w-full"
            src={jobAgent}
            priority
          />
        </div>

        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="grow">
              <h2 className="text-gray-900 text-3xl font-bold mb-3">
                Job Agent is Live
              </h2>
              <p className="leading-relaxed text-lg mb-6">
                Experience the future of job hunting. Our intelligent Job Agent allows you to interact using natural language to find opportunities that match your exact criteria.
              </p>
              
              <div className="flex items-center gap-3 text-gray-700">
                 <MessageSquareText className="w-5 h-5 text-blue-500" />
                 <span className="font-medium">Just ask, and it finds.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobAgentLanding;
