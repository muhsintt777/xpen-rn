import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sessionEnded } from '@/store/session-events';
import { UserService } from './user-service';
import type { User } from './user-types';

type UserStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED';

interface UserState {
  currentUser: User | null;
  status: UserStatus;
}

const initialState: UserState = {
  currentUser: null,
  status: 'IDLE',
};

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  () => UserService.getCurrentUser(),
  {
    condition: (_, { getState }) => {
      const { status } = (getState() as { user: UserState }).user;
      return status !== 'LOADING' && status !== 'SUCCESS';
    },
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = 'SUCCESS';
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = 'FAILED';
      })
      .addCase(sessionEnded, () => initialState);
  },
});

export const selectCurrentUser = (state: { user: UserState }) =>
  state.user.currentUser;
export const selectUserStatus = (state: { user: UserState }) =>
  state.user.status;
export const userReducer = userSlice.reducer;
