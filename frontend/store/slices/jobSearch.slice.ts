import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type JobSearch = {
  description: string;
  location: string;
  salary: string;
  title: string;
  link: string;
  company: string;
};

export type JobSearchQuery = {
  id?: string;
  user: string;
  jobs: JobSearch[];
  createdAt: string;
};

interface JobSearchResults {
  jobs: JobSearchQuery[];
}

const initialState: JobSearchResults = {
  jobs: [],
};

export const jobSearchSlice = createSlice({
  name: "jobSearch",
  initialState,
  reducers: {
    setJobSearch: (state, action: PayloadAction<JobSearchQuery[]>) => {
      state.jobs = action.payload;
    },
  },
});

export const { setJobSearch } = jobSearchSlice.actions;

export default jobSearchSlice.reducer;
