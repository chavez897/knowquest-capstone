import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

export const ResourceReviewTab = () => {
  const resourceDetail = useSelector((state) => state.resourceReviewDetail);
  const values = [
    { name: "Effective", value: resourceDetail.effectiveAverage },
    { name: "Relevant", value: resourceDetail.relevantAverage },
    { name: "Ease of Use", value: resourceDetail.easyUseAverage },
    { name: "Value", value: resourceDetail.valueAverage },
    { name: "Helped with Class", value: resourceDetail.classHelped },
    { name: "Overall", value: resourceDetail.overallAverage },
  ];
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row px-3">
            <div className="col-6 col-md-9">
              <div className="fw-bold fs-3">Resource Review</div>
            </div>
            <div type="div" className="btn btn-primary col-6 col-md-3">
              Add a resource Review
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 col-md-3 mt-4">
              <div className="fw-bold fs-1 mx-auto text-center col-12">
                {resourceDetail.overallAverage / 2}
              </div>
              <div className="d-flex justify-content-center col-12">
                <ReactStars
                  count={5}
                  value={resourceDetail.overallAverage / 2}
                  size={30}
                  activeColor="#ffd700"
                  edit={false}
                  isHalf={true}
                />
              </div>
              <div className="text-center fw-lighter">({resourceDetail.total} ratings)</div>
            </div>
            <div className="col-12 col-md-9">
              {values.map((val) => (
                <div key={val.name} className="row mt-2">
                  <div className="col-12 col-md-4">
                    {val.name}
                  </div>
                  <div className="col-12 col-md-7">
                    <div className="review_rating_bar">
                      <div
                        className={"rating_value w-" + Math.round(val.value)}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
