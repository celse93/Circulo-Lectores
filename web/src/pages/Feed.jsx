import { Recommendations } from '../components/Recommendations';
import { ReadingLists } from '../components/ReadingList';
import { Quotes } from '../components/Quotes';

export const Feed = () => {
  return (
    <>
      <div>
        <div>
          <div className="container-books mb-5">
            <h4>Leídos</h4>
            <Recommendations />
          </div>
        </div>
        <div className="container-books mb-5">
          <h4>Por leer</h4>
          <ReadingLists />
        </div>
        <div className="mb-3">
          <h4>Citaciones</h4>
          <Quotes />
        </div>
      </div>
    </>
  );
};
