import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/modules/auth/state';
import { categoryReducer } from '@/modules/category';
import { userReducer } from '@/modules/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;