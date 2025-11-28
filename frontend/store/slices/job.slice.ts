import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Job = {
  id?: string;
  user: string;
  company: string;
  jobRole: string;
  phase: string;
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
    deleteJob: (state, action: PayloadAction<Job>) => {
      state.jobs = (state.jobs || []).filter(
        (job) => job.id != action.payload.id
      );
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      if (!state.jobs) return;

      state.jobs = state.jobs.map((job) =>
        job.id === action.payload.id ? action.payload : job
      );
    },
  },
});

export const { setJobs, addJob, deleteJob, updateJob } = jobSlice.actions;

export default jobSlice.reducer;
