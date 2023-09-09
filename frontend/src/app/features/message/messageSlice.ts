import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageInterface {
  id: string;
  message: string;
  isError: boolean;
}

const initialState = [] as MessageInterface[];

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageInterface>) => {
      if (state.length === 5) state = state.slice(1);
      state.push(action.payload);
    },
    removeMessage: (state) => {
      state.shift();
    },
  },
});

export default messageSlice.reducer;
export const { addMessage, removeMessage } = messageSlice.actions;
