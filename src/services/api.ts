import axios from 'axios';
import { ENV } from '@/shared/config/env';

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
