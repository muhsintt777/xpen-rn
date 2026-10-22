import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { api } from '@/shared/services/api';
import { store } from '@/app/store';
import { clearLocalSession, refreshAccessToken } from './auth-slice';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let configured = false;

export const configureAuthApiInterceptors = () => {
  if (configured) {
    return;
  }
  configured = true;

  api.interceptors.request.use((config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  let refreshPromise: Promise<{ accessToken: string }> | null = null;

  const refreshAccessTokenOnce = () => {
    if (!refreshPromise) {
      refreshPromise = store
        .dispatch(refreshAccessToken())
        .unwrap()
        .finally(() => {
          refreshPromise = null;
        });
    }
    return refreshPromise;
  };

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ errorType?: string }>) => {
      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;
      const errorType = error.response?.data?.errorType;

      if (errorType === 'SIGNED_OUT') {
        store.dispatch(clearLocalSession());
        return Promise.reject(error);
      }

      if (
        errorType !== 'AUTH_TOKEN_EXPIRED' ||
        !originalRequest ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const currentToken = store.getState().auth.accessToken;
        const failedWithToken = originalRequest.headers.Authorization;
        const accessToken =
          currentToken && failedWithToken !== `Bearer ${currentToken}`
            ? currentToken
            : (await refreshAccessTokenOnce()).accessToken;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    },
  );
};
