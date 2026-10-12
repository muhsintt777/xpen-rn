import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from '@/features/auth/auth-slice';
import { CategoryService } from './category-service';
import { Category } from './category-types';

interface CategoryState {
  items: Category[];
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';
}

const initialState: CategoryState = { items: [], status: 'IDLE' };

export const fetchCategories = createAsyncThunk(
  'category/fetch',
  () => CategoryService.list(),
  {
    // Skip the API call when categories are already cached or loading.
    condition: (_, { getState }) => {
      const { status } = (getState() as { category: CategoryState }).category;
      return status !== 'LOADING' && status !== 'SUCCESS';
    },
  },
);

const resetState = () => initialState;

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'SUCCESS';
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'FAILED';
      })
      .addCase(logout.fulfilled, resetState)
      .addCase(logout.rejected, resetState);
  },
});

export const selectCategories = (state: { category: CategoryState }) =>
  state.category.items;
export const selectCategoriesStatus = (state: { category: CategoryState }) =>
  state.category.status;
export const categoryReducer = categorySlice.reducer;
