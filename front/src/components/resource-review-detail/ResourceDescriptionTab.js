import { useSelector } from "react-redux";

export const ResourceDescriptionTab = () => {
  const resourceDetail = useSelector((state) => state.resourceReviewDetail);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="pt-1">
            <p className="fw-bold fs-2">{resourceDetail.resourceTitle} </p>
          </div>
          <div className="pb-3 pt-2">{resourceDetail.resourceTitle}</div>
        </div>
      </div>
    </>
  );
};
