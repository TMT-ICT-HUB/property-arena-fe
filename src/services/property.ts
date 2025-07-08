// services/property.service.ts
import { API } from './api';
import { API_ROUTES } from '@/constants';
import { CreatePropertyRequest, CreatePropertyResponse } from '@/types';
import { PropertyFormData } from '@/types/property';

const createProperty = async (data: CreatePropertyRequest): Promise<CreatePropertyResponse> => {
  return API(API_ROUTES.CREATE_PROPERTY, {
    method: 'POST',
    auth: true,
    body: JSON.stringify(data.propertyData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


const getProperty = async (id: string) => {
  return API(`${API_ROUTES.GET_PROPERTY}/${id}`, {
    method: 'GET',
    auth: true
  });
};

const updateProperty = async (id: string, data: Partial<PropertyFormData>) => {
  return API(`${API_ROUTES.UPDATE_PROPERTY}/${id}`, {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(data)
  });
};

const deleteProperty = async (id: string) => {
  return API(`${API_ROUTES.DELETE_PROPERTY}/${id}`, {
    method: 'DELETE',
    auth: true
  });
};

export const PROPERTY_SERVICE = {
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
};
