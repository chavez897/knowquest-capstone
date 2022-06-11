import { useSelector } from "react-redux";

export const BookFeaturesCard = () => {

  const bookDetail = useSelector((state) => state.bookReviewDetail);

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
              <div className="col-6 text-end fw-lighter">{bookDetail.publishDate}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Manual:</div>
              <div className="col-6 text-end fw-lighter">{bookDetail.hasManual ? "Yes" : "No"}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Slides:</div>
              <div className="col-6 text-end fw-lighter">{bookDetail.hasSlides ? "Yes" : "No"}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Assigment:</div>
              <div className="col-6 text-end fw-lighter">{bookDetail.hasAssigments ? "Yes" : "No"}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Digital:</div>
              <div className="col-6 text-end fw-lighter">{bookDetail.hasDigitalResource ? "Yes" : "No"}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Has Question Bank:</div>
              <div className="col-6 text-end fw-lighter">{bookDetail.hasQuestionBank ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
