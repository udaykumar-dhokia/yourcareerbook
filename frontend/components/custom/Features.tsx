import Image from "next/image";
import addJob from "../../public/addJob.png";
import { Rocket, ListTodo, UserCheck } from "lucide-react";

const features = [
  {
    title: "Track Applications",
    description:
      "Stay on top of every job you apply for. Keep statuses updated and never miss a follow-up again.",
    icon: ListTodo,
  },
  {
    title: "Stay Organized",
    description:
      "A clean dashboard that helps you manage all applications in one place—simple, efficient, stress-free.",
    icon: Rocket,
  },
  {
    title: "Boost Your Career",
    description:
      "See progress, identify gaps, and keep moving forward with clear insights into your job search journey.",
    icon: UserCheck,
  },
];

const Features = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <Image
            alt="Job Tracker Feature"
            className="object-cover object-center h-full w-full"
            src={addJob}
            priority
          />
        </div>

        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          {features.map(({ title, description, icon: Icon }, index) => (
            <div
              key={index}
              className="flex flex-col mb-10 lg:items-start items-center"
            >
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-5">
                <Icon className="w-6 h-6" />
              </div>

              <div className="grow">
                <h2 className="text-gray-900 text-xl font-bold mb-3">
                  {title}
                </h2>
                <p className="leading-relaxed text-md md:text-lg">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
