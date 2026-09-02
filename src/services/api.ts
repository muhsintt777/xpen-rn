import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ENV } from '@/configs/env';
import { store } from '@/store';
import { refreshAccessToken } from '@/features/auth/auth-slice';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Serializes concurrent refresh attempts so only one refresh call is in flight at a time.
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ errorType?: string }>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const isSignedOut = error.response?.data?.errorType === 'SIGNED_OUT';

    if (!isSignedOut || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= store.dispatch(refreshAccessToken()).unwrap();
      const accessToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  },
);
