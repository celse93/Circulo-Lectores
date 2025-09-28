import { Recommendations } from '../components/Recommendations';
import { ReadingLists } from '../components/ReadingList';
import { Quotes } from '../components/Quotes';
import { Reviews } from '../components/Reviews';

export const Feed = () => {
  return (
    <div>
      <div className="feed-container mt-4">
        <i className="fa-solid fa-heart fa-2x me-3 text-danger"></i>
        <h4>Leídos</h4>
        <Recommendations />
      </div>
      <div className="feed-container">
        <i className="fa-solid fa-book-open fa-2x me-3 text-success"></i>
        <h4>Por leer</h4>
        <ReadingLists />
      </div>
      <div className="feed-container">
        <i className="fa-solid fa-star fa-2x me-3 text-info"></i>{' '}
        <h4>Reseñas</h4>
        <Reviews />
      </div>
      <div className="feed-container">
        <i className="fa-solid fa-quote-left fa-2x me-3 text-warning"></i>
        <h4>Citaciones</h4>
        <Quotes />
      </div>
    </div>
  );
};
