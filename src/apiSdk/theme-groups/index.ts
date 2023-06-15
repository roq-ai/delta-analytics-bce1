import axios from 'axios';
import queryString from 'query-string';
import { ThemeGroupInterface, ThemeGroupGetQueryInterface } from 'interfaces/theme-group';
import { GetQueryInterface } from '../../interfaces';

export const getThemeGroups = async (query?: ThemeGroupGetQueryInterface) => {
  const response = await axios.get(`/api/theme-groups${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createThemeGroup = async (themeGroup: ThemeGroupInterface) => {
  const response = await axios.post('/api/theme-groups', themeGroup);
  return response.data;
};

export const updateThemeGroupById = async (id: string, themeGroup: ThemeGroupInterface) => {
  const response = await axios.put(`/api/theme-groups/${id}`, themeGroup);
  return response.data;
};

export const getThemeGroupById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/theme-groups/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteThemeGroupById = async (id: string) => {
  const response = await axios.delete(`/api/theme-groups/${id}`);
  return response.data;
};
