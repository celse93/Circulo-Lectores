import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import {
  getBooksSearch,
  postRecommendations,
  postReadingList,
  postReview,
} from '../services/api/books';
import { postQuote } from '../services/api/books';
import { updateProfile, getCurrentUser } from '../services/api/users';
import { getUserStats } from '../services/api/follows';
import Modal from '@mui/material/Modal';

export const CreatePosts = () => {
  const { logout, profile, setUser, setProfile } = useContext(UserContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [quote, setQuote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [books, setBooks] = useState([]);
  const [bookSelected, setBookSelected] = useState({});
  const [newUsername, setNewUsername] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showReadingListModal, setShowReadingListModal] = useState(false);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('reading');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [content, setContent] = useState();
  const [open, setOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Por favor ingresa un término de búsqueda');
      return;
    }
    setError('');
    try {
      const result = await getBooksSearch(query);
      setBooks(result);
    } catch (error) {
      console.error(error);
      setError('Error al buscar libros. Intenta de nuevo.');
      setBooks([]);
    }
  };

  const handleBookSelected = (book) => {
    setQuery(book.title);
    setBookSelected(book);
    setBooks([]);
  };

  const handleCloseModals = () => {
    setQuery('');
    setQuote('');
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseAddModal = () => setShowModal(false);

  const handleSaveReadingList = async () => {
    try {
      const saveReadingList = await postReadingList(bookSelected.book_id);
      alert(`${saveReadingList['message']}`);
      setShowReadingListModal(false);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setQuery('');
      setBooks([]);
      setBookSelected({});
    }
  };

  const handleSaveNewRecommendation = async () => {
    try {
      const saveRecommendation = await postRecommendations(
        bookSelected.book_id
      );
      alert(`${saveRecommendation['message']}`);
      setShowRecommendationModal(false);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setQuery('');
      setBooks([]);
      setBookSelected({});
    }
  };

  const handleSaveNewQuote = async () => {
    try {
      const saveQuote = await postQuote(bookSelected.book_id, quote.trim());
      alert(`${saveQuote['message']}`);
      setShowNewQuoteModal(false);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setQuery('');
      setQuote('');
      setBooks([]);
      setBookSelected({});
    }
  };

  const handleSaveReview = async () => {
    try {
      const saveReview = await postReview(
        bookSelected.book_id,
        review.trim(),
        rating
      );
      alert(`${saveReview['message']}`);
      setShowReviewModal(false);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setQuery('');
      setReview('');
      setRating(0);
      setBooks([]);
      setBookSelected({});
    }
  };

  const handleCloseNewModals = () => {
    setShowReadingListModal(false);
    setShowRecommendationModal(false);
    setShowNewQuoteModal(false);
    setShowReviewModal(false);
    setQuery('');
    setQuote('');
    setReview('');
    setRating(0);
    setHoverRating(0);
    setBooks([]);
    setBookSelected({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const dropdownElement = form.elements.options;
    const selectedValue = dropdownElement.value;

    try {
      if (selectedValue == 'review') {
        const saveReview = await postReview(
          bookSelected.book_id,
          content.trim()
        );
        alert(`${saveReview['message']}`);
      }

      if (selectedValue == 'quote') {
        const saveQuote = await postQuote(bookSelected.book_id, content.trim());
        alert(`${saveQuote['message']}`);
      }

      if (selectedValue == 'recommendation') {
        const saveRecommendation = await postRecommendations(
          bookSelected.book_id
        );
        alert(`${saveRecommendation['message']}`);
      }

      if (selectedValue == 'reading') {
        const saveReadingList = await postReadingList(bookSelected.book_id);
        alert(`${saveReadingList['message']}`);
      }

      setShowReadingListModal(false);
      setShowRecommendationModal(false);
      setShowNewQuoteModal(false);
      setShowReviewModal(false);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setQuery('');
      setReview('');
      setBooks([]);
      setBookSelected({});
      navigate('/');
    }
  };

  const handleOnChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const showContent = selectedOption == 'quote' || selectedOption == 'review';
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button onClick={handleOpen}>Share Book</button>
      <Modal open={open} onClose={handleClose}>
        <div className="post-modal">
          <h5>Share Your Reading Experience</h5>
          <form onSubmit={handleSubmit}>
            <label htmlFor="options">Choose a car:</label>
            <select
              onChange={handleOnChange}
              value={selectedOption}
              name="options"
              id="options"
            >
              <option value="reading">Want to Read</option>
              <option value="recommendation">Book I've Read</option>
              <option value="quote">Favorite Quote</option>
              <option value="review">Book Review</option>
            </select>

            <div>
              <div>
                <label className="text-white">Libro:</label>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Buscar libros por título, autor..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearch();
                      }
                    }}
                  />
                </div>
                {books.length > 0 && (
                  <ul className="list-group mt-2">
                    {books.map((book) => (
                      <li
                        key={book.book_id}
                        className="list-group-item list-group-item-action d-flex"
                      >
                        <button
                          type="button"
                          onClick={() => handleBookSelected(book)}
                          className="dropdown-item d-flex align-items-center"
                        >
                          <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
                            className="me-3"
                            style={{
                              width: '40px',
                              height: '60px',
                              objectFit: 'cover',
                            }}
                          />
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{book.title}</h6>
                            <small className="text-muted">{book.author}</small>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {showContent && (
              <div>
                <label htmlFor="content">
                  {selectedOption == 'quote' ? 'Quote *' : 'Your Review *'}
                </label>
                <textarea
                  id="content"
                  placeholder={
                    selectedOption == 'quote'
                      ? 'Enter your favorite quote from this book...'
                      : 'Share your thoughts about this book...'
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="5"
                  required
                />
              </div>
            )}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Modal>
    </>
  );
};
