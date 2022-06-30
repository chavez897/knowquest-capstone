import { useSelector } from "react-redux";

export const DescriptionTab = () => {
  const bookDetail = useSelector((state) => state.bookReviewDetail);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="pt-1">
            <p className="fw-bold fs-2">{bookDetail.bookTitle} </p>
          </div>
          <div className="pb-3 pt-2">{bookDetail.bookDescription}</div>
        </div>
      </div>
    </>
  );
};
