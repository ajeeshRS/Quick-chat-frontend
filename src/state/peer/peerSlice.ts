import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    data: {},
};

const peerSlice = createSlice({
    name: 'peerData',
    initialState,
    reducers: {
        setPeerData: (state, action) => {
            state.data = action.payload;
        },
        RemovePeerData: (state) => {
            state.data = {};
        },
        setPeerMessage: (state, action) => {
            state.data.message = action.payload;
        }
    },
});

export const { setPeerData, RemovePeerData, setPeerMessage } = peerSlice.actions;
export default peerSlice.reducer;
