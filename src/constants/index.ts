
// export const BASE_URL = 'http://localhost:4006/api/v1';
const BASE_URL = import.meta.env.VITE_API_URL as string;

export const API_ROUTES = {
  // CREATE_ADMIN: `${BASE_URL}/admins/send-invite`,
  // DELETE_ADMIN: `${BASE_URL}/admins`,
  // GET_ADMINS: `${BASE_URL}/admins`,
  GET_USERS: `${BASE_URL}/dashboard`,
  // GET_USERS: `${BASE_URL}/dashboard`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
};
