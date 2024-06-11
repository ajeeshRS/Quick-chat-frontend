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
    },
});

export const { setPeerData, RemovePeerData } = peerSlice.actions;
export default peerSlice.reducer;
