import { configureStore } from "@reduxjs/toolkit";
import OnBoardingReducer from "./slices/OnBoardingSlice";
import LoginReducer from "./slices/LoginSlice";
import UserReducer from "./slices/User";

export const store = configureStore({
  reducer: {
    onBoarding: OnBoardingReducer,
    login: LoginReducer,
    user: UserReducer,
  },
});
