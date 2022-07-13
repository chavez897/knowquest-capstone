import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { axiosInstance } from "../../plugins/axios";
import { BookDataCard } from "../book-review-detail/BookDataCard";
import { EditReview } from "./EditReview";
import { BookFeaturesCard } from "../book-review-detail/BookFeaturesCard";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export const EditScreen = () => {
  // state for all responses
  const [response, setResponse] = useState("");
  const location = useLocation();
  const { reviewId = "" } = queryString.parse(location.search);

  useEffect(() => {
    axiosInstance.get(`/books-ratings/${reviewId}/`).then((res) => {
      setResponse(res.data);
    });
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-md-8">
          {response !== "" ? (
            <BookDataCard
              authors={response.bookInfo ? response.bookInfo.authors : ""}
              reviews={response.overall ? response.overall.toString() : "0"}
              category="Book"
            />
          ) : null}
          <div className="py-3">
            <img src={""} alt="" />
          </div>
          {response !== "" ? (
            <EditReview response={response} />
          ) : (
            <>
              <div className="w-full row">
                <div
                  className="col-12 mt-5 mx-auto spinner-border text-warning"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col-12 col-md-4 mt-5 mt-md-0">
          <BookFeaturesCard price={""} />
        </div>
      </div>
    </div>
  );
};
