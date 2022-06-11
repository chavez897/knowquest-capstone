import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../ui/Breadcrumb";
import { BookDataCard } from "./BookDataCard";
import { BookFeaturesCard } from "./BookFeaturesCard";
import { ReviewTabsCard } from "./ReviewTabsCard";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { getBooksData } from "../../actions/bookReviewDetail";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../plugins/axios";

export const BookReviewDetailScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { bookId = "" } = queryString.parse(location.search);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    dispatch(getBooksData(bookId)).then(() => {
      Swal.close();
      setLoading(false);
    });
    axiosInstance
        .get(`/books-ratings/comments/?book_id=${bookId}`)
        .then((res) => {
          setComments(res.data)

        })
  }, [bookId]);

  const bookDetail = useSelector((state) => state.bookReviewDetail);

  return (
    <div className="container py-5">
      <Breadcrumb main="Rating Details" />
      {!loading ? (
        <>
          <div className="pb-5 pt-2">
            <p className="fw-bold fs-2">{bookDetail.bookTitle} </p>
          </div>
          <div className="row">
            <div className="col-12 col-md-8">
              <BookDataCard
                authors={bookDetail.bookAuthors}
                reviews={bookDetail.total ? bookDetail.total.toString() : "0"}
                category="Book"
              />
              <div className="py-3">
                <img
                  src={bookDetail.bookImage}
                  alt=""
                />
              </div>
              <ReviewTabsCard comments={comments}/>
            </div>
            <div className="col-12 col-md-4 mt-5 mt-md-0">
              <BookFeaturesCard />
            </div>
          </div>
        </>
      ): null}
    </div>
  );
};
