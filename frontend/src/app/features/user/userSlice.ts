import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  username: string | null;
  email: string | null;
  profile: string | null;
};

const initialState: User = {
  username: null,
  email: null,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_state: User, action: PayloadAction<User>) => {
      return {
        ...action.payload,
      };
    },
    removeUser: () => {
      return {
        username: null,
        email: null,
        profile: null,
      };
    },
  },
});


export default userSlice.reducer;
export const { addUser, removeUser} = userSlice.actions;