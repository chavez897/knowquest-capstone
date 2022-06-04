import ReactStars from "react-rating-stars-component";

export const ReviewTab = () => {
  const values = [
    { name: "Appropriateness", value: 1 },
    { name: "Efectiveness", value: 6 },
    { name: "Value", value: 4 },
    { name: "VisualAids", value: 8.0 },
    { name: "Overall", value: 9.0 },
  ];
  const count_ratings = 4
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row px-3">
            <div className="col-6 col-md-9">
              <div className="fw-bold fs-3">Book Review</div>
            </div>
            <div type="div" className="btn btn-primary col-6 col-md-3">
              Add a book Review
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 col-md-3 mt-4">
              <div className="fw-bold fs-1 mx-auto text-center col-12">
                {values[4].value / 2}
              </div>
              <div className="d-flex justify-content-center col-12">
                <ReactStars
                  count={5}
                  value={values[4].value / 2}
                  size={30}
                  activeColor="#ffd700"
                  edit={false}
                  isHalf={true}
                />
              </div>
              <div className="text-center fw-lighter">({count_ratings} ratings)</div>
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
