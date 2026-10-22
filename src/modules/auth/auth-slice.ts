import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { sessionEnded } from '@/shared/events/session-events';
import { AuthStorage } from './auth-storage';
import { AuthService } from './auth-service';

type AuthStatus = 'LOADING' | 'SUCCESS' | 'FAILED';

interface AuthState {
  accessToken: string | null;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  status: AuthStatus;
}

const initialState: AuthState = {
  accessToken: null,
  isLoggingIn: false,
  isLoggedIn: false,
  status: 'LOADING',
};

export const clearLocalSession = createAsyncThunk(
  'auth/clearLocalSession',
  async (_, { dispatch }) => {
    dispatch(sessionEnded());
    await AuthStorage.clearTokens();
  },
);

export const refreshAccessToken = createAsyncThunk(
  'auth/restoreSession',
  async (_, { dispatch }) => {
    try {
      const refreshToken = await AuthStorage.getRefreshToken();
      const tokens = await AuthService.refresh(refreshToken);
      await AuthStorage.setRefreshToken(tokens.refreshToken);
      return tokens;
    } catch (error) {
      // A failed refresh invalidates the local session and cached user data.
      dispatch(sessionEnded());
      await AuthStorage.clearTokens();
      throw error;
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const credentials = await AuthService.login(email, password);
    await AuthStorage.setRefreshToken(credentials.refreshToken);
    return credentials;
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await AuthService.logout();
    } finally {
      try {
        await AuthStorage.clearTokens();
      } finally {
        dispatch(sessionEnded());
      }
    }
  },
);

const refreshAccessTokenBuilder = (
  builder: ActionReducerMapBuilder<AuthState>,
) => {
  builder
    .addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.status = 'SUCCESS';
    })
    .addCase(refreshAccessToken.rejected, (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.status = 'FAILED';
    });
};

const loginBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLoggingIn = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.status = 'SUCCESS';
    })
    .addCase(login.rejected, (state) => {
      state.isLoggingIn = false;
      state.isLoggedIn = false;
      state.status = 'FAILED';
    });
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    refreshAccessTokenBuilder(builder);
    loginBuilder(builder);
    builder.addCase(sessionEnded, (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.status = 'FAILED';
    });
  },
});

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
