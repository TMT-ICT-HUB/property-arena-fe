import { useAuthStore } from '../store/authStore';

// const BASE_URL = import.meta.env.VITE_API_URL as string;

export class APIError extends Error {
  public status: number;
  public statusText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public response?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, status: number, statusText: string, response?: any) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}

export const API = async (
  input: RequestInfo,
  init: RequestInit & { auth?: boolean } = {}
) => {
  const { auth, ...rest } = init;
  const headers = new Headers(rest.headers || {});
  headers.set('Content-Type', 'application/json');

  if (auth) {
    const token = useAuthStore.getState().accessToken;
    if (!token) throw new APIError('Not authenticated', 401, 'Unauthorized');
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(input, { ...rest, headers });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    window.location.reload();
    return;
  }

  if (!response.ok) {
    let errorResponse;
    try {
      errorResponse = await response.json();
    } catch {
      // If response body is not JSON, use statusText
      errorResponse = { message: response.statusText };
    }

    const errorMessage = errorResponse.message || response.statusText || 'API error';
    throw new APIError(errorMessage, response.status, response.statusText, errorResponse);
  }

  return response.json();
};