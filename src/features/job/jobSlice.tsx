import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from '../../utils/localstorage'

interface initialStateType{
    isLoading:boolean;
    position:string;
    company:string;
    jobLocation:string;
    jobTypeOptions:string[];
    jobType:string;
    statusOptions:string[];
    status:string;
    isEditing:boolean;
    editJobId:string;
}
const initialState:initialStateType = {
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
const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers:{}
    
});

export default jobSlice.reducer