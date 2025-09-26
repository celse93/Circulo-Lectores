import { Recommendations } from '../components/Recommendations';
import { ReadingLists } from '../components/ReadingList';
import { Quotes } from '../components/Quotes';
import { Reviews } from '../components/Reviews';

export const Feed = () => {
  return (
    <>
      <div>
        <div className="feed-container mt-4">
          <h4>Leídos</h4>
          <Recommendations />
        </div>
        <div className="feed-container">
          <h4>Por leer</h4>
          <ReadingLists />
        </div>
        <div className="feed-container">
          <h4>Reseñas</h4>
          <Reviews />
        </div>
        <div className="feed-container">
          <h4>Citaciones</h4>
          <Quotes />
        </div>
      </div>
    </>
  );
};
