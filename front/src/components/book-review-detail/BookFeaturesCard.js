export const BookFeaturesCard = ({ price, features }) => {
  return (
    <div className="card bg-muted text-white">
      <div className="bg-light">
        <div className="row px-5 py-4">
          <div className="col-12 text-dark">
            <div>
              <p className="fw-bold fs-2">Book Feature </p>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fs-3 text-warning">$0</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Publish Date:</div>
              <div className="col-6 text-end fw-lighter">15-12-2005</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Manual:</div>
              <div className="col-6 text-end fw-lighter">Yes</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Slides:</div>
              <div className="col-6 text-end fw-lighter">Yes</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Assigment:</div>
              <div className="col-6 text-end fw-lighter">Yes</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Digital:</div>
              <div className="col-6 text-end fw-lighter">Yes</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Video:</div>
              <div className="col-6 text-end fw-lighter">Yes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
