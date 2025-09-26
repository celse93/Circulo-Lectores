import { baseUrl, fetchWrapper } from './config';

export const getBooksSearch = async (input) => {
  if (input == '') return console.error('¡Sin query!');
  return await fetchWrapper(`${baseUrl}books_search/search.json?q=${input}`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getBooksDetail = async (id) => {
  if (id == '') return console.error('¡Sin libro ID!');
  return await fetchWrapper(`${baseUrl}book_detail/works/${id}.json`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getAuthorDetail = async (id) => {
  if (id == '') return console.error('¡Sin autor ID!');
  return await fetchWrapper(`${baseUrl}author/authors/${id}.json`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const postReadingList = async (bookId) => {
  if (bookId == '') return alert('¡Sin libro!');
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
  if (bookId == '') return alert('¡Sin libro!');
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
  if (text == '') return alert('¡Texto vacío!');
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
