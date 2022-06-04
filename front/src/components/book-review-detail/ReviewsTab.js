import ReactStars from "react-rating-stars-component";

export const ReviewTab = () => {
  const values = [
    { name: "Appropriateness", value: 5.9 },
    { name: "Efectiveness", value: 5.0 },
    { name: "Value", value: 6.0 },
    { name: "VisualAids", value: 9.0 },
    { name: "Overall", value: 7.0 },
  ];
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row px-3">
            <div className="col-9">
              <div className="fw-bold fs-3">Book Review</div>
            </div>
            <div type="div" className="btn btn-primary col-3">
              Add a book Review
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-3">
              <ReactStars
                count={5}
                value={2.5}
                onChange={ratingChanged}
                size={30}
                activeColor="#ffd700"
                edit={false}
                isHalf={true}
              />
            </div>
            <div className="col-9">
              {values.map((val) => (
                <div key={val.name} className="row">
                  <div className="col-4">
                    <p>{val.name}</p>
                  </div>
                  <div className="col-7">
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
