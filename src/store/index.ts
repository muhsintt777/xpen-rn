import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/modules/auth/auth-slice';
import { categoryReducer } from '@/modules/category/category-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
