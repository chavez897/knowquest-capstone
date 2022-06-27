import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../plugins/axios";
import { BookDataCard } from "../book-review-detail/BookDataCard";
import { EditReview } from "./EditReview";
import { BookFeaturesCard } from "../book-review-detail/BookFeaturesCard";

export const EditScreen = () => {
  // state for all responses
  const [response, setResponse] = useState("");
  useEffect(() => {
    axiosInstance.get("/books-ratings/5/").then((res) => {
      setResponse(res.data);
    });
  }, []);
  console.log(response);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-md-8">
          <BookDataCard
            authors={response.bookInfo ? response.bookInfo.authors : ""}
            reviews={response.overall ? response.overall.toString() : "0"}
            category="Book"
          />
          <div className="py-3">
            <img src={""} alt="" />
          </div>
          <EditReview response={response}/>
        </div>
        <div className="col-12 col-md-4 mt-5 mt-md-0">
          <BookFeaturesCard price={""} />
        </div>
      </div>
    </div>
  );
};
