import { Recommendations } from '../components/Recommendations';
import { ReadingLists } from '../components/ReadingList';
import { Quotes } from '../components/Quotes';
import { Reviews } from '../components/Reviews';

export const Feed = () => {
  return (
    <>
      <div className="feed-container">
        <div className="container-books mb-5">
          <h4>Leídos</h4>
          <Recommendations />
        </div>
        <div className="container-books mb-5">
          <h4>Por leer</h4>
          <ReadingLists />
        </div>
        <div className="container-books mb-5">
          <h4>Reseñas</h4>
          <Reviews />
        </div>
        <div className="container-books">
          <h4>Citaciones</h4>
          <Quotes />
        </div>
      </div>
    </>
  );
};
