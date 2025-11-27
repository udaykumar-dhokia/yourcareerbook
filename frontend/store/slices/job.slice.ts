import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Job = {
  id?: string;
  user: string;
  company: string;
  jobRole: string;
  phase: "Applied" | "Test/OA" | "Interview" | "Offer" | "Rejected";
  jobDescriptionLink?: string | null;
  salary?: number | null;
  companyWebsite?: string | null;
  remark?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  linkedinUrl?: string | null;
  interviewDate?: string | null;
};

interface IJobs {
  jobs: Job[] | null;
}

const initialState: IJobs = {
  jobs: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs?.push(action.payload);
    },
  },
});

export const { setJobs, addJob } = jobSlice.actions;

export default jobSlice.reducer;
