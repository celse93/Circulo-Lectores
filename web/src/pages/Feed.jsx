import { Recommendations } from '../components/Recommendations';
import { ReadingLists } from '../components/ReadingList';
import { Quotes } from '../components/Quotes';
import { Reviews } from '../components/Reviews';

export const Feed = () => {
  return (
    <div className="bg-dark mt-5">
      <div className="d-flex flex-column align-items-center mt-5 pt-5">
        <div className="feed-container pt-3">
          <div className="d-flex mb-2">
            <i className="fa-solid fa-heart fa-2x me-3 text-danger"></i>
            <h4>Leídos</h4>
          </div>
          <Recommendations />
        </div>
        <div className="feed-container">
          <div className="d-flex mb-2">
            <i className="fa-solid fa-book-open fa-2x me-3 text-success"></i>
            <h4>Por leer</h4>
          </div>
          <ReadingLists />
        </div>
        <div className="feed-container">
          <div className="d-flex mb-2">
            <i className="fa-solid fa-star fa-2x me-3 text-info"></i>{' '}
            <h4>Reseñas</h4>
          </div>
          <Reviews />
        </div>
        <div className="feed-container">
          <div className="d-flex mb-2">
            <i className="fa-solid fa-quote-left fa-2x me-3 text-warning"></i>
            <h4>Citaciones</h4>
          </div>
          <Quotes />
        </div>
      </div>
    </div>
  );
};
