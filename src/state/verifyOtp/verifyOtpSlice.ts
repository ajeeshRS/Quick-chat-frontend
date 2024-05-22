import { createSlice } from "@reduxjs/toolkit";

interface verifyOtpState {
    value: boolean;
}

const initialState: verifyOtpState = {
    value: false,
};

const verifyOtpSlice = createSlice({
    name: "verifyOtp",
    initialState,
    reducers: {
        setOtpVerified: (state) => {
            state.value = true
        },
    }
});



export const { setOtpVerified } = verifyOtpSlice.actions;

export default verifyOtpSlice.reducer;