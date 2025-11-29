"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

import { Loader2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axios";
import { store } from "@/store/store";
import { addJob } from "@/store/slices/job.slice";

const AddJobDrawer = () => {
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
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) resetForm();
      }}
    >
      <SheetTrigger asChild>
        <Button
          className="rounded-none hover:rounded-xl"
          onClick={() => setOpen(true)}
        >
          <Plus /> Add job
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] overflow-y-auto p-6"
      >
        <SheetHeader className="p-0">
          <SheetTitle className="text-xl">Add Job</SheetTitle>
          <SheetDescription>
            Fill in the required fields. Optional fields can be expanded below.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleAddJob} className="grid gap-4 mt-4">
          {/* Company */}
          <div className="grid gap-1">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              required
              placeholder="e.g. Microsoft"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {/* Job Role */}
          <div className="grid gap-1">
            <Label htmlFor="jobRole">Job Role *</Label>
            <Input
              id="jobRole"
              required
              placeholder="e.g. Software Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          {/* Phase */}
          <div className="grid gap-1">
            <Label htmlFor="phase">Phase *</Label>
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
            <Label htmlFor="jobDescriptionLink">Job Description Link</Label>
            <Input
              id="jobDescriptionLink"
              value={jobDescriptionLink}
              onChange={(e) => setJobDescriptionLink(e.target.value)}
            />
          </div>

          {/* Salary */}
          <div className="grid gap-1">
            <Label htmlFor="salary">Salary (in Lakhs)</Label>
            <Input
              id="salary"
              type="number"
              placeholder="10"
              value={salary}
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
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>

          {/* Interview Date - only when phase is Interview */}
          {phase === "Interview" && (
            <div className="grid gap-1">
              <Label htmlFor="interviewDate">Interview Date *</Label>
              <Input
                id="interviewDate"
                type="date"
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
              />
            </div>
          )}

          {/* Accordion Extra Fields */}
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

          <SheetFooter className="p-0">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="rounded-none hover:rounded-xl"
              >
                Cancel
              </Button>
            </SheetClose>

            <Button type="submit" className="rounded-none hover:rounded-xl">
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddJobDrawer;
