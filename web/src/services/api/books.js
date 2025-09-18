import { baseUrl, fetchWrapper } from './config';

export const getBooksSearch = async (input) => {
  return await fetchWrapper(
    `${baseUrl}books_search/search.json?title=${input}`,
    {
      credentials: 'include',
    }
  ).then((data) => {
    return data;
  });
};
