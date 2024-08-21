import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Toast } from "react-toastify/dist/components";

interface initialStateType {
    isLoading: boolean;
    user: string | null;
}

interface loginUserType {
    email: string;
    password: string;
}

const initialState: initialStateType = {
    isLoading: false,
    user: null,
};

export const registerUser = createAsyncThunk("user/registerUser", async (user: loginUserType, thunkAPI) => {
    console.log(`Register user: ${user}`);
});

export const loginUser = createAsyncThunk("user/loginUser", async (user: loginUserType, thunkAPI) => {
    console.log(`Login user: ${user}`);
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export default userSlice.reducer;