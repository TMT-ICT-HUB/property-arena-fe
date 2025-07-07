/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { API } from '../services/api';

// Vite environment variable for backend base URL
const BASE_URL = import.meta.env.VITE_API_URL as string;

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: string;
// }

interface AuthState {
  accessToken: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await API(
            `${BASE_URL}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
              auth: false,
            }
          );
          set({ accessToken: data.accessToken, user: data.user });
        } catch (err: any) {
          if (err.status >= 400 && err.status < 500) {
            set({ error: err.message });
            throw err;
          } else {
            // Let global handler catch server errors - it will detect 'login' from stack
            throw err;
          }
        } finally {
          set({ loading: false });
        }
      },

      signup: async (name, email, password) => {
        set({ loading: true, error: null });
        console.log("Name in signup auth: ", name)
        try {
          await API(
            `${BASE_URL}/auth/signup`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, password }),
              auth: false,
            }
          );
          await get().login(email, password);
        } catch (err: any) {
          if (err.status >= 400 && err.status < 500) {
            set({ error: err.message });
            throw err;
          } else {            
            throw err;
          }
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({ accessToken: null, user: null });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);
