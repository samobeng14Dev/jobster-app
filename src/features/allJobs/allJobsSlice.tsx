import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

// Define the shape of your filters state
interface FiltersState {
  search: string;
  searchStatus: "all" | "pending" | "interview" | "declined"; // Define the status options
  searchType: "all" | "full-time" | "part-time" | "remote"; // Define the job type options
  sort: "latest" | "oldest" | "a-z" | "z-a"; // Define the sort options
  sortOptions: string[];
}


interface Job {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: string; 
  status: string;
}

interface AllJobsState {
  isLoading: boolean;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: Record<string, any>; 
  monthlyApplications: number[]; 
}

// Initial states
const initialFiltersState: FiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: AllJobsState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

// Create the slice
const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    // Define your reducers here if needed
  },
});

// Export the reducer
export default allJobsSlice.reducer;
