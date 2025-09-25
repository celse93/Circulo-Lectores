import { baseUrl, fetchWrapper } from './config';

export const getBooksSearch = async (input) => {
  return await fetchWrapper(`${baseUrl}books_search/search.json?q=${input}`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getBooksDetail = async (id) => {
  return await fetchWrapper(`${baseUrl}book_detail/works/${id}.json`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getAuthorDetail = async (id) => {
  return await fetchWrapper(`${baseUrl}author/authors/${id}.json`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const postReadingList = async (bookId) => {
  return await fetchWrapper(`${baseUrl}reading_list/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      book_id: bookId,
    }),
  }).then((data) => {
    return data;
  });
};

export const postRecommendations = async (bookId) => {
  return await fetchWrapper(`${baseUrl}recommendations/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      book_id: bookId,
    }),
  }).then((data) => {
    return data;
  });
};

export const postQuote = async (bookId, text) => {
  return await fetchWrapper(`${baseUrl}quotes/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      book_id: bookId,
      text: text,
    }),
  }).then((data) => {
    return data;
  });
};
