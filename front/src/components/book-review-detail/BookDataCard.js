export const BookDataCard = ({ authors, reviews, category }) => {
  return (
    <div className="card bg-muted text-white">
      <div className="bg-light">
        <div className="row px-5 py-4">
          <div className="col-12 col-md-4 text-dark">
            <div className="row">
              <div>
                <p className="fw-bold">Author: </p>
              </div>
            </div>
            <div className="row pb-2">
              <div>{authors}</div>
            </div>
          </div>
          <div className="col-12 col-md-4 text-dark">
            <div className="row">
              <div>
                <p className="fw-bold">Reviews: </p>
              </div>
            </div>
            <div className="row pb-2">
              <div>{reviews}</div>
            </div>
          </div>
          <div className="col-12 col-md-4 text-dark">
            <div className="row">
              <div>
                <p className="fw-bold">Categories: </p>
              </div>
            </div>
            <div className="row pb-2">
              <div>{category}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
