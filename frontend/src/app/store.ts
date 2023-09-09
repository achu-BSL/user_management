import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './features/message/messageSlice';
import isLoadingReducer from './features/isLoading/isLoadingSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
    reducer: {
        message: messageReducer,
        isLoading: isLoadingReducer,
        user: userReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;