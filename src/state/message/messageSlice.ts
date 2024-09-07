import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface message {
  content: string;
  sender: string;
  recipient: string;
  date: string;
  time: string;
}

interface messageState {
  messages: message[];
}

const initialState: messageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "messageState",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setMessage,addMessage ,clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
