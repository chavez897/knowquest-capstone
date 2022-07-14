import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { axiosInstance } from "../../plugins/axios";
import { BookDataCard } from "../book-review-detail/BookDataCard";
import { EditResourceReview } from "./EditResourceReview";
import { BookFeaturesCard } from "../book-review-detail/BookFeaturesCard";

export const EditResourceScreen = () => {
  // state for all responses
  const [response, setResponse] = useState("");
  const location = useLocation();
  const { reviewId = "" } = queryString.parse(location.search);

  useEffect(() => {
    axiosInstance.get(`/resources-ratings/${reviewId}/`).then((res) => {
      setResponse(res.data);
    });
  }, []);
  console.log(response);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-md-8">
          {response !== "" ? (
            <BookDataCard
              authors={response.resourceInfo.title ? response.resourceInfo.title : ""}
              reviews={response.overall ? response.overall.toString() : "0"}
              category="Resource"
            />
          ) : null}
          <div className="py-3">
            <img src={""} alt="" />
          </div>
          {response !== "" ? (
            <EditResourceReview response={response} />
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
