import { useState } from "react";
import { CommentsTab } from "./CommentsTab";
import { DescriptionTab } from "./DescriptionTab";
import { ReviewTab } from "./ReviewsTab";

export const ReviewTabsCard = () => {
  const [activeTab, setActiveTab] = useState("r");
  return (
    <>
      <div className="row px-3 mt-2">
        {activeTab === "r" ? (
          <div
            type="div"
            className="btn btn-warning col-4 col-md-2 mx-md-1 text-white"
          >
            Reviews
          </div>
        ) : (
          <div
            type="div"
            className="btn btn-light col-4 col-md-2 mx-md-1 inactivetab"
            onClick={() => setActiveTab("r")}
          >
            Reviews
          </div>
        )}
        {activeTab === "d" ? (
          <div
            type="div"
            className="btn btn-warning col-4 col-md-2 mx-md-1 text-white"
          >
            Description
          </div>
        ) : (
          <div
            type="div"
            className="btn btn-light col-4 col-md-2 mx-md-1 inactivetab"
            onClick={() => setActiveTab("d")}
          >
            Description
          </div>
        )}
        {activeTab === "c" ? (
          <div
            type="div"
            className="btn btn-warning col-4 col-md-2 mx-md-1 text-white"
          >
            Comments
          </div>
        ) : (
          <div
            type="div"
            className="btn btn-light col-4 col-md-2 mx-md-1 inactivetab"
            onClick={() => setActiveTab("c")}
          >
            Comments
          </div>
        )}
      </div>
      {activeTab === "r" && <ReviewTab />}
      {activeTab === "d" && (
        <DescriptionTab
          title="SQL Cookbook"
          description="A guide to SQL covers such topics as retrieving records, metadata queries, working with strings, data arithmetic, date manipulation, reporting and warehousing, and hierarchical queries."
        />
      )}
      {activeTab === "c" && (
        <CommentsTab
          comments={[
            {
              id: 1,
              comments: "Great Book Modify!!!!!!!!",
            },
            {
              id: 2,
              comments: "Great Book Modify!!!!!!!!",
            },
            {
              id: 3,
              comments: "Great Book Modify!!!!!!!!",
            },
            {
              id: 4,
              comments: "Great Book Modify!!!!!!!!",
            },
            {
              id: 5,
              comments: "Great Book Modify!!!!!!!!",
            },
            {
              id: 6,
              comments: "Great Book Modify!!!!!!!!",
            },
          ]}
        />
      )}
    </>
  );
};
