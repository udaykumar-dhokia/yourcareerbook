"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axios";
import { deleteJob, Job } from "@/store/slices/job.slice";
import { store } from "@/store/store";
import { useState } from "react";
import UpdateJobDialog from "./UpdateJobDialog";

type ViewJobDialogProps = {
  job: Job | null;
  open: boolean;
  onClose: () => void;
};

const ViewJobDialog = ({ job, open, onClose }: ViewJobDialogProps) => {
  if (!job) return null;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleDelete = async () => {
    if (!job) {
      return;
    }
    try {
      const payload = { id: job.id };
      const res = await axiosInstance.delete("/job/", {
        data: payload,
      });

      store.dispatch(deleteJob(job));
      toast.success(res.data.message);

      setConfirmDelete(false);
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {job.company}
            </DialogTitle>
            <DialogDescription>Detailed job information.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-1">
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

            {/* Extra Details Section */}
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

          <DialogFooter className="flex items-center justify-between mt-2">
            <Button
              variant="outline"
              className="border-red-400"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash className="text-red-400" />
            </Button>

            <Button
              onClick={() => setUpdateOpen(true)}
              className="rounded-none hover:rounded-xl"
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600">
              Are you sure?
            </DialogTitle>
            <DialogDescription>
              This action will permanently delete this job entry.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>

            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateJobDialog
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

export default ViewJobDialog;
