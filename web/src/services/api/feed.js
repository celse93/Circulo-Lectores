import { baseUrl, fetchWrapper } from './config';

export const getAllRecommendations = async () => {
  return await fetchWrapper(`${baseUrl}recommendations`, {
    method: 'GET',
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};
