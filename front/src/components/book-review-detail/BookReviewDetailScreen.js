import { Breadcrumb } from "../ui/Breadcrumb";
import { BookDataCard } from "./BookDataCard";
import { BookFeaturesCard } from "./BookFeaturesCard";
import { ReviewTabsCard } from "./ReviewTabsCard";

export const BookReviewDetailScreen = () => {
  return (
    <div className="container py-5">
      <Breadcrumb main="Rating Details" />
      <div className="pb-5 pt-2">
        <p className="fw-bold fs-2">SQL Cookbook </p>
      </div>
      <div className="row">
        <div className="col-12 col-md-8">
          <BookDataCard
            authors="Anthony Molinaro David McFarland"
            reviews="4"
            category="Book"
          />
          <div className="py-3">
            <img
              src="https://books.google.com/books/content?id=2j-bAgAAQBAJ&amp;printsec=frontcover&amp;img=1&amp;zoom=1&amp;edge=curl&amp;source=gbs_api"
              alt=""
            />
          </div>
          <ReviewTabsCard />
        </div>
        <div className="col-12 col-md-4">
          <BookFeaturesCard />
        </div>
      </div>
    </div>
  );
};
