import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userState {
    user: object;
}

const initialState: userState = {
    user: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<object>) => {
            state.user = action.payload;
        },
    }
});



export const { setUser } = userSlice.actions;

export default userSlice.reducer;