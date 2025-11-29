"use client";
import AddJobDialog from "@/components/custom/dialogs/AddJobDialog";
import ViewJobDialog from "@/components/custom/dialogs/ViewJobDialog";
import AddJobDrawer from "@/components/custom/drawers/AddJobDrawer";
import ViewJobDrawer from "@/components/custom/drawers/ViewJobDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import { ArrowUpRight, Stars } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Page = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { jobs } = useSelector((state: RootState) => state.jobReducer);

  const [selectedJob, setSelectedJob] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const [search, setSearch] = useState("");

  const openView = (job: any) => {
    setSelectedJob(job);
    setViewOpen(true);
  };

  const filteredJobs =
    jobs?.filter((job) => {
      const s = search.toLowerCase();
      return (
        job.company.toLowerCase().includes(s) ||
        job.jobRole.toLowerCase().includes(s) ||
        job.phase.toLowerCase().includes(s)
      );
    }) || [];

  const phases = [
    { title: "Applied", color: "border-gray-200" },
    { title: "Test/OA", color: "border-gray-200" },
    { title: "Interview", color: "border-gray-200" },
    { title: "Offer", color: "border-green-300 text-green-700" },
    { title: "Rejected", color: "border-gray-200" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto my-12 md:my-24 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
          {user?.fullName}'s{" "}
          <span className="font-normal text-gray-600">career book</span>{" "}
          <span className="text-gray-500 text-lg md:text-xl">
            ({filteredJobs.length})
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input
            placeholder="Search jobs... (e.g. Microsoft, Frontend)"
            className="border-gray-300 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <AddJobDrawer />

          <div className="relative inline-block group">
            <div
              className="absolute inset-0 rounded-md bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 
      opacity-40 blur-md group-hover:opacity-60 transition-all duration-500 animate-gradient"
            />

            <Button
              variant="outline"
              className="relative z-10 bg-background border-transparent hover:bg-background font-medium"
              onClick={() => toast.info("Coming soon! Stay tuned.")}
            >
              <Stars className="mr-2" /> Follow-up
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-12">
        {phases.map(({ title, color }) => {
          const phaseJobs = filteredJobs.filter((job) => job.phase === title);

          return (
            <div key={title}>
              <div
                className={`bg-gray-50 border ${color} rounded-none hover:rounded-xl shadow-sm p-3 sm:p-4 text-center mb-4`}
              >
                <h2 className="text-lg sm:text-xl font-semibold">
                  {title} ({phaseJobs.length})
                </h2>
              </div>

              <div className="space-y-3">
                {phaseJobs.length > 0 ? (
                  phaseJobs.map((job, index) => (
                    <div
                      key={index}
                      onClick={() => openView(job)}
                      className={`group relative p-3 sm:p-4 border 
                        ${
                          title === "Offer"
                            ? "border-green-300"
                            : "border-gray-200"
                        }
                        rounded-none hover:rounded-xl transition-all bg-white shadow-sm cursor-pointer`}
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                          {job.company}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600">
                          {job.jobRole}
                        </p>

                        {job.interviewDate && title === "Interview" && (
                          <p className="text-xs text-gray-500 mt-1">
                            Interview: {job.interviewDate}
                          </p>
                        )}
                      </div>

                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 translate-x-2 
                        group-hover:opacity-60 group-hover:translate-x-0 transition-all"
                      >
                        <ArrowUpRight />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center">
                    No jobs yet
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ViewJobDrawer
        job={selectedJob}
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      />
    </div>
  );
};

export default Page;
