import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";


export interface InitialStateType {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  isEditing: boolean;
  editJobId: string;
}

interface createJobType {
  position: string;
  company: string;
  jobLocation: string;
  status: string;
  jobType: string;
}

// Initial state
const initialState: InitialStateType = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

// Async thunk to create a job
export const createJob = createAsyncThunk<
  createJobType, // type based on the API response
  createJobType, // Type of the job parameter you pass to the thunk
  { rejectValue: string }
>("job/createJob", async (job, thunkAPI) => {
  try {
    

    const resp = await customFetch.post("/jobs", job);

    // console.log('create job', resp.data);

    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
    }
    return thunkAPI.rejectWithValue(error.message || "Something went wrong");
  }
});

export const deleteJob = createAsyncThunk<
void,
string,
  { rejectValue: string }
>("job/deleteJob", async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`,);
    thunkAPI.dispatch(getAllJobs());
    return resp.data;
  } catch (error: any) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

// Adjusted editJob thunk
export const editJob = createAsyncThunk<
  createJobType, // Return type based on the API response
  { jobId: string; job: createJobType }, // Type of the job parameter you pass to the thunk
  { rejectValue: string }
>(
  'job/editJob',
  async ({ jobId, job }, thunkAPI) => {
    try {
      

      const resp = await customFetch.patch(`/jobs/${jobId}`, job);

      thunkAPI.dispatch(clearValues());
      return resp.data; // Ensure this matches createJobType
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Something went wrong");
    }
  }
);

// Rest of the code remains the same




// Type that extracts the value type based on the property name
type ChangePayload<K extends keyof InitialStateType> = {
  name: K;
  value: InitialStateType[K];
};

// Slice definition
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: <K extends keyof InitialStateType>(
      state: InitialStateType,
      { payload }: PayloadAction<ChangePayload<K>>
    ) => {
      state[payload.name] = payload.value;
    },
    clearValues: () => {
      return initialState;
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success(`Job created`);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          toast.error(action.payload);
        }
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Modified...');
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  }
  
});

export const { handleChange, clearValues,setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
