"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { Loader2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axios";
import { store } from "@/store/store";
import { addJob } from "@/store/slices/job.slice";

const AddJobDialog = () => {
  const [open, setOpen] = useState(false);

  // Required Fields
  const [company, setCompany] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [phase, setPhase] = useState("");

  // Optional Fields
  const [jobDescriptionLink, setJobDescriptionLink] = useState("");
  const [salary, setSalary] = useState<number | "">("");
  const [remark, setRemark] = useState("");
  const [interviewDate, setInterviewDate] = useState("");

  // Accordion Optional Fields
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  const resetForm = () => {
    setCompany("");
    setJobRole("");
    setPhase("");
    setJobDescriptionLink("");
    setSalary("");
    setRemark("");
    setInterviewDate("");

    setCompanyWebsite("");
    setContactName("");
    setContactEmail("");
    setLinkedinUrl("");
  };

  const handleAddJob = async (e: any) => {
    e.preventDefault();

    if (!company || !jobRole || !phase) return;

    const jobData = {
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
      const res = await axiosInstance.post("/job/", jobData);

      store.dispatch(addJob(res.data.job));

      toast.success(res.data.message);

      resetForm();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="rounded-none hover:rounded-xl"
          onClick={() => setOpen(true)}
        >
          <Plus /> Add job
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Job</DialogTitle>
          <DialogDescription>
            Fill in the important details first. Additional fields are optional.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddJob} className="grid gap-4">
          {/* Company */}
          <div className="grid gap-1">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              name="company"
              placeholder="e.g. Microsoft"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {/* Job Role */}
          <div className="grid gap-1">
            <Label htmlFor="jobRole">Job Role *</Label>
            <Input
              id="jobRole"
              name="jobRole"
              placeholder="e.g. Software Developer"
              required
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          {/* Phase */}
          <div className="grid gap-1">
            <Label htmlFor="phase">Phase *</Label>
            <Select value={phase} onValueChange={setPhase}>
              <SelectTrigger id="phase" className="w-full">
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
            <Label htmlFor="jobDescriptionLink">Job Description Link</Label>
            <Input
              id="jobDescriptionLink"
              name="jobDescriptionLink"
              value={jobDescriptionLink}
              onChange={(e) => setJobDescriptionLink(e.target.value)}
            />
          </div>

          {/* Salary */}
          <div className="grid gap-1">
            <Label htmlFor="salary">Salary (in Lakhs)</Label>
            <Input
              id="salary"
              name="salary"
              type="number"
              value={salary}
              placeholder="10"
              onChange={(e) =>
                setSalary(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          {/* Remark */}
          <div className="grid gap-1">
            <Label htmlFor="remark">Remark</Label>
            <Textarea
              id="remark"
              name="remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>

          {/* Interview Date (Visible only if Interview phase) */}
          {phase === "Interview" && (
            <div className="grid gap-1">
              <Label htmlFor="interviewDate">Interview Date *</Label>
              <Input
                id="interviewDate"
                name="interviewDate"
                type="date"
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
              />
            </div>
          )}

          {/* Accordion More Fields */}
          <Accordion type="single" collapsible>
            <AccordionItem value="extra-fields">
              <AccordionTrigger>Want to add extra details?</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 mt-2">
                  <div className="grid gap-1">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input
                      id="companyWebsite"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Buttons */}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-none hover:rounded-xl"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" className="rounded-none hover:rounded-xl">
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDialog;
