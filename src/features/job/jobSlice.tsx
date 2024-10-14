import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        handleChange: <K extends keyof InitialStateType>(state: InitialStateType, { payload }: PayloadAction<ChangePayload<K>>) => {
            state[payload.name] = payload.value; 
        },
    },
});


export const { handleChange } = jobSlice.actions;
export default jobSlice.reducer;
