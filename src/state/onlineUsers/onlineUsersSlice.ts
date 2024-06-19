import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    data: {},
};

const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        setOnlineUserData: (state, action) => {
            state.data = action.payload;
        },
        RemoveOnlineUserData: (state) => {
            state.data = {};
        },
    },
});

export const { setOnlineUserData, RemoveOnlineUserData } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;
