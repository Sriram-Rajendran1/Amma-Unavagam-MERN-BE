import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MenuList = createAsyncThunk(
  "menu/menulist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/menu/getmenu"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          ` There is a error in getting MenuList: ${error}`
        );
      }
    }
  }
);

const menulistslice = createSlice({
  name: "menuslice",
  initialState: {
    items: {
      data: [],
    },
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MenuList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(MenuList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(MenuList.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default menulistslice.reducer;
