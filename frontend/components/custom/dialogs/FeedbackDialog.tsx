"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, NotebookPen } from "lucide-react";
import { axiosInstance } from "@/utils/axios";

const FeedbackDialog = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!form.text.trim()) {
      toast.error("Please write a message.");
      return;
    }
    try {
      await axiosInstance.post("/feedback/", form);

      toast.success("Thank you for your feedback! ❤️");
      setOpen(false);
      setForm({
        text: "",
      });
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <NotebookPen className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="rounded-none sm:rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            We Value Your Feedback 💬
          </DialogTitle>
          <DialogDescription className="text-gray-600 pt-1">
            Share anything — feedback, a bug, a feature idea, or how we can
            improve. Your input helps us build a better experience for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Textarea
            placeholder="Write your message here..."
            className="h-32"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-none hover:rounded-xl"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-none hover:rounded-xl"
            onClick={handleSubmit}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Submit Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
