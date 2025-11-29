"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axios";
import { store } from "@/store/store";
import { updateJob, Job } from "@/store/slices/job.slice";

type UpdateJobSheetProps = {
  job: Job | null;
  open: boolean;
  onClose: () => void;
};

const UpdateJobDrawer = ({ job, open, onClose }: UpdateJobSheetProps) => {
  const [company, setCompany] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [phase, setPhase] = useState("");

  const [jobDescriptionLink, setJobDescriptionLink] = useState("");
  const [salary, setSalary] = useState<number | "">("");
  const [remark, setRemark] = useState("");
  const [interviewDate, setInterviewDate] = useState("");

  const [companyWebsite, setCompanyWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job && open) {
      setCompany(job.company || "");
      setJobRole(job.jobRole || "");
      setPhase(job.phase || "");

      setJobDescriptionLink(job.jobDescriptionLink || "");
      setSalary(job.salary || "");
      setRemark(job.remark || "");
      setInterviewDate(job.interviewDate || "");

      setCompanyWebsite(job.companyWebsite || "");
      setContactName(job.contactName || "");
      setContactEmail(job.contactEmail || "");
      setLinkedinUrl(job.linkedinUrl || "");
    }
  }, [job, open]);

  const handleUpdateJob = async (e: any) => {
    e.preventDefault();
    if (!job) return;

    const updatedJob = {
      id: job.id,
      user: job.user,
      company,
      jobRole,
      phase,
      jobDescriptionLink,
      salary: salary ? Number(salary) : null,
      remark,
      interviewDate: phase === "Interview" ? interviewDate : null,
      companyWebsite,
      contactName,
      contactEmail,
      linkedinUrl,
    };

    setLoading(true);

    try {
      const res = await axiosInstance.put(`/job/`, updatedJob);

      store.dispatch(updateJob(updatedJob));
      toast.success(res.data.message);

      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (!job) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[550px] md:w-[650px] lg:w-[750px] xl:w-[850px] overflow-y-auto p-6"
      >
        <SheetHeader className="p-0">
          <SheetTitle className="text-xl">Update Job</SheetTitle>
          <SheetDescription>Edit and update the job details.</SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleUpdateJob}
          className="grid gap-4 mt-4 max-h-[75vh] overflow-y-auto pr-2"
        >
          {/* Company */}
          <div className="grid gap-1">
            <Label>Company *</Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          {/* Job Role */}
          <div className="grid gap-1">
            <Label>Job Role *</Label>
            <Input
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              required
            />
          </div>

          {/* Phase */}
          <div className="grid gap-1">
            <Label>Phase *</Label>
            <Select value={phase} onValueChange={setPhase}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Test/OA">Test/OA</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Description Link */}
          <div className="grid gap-1">
            <Label>Job Description Link</Label>
            <Input
              value={jobDescriptionLink}
              onChange={(e) => setJobDescriptionLink(e.target.value)}
            />
          </div>

          {/* Salary */}
          <div className="grid gap-1">
            <Label>Salary (LPA)</Label>
            <Input
              type="number"
              value={salary}
              onChange={(e) =>
                setSalary(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          {/* Remark */}
          <div className="grid gap-1">
            <Label>Remark</Label>
            <Textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>

          {/* Interview Date */}
          {phase === "Interview" && (
            <div className="grid gap-1">
              <Label>Interview Date *</Label>
              <Input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
              />
            </div>
          )}

          {/* Extra Details */}
          <Accordion type="single" collapsible>
            <AccordionItem value="extra">
              <AccordionTrigger>Extra details</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 mt-2">
                  <div>
                    <Label>Company Website</Label>
                    <Input
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Contact Name</Label>
                    <Input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Contact Email</Label>
                    <Input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SheetFooter className="mt-2 p-0 flex items-center justify-end gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </SheetClose>

            <Button
              type="submit"
              className="w-full rounded-none hover:rounded-xl"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateJobDrawer;
