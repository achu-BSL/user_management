import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './features/message/messageSlice';
import isLoadingReducer from './features/isLoading/isLoadingSlice'

const store = configureStore({
    reducer: {
        message: messageReducer,
        isLoading: isLoadingReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;