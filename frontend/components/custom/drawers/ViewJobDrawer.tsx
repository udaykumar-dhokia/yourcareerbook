"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Stars, Trash } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axios";
import { deleteJob, Job } from "@/store/slices/job.slice";
import { store } from "@/store/store";
import { useState } from "react";
import UpdateJobDrawer from "./UpdateJobDrawer";

type ViewJobSheetProps = {
  job: Job | null;
  open: boolean;
  onClose: () => void;
};

const ViewJobDrawer = ({ job, open, onClose }: ViewJobSheetProps) => {
  if (!job) return null;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleDelete = async () => {
    if (!job) return;

    try {
      const payload = { id: job.id };
      const res = await axiosInstance.delete("/job/", { data: payload });

      store.dispatch(deleteJob(job));
      toast.success(res.data.message);

      setConfirmDelete(false);
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      {/* MAIN VIEW SHEET */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-full sm:w-[550px] md:w-[650px] lg:w-[800px] xl:w-[900px] overflow-y-auto p-6"
        >
          <SheetHeader className="p-0">
            <SheetTitle className="text-xl font-bold">{job.company}</SheetTitle>
            <SheetDescription>Detailed job information.</SheetDescription>

            <div className="relative w-full mt-2 inline-block group">
              <div
                className="absolute inset-0 rounded-none bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 
                  opacity-40 blur-md group-hover:opacity-60 transition-all duration-500 animate-gradient"
              />

              <Button
                variant="outline"
                className="relative w-full z-10 bg-background border-transparent hover:bg-background font-medium"
                onClick={() => toast.info("Coming soon! Stay tuned.")}
              >
                <Stars className="mr-2" /> Follow-up
              </Button>
            </div>
          </SheetHeader>

          <div className="grid gap-4 mt-4 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <Label className="font-medium">Job Role:</Label>
              <p className="text-gray-700">{job.jobRole}</p>
            </div>

            <div>
              <Label className="font-medium">Phase:</Label>
              <p className="text-gray-700">{job.phase}</p>
            </div>

            {job.jobDescriptionLink && (
              <div>
                <Label className="font-medium">Job Description Link:</Label>
                <a
                  href={job.jobDescriptionLink}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View Description
                </a>
              </div>
            )}

            {job.salary && (
              <div>
                <Label className="font-medium">Salary:</Label>
                <p className="text-gray-700">{job.salary} LPA</p>
              </div>
            )}

            {job.remark && (
              <div>
                <Label className="font-medium">Remark:</Label>
                <p className="text-gray-700">{job.remark}</p>
              </div>
            )}

            {job.interviewDate && job.phase === "Interview" && (
              <div>
                <Label className="font-medium">Interview Date:</Label>
                <p className="text-gray-700">{job.interviewDate}</p>
              </div>
            )}

            {/* EXTRA INFO */}
            <div className="border-t pt-4 mt-2 grid gap-3">
              {job.companyWebsite && (
                <div>
                  <Label className="font-medium">Company Website:</Label>
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {job.companyWebsite}
                  </a>
                </div>
              )}

              {job.contactName && (
                <div>
                  <Label className="font-medium">Contact Name:</Label>
                  <p>{job.contactName}</p>
                </div>
              )}

              {job.contactEmail && (
                <div>
                  <Label className="font-medium">Contact Email:</Label>
                  <p>{job.contactEmail}</p>
                </div>
              )}

              {job.linkedinUrl && (
                <div>
                  <Label className="font-medium">LinkedIn URL:</Label>
                  <a
                    href={job.linkedinUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {job.linkedinUrl}
                  </a>
                </div>
              )}
            </div>
          </div>

          <SheetFooter className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              className="border-red-400 w-full"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash className="text-red-400" />
            </Button>

            <Button
              className="rounded-none hover:rounded-xl w-full"
              onClick={() => setUpdateOpen(true)}
            >
              Update
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* DELETE CONFIRMATION*/}
      <Sheet open={confirmDelete} onOpenChange={setConfirmDelete}>
        <SheetContent side="bottom" className="w-full sm:w-[400px] mx-auto p-6">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              Are you sure?
            </SheetTitle>
            <SheetDescription>
              This action will permanently delete this job entry.
            </SheetDescription>
          </SheetHeader>

          <SheetFooter className="w-full mt-4 p-0 flex justify-end gap-3">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>

            <Button
              className="w-full"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <UpdateJobDrawer
        job={job}
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false);
          onClose();
        }}
      />
    </>
  );
};

export default ViewJobDrawer;
