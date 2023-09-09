import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const isLoadingSlice = createSlice({
    name: "isLoading",
    initialState: false,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return action.payload;
        }
    }
})

export default isLoadingSlice.reducer;
export const { setIsLoading } = isLoadingSlice.actions;