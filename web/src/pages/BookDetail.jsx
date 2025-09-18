import { useContext } from 'react';
import { UserContext } from '../context/User';

export const Book = () => {
  const { book } = useContext(UserContext);

  return (
    <>
      <div className="d-flex">
        <div className="container">
          <img
            src="https://placehold.co/600x400/png"
            className="img-fluid"
            alt="placeholder"
          />
        </div>
        <div className="container">
          <div>
            <h3>{book.title}</h3>
          </div>
          <div>
            <div className="d-flex">
              <i className="fa-solid fa-star"></i>
              <h6>{book.author}</h6>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Year of publication</p>
            <p>Genre</p>
          </div>
        </div>
      </div>
    </>
  );
};
