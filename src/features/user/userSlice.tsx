import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import {
  addUserTolocalStorage,
  getUserFromLocalStorage,
  removeUserfronLocalStorage,
} from "../../utils/localstorage";
interface InitialStateType {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: { name?: string; email?: string;lastName?:string;location?:string } | null;
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
  isMember?: boolean;
}

interface RegisterUserResponse {
  user: {
    name: string;
    email: string;
    password: string;
  };
}
interface LoginUserResponse {
  user: {
    name?: string;
    email: string;
    password: string;
  };
}

const initialState: InitialStateType = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserType,
  { rejectValue: string }
>("user/registerUser", async (user: RegisterUserType, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/register", user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const loginUser = createAsyncThunk<
  LoginUserResponse,
  LoginUserType,
  { rejectValue: string }
>("user/loginUser", async (user: LoginUserType, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

//REDUCERS
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserfronLocalStorage();
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  //EXTRA REDUCERS
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterUserResponse>) => {
          const { user } = action.payload;
          state.isLoading = false;
          state.user = user;
          addUserTolocalStorage(user);
          toast.success(`Hello There ${user.name}`);
        }
      )
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (action.payload) {
            toast.error(action.payload);
          }
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginUserResponse>) => {
          const { user } = action.payload;

          state.isLoading = false;
          state.user = user;
          addUserTolocalStorage(user);
          toast.success(`Welcome back ${user.name}`);
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (action.payload) {
            toast.error(action.payload);
          }
        }
      );
  },
});
export const { toggleSidebar,logoutUser } = userSlice.actions;
export default userSlice.reducer;
