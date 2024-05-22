import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import verifyOtpReducer from "./verifyOtp/verifyOtpSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        verifyOtp:verifyOtpReducer
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch