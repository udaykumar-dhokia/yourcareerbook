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

type ViewJobDialogProps = {
  job: any | null;
  open: boolean;
  onClose: () => void;
};

const ViewJobDialog = ({ job, open, onClose }: ViewJobDialogProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {job.company}
          </DialogTitle>
          <DialogDescription>Detailed job information.</DialogDescription>
        </DialogHeader>

        {/* Main Content */}
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
          <Button variant="outline" className="border-red-400">
            <Trash className="text-red-400" />
          </Button>

          <Button className="rounded-none hover:rounded-xl">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewJobDialog;
