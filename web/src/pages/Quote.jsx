export const Quote = () => {
  return (
    <>
      <div>
        <div className="card w-25 m-3">
          <div className="card-body">
            <div className="mb-2">
              <textarea className="card-text"></textarea>
            </div>
            <div className="mb-1">
              <button type="button" className="btn btn-primary">
                Select Author
              </button>
            </div>
            <div>
              <button type="button" className="btn btn-primary">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
