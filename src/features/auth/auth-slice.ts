import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { AuthService } from '@/features/auth/auth-service';
import { AuthStorage } from '@/services/auth-storage';

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

export const refreshAccessToken = createAsyncThunk(
  'auth/restoreSession',
  async () => {
    const refreshToken = await AuthStorage.getRefreshToken();
    const accessToken = await AuthService.refresh(refreshToken);
    return accessToken;
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

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthStorage.clearTokens();
  await AuthService.logout();
});

const refreshAccessTokenBuilder = (
  builder: ActionReducerMapBuilder<AuthState>,
) => {
  builder
    .addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
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

const logoutBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(logout.fulfilled, (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    })
    .addCase(logout.rejected, (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    });
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    refreshAccessTokenBuilder(builder);
    loginBuilder(builder);
    logoutBuilder(builder);
  },
});

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
