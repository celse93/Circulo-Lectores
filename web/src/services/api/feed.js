import { baseUrl, fetchWrapper } from './config';

export const getAllRecommendations = async () => {
  return await fetchWrapper(`${baseUrl}recommendations`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getAllReadingLists = async () => {
  return await fetchWrapper(`${baseUrl}reading_list`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getAllQuotes = async () => {
  return await fetchWrapper(`${baseUrl}quotes`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};
