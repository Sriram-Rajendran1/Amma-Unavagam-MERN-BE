import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        userData
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(`Something went wrong During Signup: ${error}`);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        loginUserData
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(`Something went Wrong During Login : ${error}`);
      }
    }
  }
);

const AuthSlice = createSlice({
  name: "authslice",
  initialState: {
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    user: null,
    message: "",
    token: "",
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    restoreSession: (state, action) => {
      state.token = action.payload.token;
      state.user = JSON.parse(action.payload.user);
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.message = action.payload.message;
        state.token = action.payload.token;
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.message = action.payload.message;
        state.token = action.payload.token;
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", JSON.stringify(action.payload));
        console.log(action.payload.data);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default AuthSlice.reducer;
export const { logout, restoreSession } = AuthSlice.actions;
