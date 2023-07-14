import { configureStore } from "@reduxjs/toolkit";
import auth from "../modules/auth";
const store = configureStore({
  reducer: {
    auth,
  },
  devTools: !import.meta.env.PROD,
});

export default store;
