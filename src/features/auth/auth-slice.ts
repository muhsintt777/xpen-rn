import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { AuthService } from '@/features/auth/auth-service';
import { UserService } from '@/features/user/user-service';
import type { User } from '@/features/user/user-types';
import { AuthStorage } from '@/services/auth-storage';

type AuthStatus = 'LOADING' | 'SUCCESS' | 'FAILED';

interface AuthState {
  accessToken: string | null;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  status: AuthStatus;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  isLoggingIn: false,
  isLoggedIn: false,
  status: 'LOADING',
  user: null,
};

export const refreshAccessToken = createAsyncThunk(
  'auth/restoreSession',
  async () => {
    try {
      const refreshToken = await AuthStorage.getRefreshToken();
      return await AuthService.refresh(refreshToken);
    } catch (error) {
      // Drop the stored refresh token so the user is fully signed out.
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

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', () =>
  UserService.getCurrentUser(),
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await AuthService.logout();
  } finally {
    await AuthStorage.clearTokens();
  }
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

const currentUserBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
    state.user = action.payload;
  });
};

const logoutBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(logout.fulfilled, (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.user = null;
    })
    .addCase(logout.rejected, (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.user = null;
    });
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    refreshAccessTokenBuilder(builder);
    loginBuilder(builder);
    currentUserBuilder(builder);
    logoutBuilder(builder);
  },
});

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
