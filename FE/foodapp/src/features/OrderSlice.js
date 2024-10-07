import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderDetailsData = createAsyncThunk(
  "order/orderdata",
  async (orderDetails, { rejectWithValue, getState }) => {
    const { orderslice } = getState();
    const combinedOrderData = {
      dishes: orderslice.dishes,
      deliverydetails: orderslice.deliverydetails,
      finalprice: orderslice.finalprice,
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/order/postorder`,
        combinedOrderData
      );
      return response.data;
    } catch (error) {
      if (error && error.response && error.response.data) {
        return rejectWithValue(error.response);
      } else {
        return rejectWithValue(
          `Something went error while Placing the Order : ${error}`
        );
      }
    }
  }
);

const orderslice = createSlice({
  name: "orderslice",
  initialState: {
    isError: false,
    isLoading: false,
    message: "",
    dishes: [],
    orderHistory: [],
    finalprice: 0,
    deliverydetails: "",
  },
  reducers: {
    addDishes: (state, action) => {
      state.dishes.push(action.payload);
    },
    clearOrders: (state) => {
      state.dishes = [];
      state.finalprice = 0;
    },
    incrementQuantity: (state, action) => {
      const dishIndex = state.dishes.findIndex(
        (item) => item.id === action.payload.id
      );
      if (dishIndex >= 0) {
        state.dishes[dishIndex].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const dishIndex = state.dishes.findIndex(
        (item) => item.id === action.payload.id
      );
      if (dishIndex >= 0 && state.dishes[dishIndex].quantity > 1) {
        state.dishes[dishIndex].quantity -= 1;
      }
    },
    finalPrice: (state, action) => {
      state.finalprice = action.payload;
    },
    deliverydetails: (state, action) => {
      state.deliverydetails = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(orderDetailsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "Loading";
      })
      .addCase(orderDetailsData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.message = action.payload.message;
        // const { dishes, deliverydetails, finalprice } =
        //   action.payload.finalorder;
        // state.dishes = dishes;
        // state.deliveryDetails = deliverydetails;
        // state.totalPrice = finalprice;

        // Add the completed order to orderHistory
        state.orderHistory.push({
          dishes: state.dishes,
          finalprice: state.finalprice,
          deliverydetails: state.deliverydetails,
        });

        // Clear current order details
        state.dishes = [];
        state.finalprice = 0;
        state.deliverydetails = "";
      })
      .addCase(orderDetailsData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default orderslice.reducer;
export const {
  addDishes,
  clearOrders,
  incrementQuantity,
  decrementQuantity,
  finalPrice,
  deliverydetails,
} = orderslice.actions;
