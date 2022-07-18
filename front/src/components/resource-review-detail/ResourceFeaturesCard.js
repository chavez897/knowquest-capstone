import { useSelector } from "react-redux";

export const ResourceFeaturesCard = ({price}) => {

  const resourceDetail = useSelector((state) => state.resourceReviewDetail);

  return (
    <div className="card bg-muted text-white">
      <div className="bg-light">
        <div className="row px-5 py-4">
          <div className="col-12 text-dark">
            <div>
              <p className="fw-bold fs-2">Resource Feature </p>
            </div>
            <div className="row my-2">
              <div className="col-12 text-start fs-3 text-warning">{price}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Media Type:</div>
              <div className="col-6 text-end fw-lighter">{resourceDetail.resourceMediaType}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Subject:</div>
              <div className="col-6 text-end fw-lighter">{resourceDetail.subject}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Semesmter:</div>
              <div className="col-6 text-end fw-lighter">{resourceDetail.semester}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Year:</div>
              <div className="col-6 text-end fw-lighter">{resourceDetail.year}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
