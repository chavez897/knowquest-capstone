import { useState } from "react";
import { CommentsTab } from "../book-review-detail/CommentsTab";
import { ResourceDescriptionTab } from "./ResourceDescriptionTab";
import { ResourceReviewTab } from "./ResourceReviewTab";

export const ResourceTabsCard = ({ comments = [] }) => {
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
      {activeTab === "r" && <ResourceReviewTab />}
      {activeTab === "d" && <ResourceDescriptionTab />}
      {activeTab === "c" && <CommentsTab comments={comments} />}
    </>
  );
};
