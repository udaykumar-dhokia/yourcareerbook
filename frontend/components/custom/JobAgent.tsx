import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import { RootState, store } from "@/store/store";
import { Flame, Loader2, Send, X } from "lucide-react";
import { setAgenMode } from "@/store/slices/user.slice";
import { Button } from "../ui/button";
import { useState } from "react";
import { addJobSearch } from "@/store/slices/jobSearch.slice";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axios";

const JobAgent = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { jobs } = useSelector((state: RootState) => state.jobSearchReducer);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const startSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);

    try {
      const res = await axiosInstance.post("/agent/job-search/", {
        query: searchQuery,
      });
      store.dispatch(addJobSearch(res.data.job));
      toast.success("Hunt successful");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const sortedJobs = [...jobs].sort(
    (a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
  );

  return (
    <>
      <div className="border-animate p-6 my-2 ml-2 rounded-bl-xl rounded-tl-xl bg-gray-50 min-h-screen flex flex-col gap-4 shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Job Agent</h1>

          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-1 border border-dashed px-3 py-1 rounded-lg bg-white">
              <Flame className="w-4 text-orange-500" />
              <p className="font-medium">{user?.jobSearchLimit}</p>
            </div>

            <X
              onClick={() => store.dispatch(setAgenMode())}
              className="cursor-pointer text-gray-500 hover:text-black transition"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="sticky top-0 z-20 bg-gray-50 pb-3 pt-2 flex gap-3">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=""
            placeholder="Search: MERN Developer, Bangalore, 0-1 YOE…"
          />

          <Button
            disabled={!searchQuery}
            onClick={startSearch}
            className="flex items-center gap-2 px-5 shadow-md"
          >
            Search
            <Send className="w-4" />
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center items-center gap-2">
            <Loader2 className="animate-spin" />
            <p>Hold on while the agent is hunting.</p>
          </div>
        )}

        {/* Job List */}
        <div
          className="flex-1 pr-1 max-h-screen overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {sortedJobs.length === 0 && (
            <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
              Start hunting now for a better future 🚀
            </div>
          )}

          {sortedJobs.map((job, index) => (
            <div
              key={index}
              className="rounded-none hover:rounded-xl p-2 mb-6 transition-all"
            >
              <p className="text-xs text-gray-400 mb-3 tracking-wide uppercase">
                {job.createdAt}
              </p>

              <div className="space-y-4">
                {job.jobs.map((j, jIndex) => (
                  <div
                    key={jIndex}
                    className="border rounded-none hover:rounded-xl p-4 hover:bg-gray-50 transition-all flex justify-between gap-3"
                  >
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {j.title}
                      </h2>

                      <p className="text-gray-600 text-sm">
                        {j.company} • {j.location}
                      </p>

                      <p className="text-sm text-gray-700 font-medium">
                        Salary: {j.salary}
                      </p>

                      <p className="text-gray-500 text-sm line-clamp-2">
                        {j.description}
                      </p>
                    </div>

                    <Button
                      asChild
                      className="self-start whitespace-nowrap shadow-sm"
                    >
                      <a href={j.link} target="_blank">
                        Apply
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobAgent;
