import { getAllReviews } from '../services/api/feed';
import { getBooksDetail, getAuthorDetail } from '../services/api/books';
import { useNavigate } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/User';
import { getProfileNames } from '../services/api/users';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [profileNames, setProfileNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchBookAndProfile = async () => {
      if (reviews.length > 0) {
        try {
          const bookDetailPromises = reviews.map((review) =>
            getBooksDetail(review.book_id)
          );
          const bookDetails = await Promise.all(bookDetailPromises);

          const profileDetailPromises = reviews.map((review) =>
            getProfileNames(review.user_id)
          );
          const profileDetails = await Promise.all(profileDetailPromises);

          setBookDetails(bookDetails);
          setProfileNames(profileDetails);

          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch book details:', error);
        }
      }
    };
    fetchBookAndProfile();
  }, [reviews]);

  return loading ? (
    <p>Cargando... </p>
  ) : (
    <div className="d-flex flex-row overflow-auto">
      {reviews.map((review) => {
        const associatedBook = bookDetails.find(
          (book) => book.book_id == review.book_id
        );
        const associatedProfile = profileNames.find(
          (profile) => profile.id == review.user_id
        );
        return (
          <div
            key={review.id}
            className="card card-reviews m-3 overflow-scroll"
          >
            <div className="card-header">
              {associatedProfile ? associatedProfile.name : 'Sin nombre'}
            </div>
            <div className="card-body">
              <h6 className="card-title">
                {review.ratings}
                <i className="fa-solid fa-star ms-1"></i>
              </h6>
              <p className="card-text">{review.text}</p>
            </div>
            <div className="card-footer">
              <cite title="Source Title">
                {associatedBook ? associatedBook.title : 'Sin titulo'}
              </cite>
            </div>
          </div>
        );
      })}
    </div>
  );
};
