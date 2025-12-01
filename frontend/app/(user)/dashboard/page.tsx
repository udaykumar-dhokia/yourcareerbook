"use client";
import ViewJobDrawer from "@/components/custom/drawers/ViewJobDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store/store";
import { ArrowUpRight, List, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { jobs } = useSelector((state: RootState) => state.jobReducer);

  const [selectedJob, setSelectedJob] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState<"table" | "grid">("grid");

  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const phaseOrder: Record<string, number> = {
    Applied: 1,
    "Test/OA": 2,
    Interview: 3,
    Offer: 4,
    Rejected: 5,
  };

  const openView = (job: any) => {
    setSelectedJob(job);
    setViewOpen(true);
  };

  const phases = [
    { title: "Applied", color: "border-gray-200" },
    { title: "Test/OA", color: "border-gray-200" },
    { title: "Interview", color: "border-gray-200" },
    { title: "Offer", color: "border-green-300 text-green-700" },
    { title: "Rejected", color: "border-gray-200" },
  ];

  const filteredJobs =
    jobs?.filter((job) => {
      const s = search.toLowerCase();
      const matchesSearch =
        job.company.toLowerCase().includes(s) ||
        job.jobRole.toLowerCase().includes(s) ||
        job.phase.toLowerCase().includes(s);

      const matchesPhase = phaseFilter === "all" || job.phase === phaseFilter;

      return matchesSearch && matchesPhase;
    }) || [];

  const sortedJobs = [...filteredJobs].sort(
    (a, b) => (phaseOrder[a.phase] || 99) - (phaseOrder[b.phase] || 99)
  );

  return (
    <div className="w-full max-w-7xl mx-auto my-12 md:my-24 px-4">
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

          <Select value={phaseFilter} onValueChange={setPhaseFilter}>
            <SelectTrigger className="w-full rounded-none">
              <SelectValue placeholder="Filter phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              {phases.map((p) => (
                <SelectItem key={p.title} value={p.title}>
                  {p.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              onClick={() => setLayout("grid")}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={layout === "table" ? "default" : "outline"}
              onClick={() => setLayout("table")}
            >
              <List className="w-4 h-4 mr-2" />
              Table
            </Button>
          </div>

          {/* <div className="relative inline-block group">
            <div className="absolute inset-0 rounded-md bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 opacity-40 blur-md group-hover:opacity-60 transition-all duration-500 animate-gradient" />

            <Button
              variant="outline"
              className="relative w-full z-10 bg-background border-transparent hover:bg-background font-medium"
              onClick={() => toast.info("Something is cooking. Stay tuned!")}
            >
              <Stars className="mr-2" /> Follow-up
            </Button>
          </div> */}
        </div>
      </div>

      {layout === "table" ? (
        /* ---------------------- TABLE VIEW ---------------------- */
        <div className="mt-8 min-h-[80vh]">
          <Table>
            <TableHeader className="font-bold text-md bg-gray-100">
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Salary (LPA)</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedJobs.map((job, i) => (
                <TableRow
                  key={i}
                  className={`cursor-pointer ${
                    job.phase == "Offer" ? "bg-green-50" : ""
                  } hover:bg-gray-50`}
                  onClick={() => openView(job)}
                >
                  <TableCell className="font-medium">{job.company}</TableCell>
                  <TableCell>{job.jobRole}</TableCell>
                  <TableCell>{job.salary || "--"}</TableCell>
                  <TableCell>{job.phase}</TableCell>
                  <TableCell>{job.interviewDate || "--"}</TableCell>
                </TableRow>
              ))}

              {filteredJobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No jobs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* ---------------------- GRID VIEW ---------------------- */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-12 min-h-[80vh]">
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
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        key={index}
                        onClick={() => openView(job)}
                        className={`group relative p-3 sm:p-4 border ${
                          title === "Offer"
                            ? "border-green-300"
                            : "border-gray-200"
                        } rounded-none hover:rounded-xl transition-all bg-white shadow-sm cursor-pointer`}
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

                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all">
                          <ArrowUpRight />
                        </div>
                      </motion.div>
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
      )}

      <ViewJobDrawer
        job={selectedJob}
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      />
    </div>
  );
};

export default Page;
