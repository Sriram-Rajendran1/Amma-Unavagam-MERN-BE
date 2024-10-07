import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/AuthSlice";
import MenuReducer from "./features/MenuSlice";
import OrderReducer from "./features/OrderSlice";

export const store = configureStore({
  reducer: {
    authslice: AuthReducer,
    menuslice: MenuReducer,
    orderslice: OrderReducer,
  },
});
