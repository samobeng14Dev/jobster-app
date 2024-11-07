import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

// Define the shape of filters state
export interface FiltersState {
  search: string;
  searchStatus: "all" | "pending" | "interview" | "declined";
  searchType: "all" | "full-time" | "part-time" | "remote";
  sort: "latest" | "oldest" | "a-z" | "z-a";
  sortOptions: string[];
}

// Define the shape of a job
interface Job {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: string;
  status: string;
}

// Define the shape of stats
interface Stats {
  defaultStats: {
    declined: number;
    interview: number;
    pending: number;
  };
  monthlyApplications: {
    date: string; // e.g., "Oct 2024"
    count: number; // e.g., 3
  }[];
}

// Define the shape of all jobs state
interface AllJobsState {
  isLoading: boolean;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: Stats['defaultStats'];
  monthlyApplications: Stats['monthlyApplications'];
}

// Combined state type (FiltersState + AllJobsState)
type InitialStateType = FiltersState & AllJobsState;

// Initial state with both filters and job-related state
const initialState: InitialStateType = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: { declined: 0, interview: 0, pending: 0 },
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

// AsyncThunk to fetch all jobs
export const getAllJobs = createAsyncThunk<
  { jobs: Job[] },
  void,
  { rejectValue: string }
>(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    const url = `/jobs`;
    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// AsyncThunk to fetch stats
export const showStats = createAsyncThunk<
  Record<string, any>,
  void,
  { rejectValue: string }
>(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/jobs/stats");
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Failed to fetch stats");
    }
  }
);

// Define the action payload for handleChange
type ChangePayload<K extends keyof InitialStateType> = {
  name: K;
  value: InitialStateType[K];  // Value type corresponds to the type of the property in InitialStateType
};

// Slice to handle jobs-related actions
const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // Updated handleChange to handle both FiltersState and AllJobsState
    handleChange: <K extends keyof InitialStateType>(
      state: InitialStateType,
      { payload }: PayloadAction<ChangePayload<K>>
    ) => {
      // Dynamically update the correct property in the state based on payload
      state[payload.name] = payload.value;  // TypeScript knows that `payload.name` is a valid key in InitialStateType
    },
    clearFilters: (state) => {
      return { ...state, ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action: PayloadAction<{ jobs: Job[] }>) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getAllJobs.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        if (action.payload) {
          toast.error(action.payload);
        }
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Failed to fetch stats");
      });
  },
});

export const { showLoading, hideLoading, handleChange, clearFilters } = allJobsSlice.actions;

export default allJobsSlice.reducer;
