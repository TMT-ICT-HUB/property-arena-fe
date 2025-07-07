import { API } from './api';
import { API_ROUTES } from '@/constants';
import { GetAllUsersResponse } from '@/types';

const getAllUsers = async (
  { page }: { page: number } = { page: 1 }
): Promise<GetAllUsersResponse> => {
  return API(
    `${API_ROUTES.GET_USERS}?page=${page}`,
    { method: 'GET', auth: true }
  );
};

export const USER_SERVICE = {
  getAllUsers,
};