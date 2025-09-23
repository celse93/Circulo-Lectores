import { baseUrl, fetchWrapper } from './config';

export const getAllRecommendations = async () => {
  return await fetchWrapper(`${baseUrl}recommendations/user`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getAllReadingLists = async () => {
  return await fetchWrapper(`${baseUrl}reading_list/user`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getAllQuotes = async () => {
  return await fetchWrapper(`${baseUrl}quotes/user`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};
