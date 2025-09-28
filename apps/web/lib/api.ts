import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  withCredentials: true,
});

export const createProject = async (data: {
  name: string;
  slug: string;
  templateId: string;
  locale: string;
}) => {
  const response = await apiClient.post('/projects', data);
  return response.data;
};
