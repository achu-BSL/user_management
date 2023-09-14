import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
  id?: number;
  username: string | null;
  email: string | null;
  profile: string | null;
  isAdmin: boolean;
}

const initialState: User | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!):  null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_state: User | null, action: PayloadAction<User>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...action.payload,
      };
    },
    removeUser: () => {
      localStorage.removeItem("user");
      return null;
    },
  },
});


export default userSlice.reducer;
export const { addUser, removeUser} = userSlice.actions;
