export const Feed = () => {
  return (
    <>
      <div>
        <h1 className="mb-3">Feed</h1>
        <div className="btn-group my-3" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-primary">
            <i className="fa-solid fa-plus" />
            Recommendations
          </button>
          <button type="button" className="btn btn-primary">
            <i className="fa-solid fa-plus" />
            Reading List
          </button>
          <button type="button" className="btn btn-primary">
            <i className="fa-solid fa-plus" />
            Reviews
          </button>
          <button type="button" className="btn btn-primary">
            <i className="fa-solid fa-plus" />
            Quotes
          </button>
        </div>
        <div className="mb-3">
          <h4>Recommendations</h4>
          <div className="d-flex">
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
            </div>
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
            </div>
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <h4>Reading List</h4>
          <div className="d-flex">
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
            </div>
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
            </div>
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <h4>Reviews</h4>
          <div className="d-flex">
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
              <div className="card-body">
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
              <div className="card-body">
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
            <div className="card w-25 p-3 m-3">
              <img src="https://placehold.co/600x400/png" alt="placeholder" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
              <div className="card-body">
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <h4>Quotes</h4>
          <div className="d-flex">
            <div className="card w-25 p-3 m-3">
              <div className="card-header">User</div>
              <div className="card-body">
                <figure>
                  <blockquote className="blockquote">
                    <p>
                      A well-known quote, contained in a blockquote element.
                    </p>
                  </blockquote>
                  <br />
                  <figcaption className="blockquote-footer">
                    Author in <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="card w-25 p-3 m-3">
              <div className="card-header">User</div>
              <div className="card-body">
                <figure>
                  <blockquote className="blockquote">
                    <p>
                      A well-known quote, contained in a blockquote element.
                    </p>
                  </blockquote>
                  <br />
                  <figcaption className="blockquote-footer">
                    Author in <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="card w-25 p-3 m-3">
              <div className="card-header">User</div>
              <div className="card-body">
                <figure>
                  <blockquote className="blockquote">
                    <p>
                      A well-known quote, contained in a blockquote element.
                    </p>
                  </blockquote>
                  <br />
                  <figcaption className="blockquote-footer">
                    Author in <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
