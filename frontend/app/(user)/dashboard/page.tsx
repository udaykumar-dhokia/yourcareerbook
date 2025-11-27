"use client";
import AddJobDialog from "@/components/custom/dialogs/AddJobDialog";
import ViewJobDialog from "@/components/custom/dialogs/ViewJobDialog";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { jobs } = useSelector((state: RootState) => state.jobReducer);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const openView = (job: any) => {
    setSelectedJob(job);
    setViewOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-24 px-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {user?.fullName}'s{" "}
          <span className="font-normal text-gray-600">career book</span>{" "}
          <span className="text-gray-500 text-xl">({jobs?.length})</span>
        </h1>

        <div className="flex gap-2">
          <Input
            placeholder="Search jobs... (e.g. Microsoft)"
            className="border-gray-300"
          />
          <AddJobDialog />
        </div>
      </div>

      {/* Job Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-12">
        {[
          { title: "Applied", color: "border-gray-200" },
          { title: "Test/OA", color: "border-gray-200" },
          { title: "Interview", color: "border-gray-200" },
          { title: "Offer", color: "border-green-300 text-green-700" },
          { title: "Rejected", color: "border-gray-200" },
        ].map(({ title, color }) => {
          const phaseJobs = jobs?.filter((job) => job.phase === title) || [];

          return (
            <div key={title}>
              <div
                className={`bg-gray-50 border ${color} rounded-none hover:rounded-xl shadow-sm p-4 text-center mb-4`}
              >
                <h2 className="text-xl font-semibold">
                  {title} ({phaseJobs.length})
                </h2>
              </div>

              <div className="space-y-3">
                {phaseJobs.length > 0 ? (
                  phaseJobs.map((job, index) => (
                    <div
                      key={index}
                      onClick={() => openView(job)}
                      className={`group relative p-4 border 
    ${title == "Offer" ? "border-green-300" : "border-gray-200"}
    rounded-none hover:rounded-xl transition-all bg-white shadow-sm cursor-pointer`}
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {job.company}
                        </h3>
                        <p className="text-sm text-gray-600">{job.jobRole}</p>

                        {job.interviewDate && title === "Interview" && (
                          <p className="text-xs text-gray-500 mt-1">
                            Interview: {job.interviewDate}
                          </p>
                        )}
                      </div>

                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 
               opacity-0 translate-x-2 
               group-hover:opacity-60 group-hover:translate-x-0 
               transition-all"
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
      <ViewJobDialog
        job={selectedJob}
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      />
    </div>
  );
};

export default page;
