import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

interface InitialStateType {
  isLoading: boolean;
  user: string | null;
}

interface LoginUserType {
  name?: string;
  email: string;
  password: string;
  isMember?: boolean;
}

interface RegisterUserType {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

const initialState: InitialStateType = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserType,
  { rejectValue: string }
>(
  "user/registerUser",
  async (user: RegisterUserType, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);


// Ahercode!@123
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: LoginUserType, thunkAPI) => {
    console.log(`Login user: ${user}`);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterUserResponse>) => {
        const { user } = action.payload;
        state.isLoading = false;
        state.user = user.name;
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        if (action.payload) {
          toast.error(action.payload);
        }
      });
  },
});

export default userSlice.reducer;