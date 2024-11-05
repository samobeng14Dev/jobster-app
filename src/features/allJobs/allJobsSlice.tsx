import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { RootState } from "../../store";

// Define the shape of your filters state
interface FiltersState {
  search: string;
  searchStatus: "all" | "pending" | "interview" | "declined";
  searchType: "all" | "full-time" | "part-time" | "remote";
  sort: "latest" | "oldest" | "a-z" | "z-a";
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

const initialState: AllJobsState & FiltersState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk<
  { jobs: Job[] }, 
  void, 
  { rejectValue: string } 
>(
  'allJobs/getJobs',
  async (_, thunkAPI) => {
    const url = `/jobs`;
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.user?.user?.token;
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);
// AsyncThunk to show stats
export const showStats = createAsyncThunk<
  Record<string, any>,  // Expected return type
  void,
  { rejectValue: string }
>(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get('/jobs/stats');
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Failed to fetch stats");
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading:(state)=>{
      state.isLoading=true;
    },
    hideLoading:(state)=>{
      state.isLoading=false;
    }
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
      }).addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload); 
      });
  },
});
export const {showLoading,hideLoading}=allJobsSlice.actions
export default allJobsSlice.reducer;
