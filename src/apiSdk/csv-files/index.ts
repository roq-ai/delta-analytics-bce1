import axios from 'axios';
import queryString from 'query-string';
import { CsvFileInterface, CsvFileGetQueryInterface } from 'interfaces/csv-file';
import { GetQueryInterface } from '../../interfaces';

export const getCsvFiles = async (query?: CsvFileGetQueryInterface) => {
  const response = await axios.get(`/api/csv-files${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCsvFile = async (csvFile: CsvFileInterface) => {
  const response = await axios.post('/api/csv-files', csvFile);
  return response.data;
};

export const updateCsvFileById = async (id: string, csvFile: CsvFileInterface) => {
  const response = await axios.put(`/api/csv-files/${id}`, csvFile);
  return response.data;
};

export const getCsvFileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/csv-files/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCsvFileById = async (id: string) => {
  const response = await axios.delete(`/api/csv-files/${id}`);
  return response.data;
};
