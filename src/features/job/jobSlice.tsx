import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { RootState } from "../../store";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";

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

interface createJobType{
  position:string;
  company:string;
  jobLocation:string;
  status:string;
  jobType:string;
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
    const state = thunkAPI.getState() as RootState; // Cast the state to RootState
    const token = state.user?.user?.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No authentication token found");
    }

    const resp = await customFetch.post("/jobs", job, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
      });
  },
});

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
