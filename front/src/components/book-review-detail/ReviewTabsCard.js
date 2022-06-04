import { useState } from "react";
import { ReviewTab } from "./ReviewsTab";

export const ReviewTabsCard = () => {
  const [activeTab, setActiveTab] = useState("r");
  return (
    <>
      <div className="row px-3">
        {activeTab === "r" ? (
          <div type="div" className="btn btn-warning col-2 mx-1 text-white">
            Reviews
          </div>
        ) : (
          <div
            type="div"
            className="btn btn-light col-2 mx-1 inactivetab"
            onClick={() => setActiveTab("r")}
          >
            Reviews
          </div>
        )}
        {activeTab === "d" ? (
          <div type="div" className="btn btn-warning col-2 mx-1 text-white">
            Description
          </div>
        ) : (
          <div
            type="div"
            className="btn btn-light col-2 mx-1 inactivetab"
            onClick={() => setActiveTab("d")}
          >
            Description
          </div>
        )}
        {activeTab === "c" ? (
          <div type="div" className="btn btn-warning col-2 mx-1 text-white">
            Comments
          </div>
        ) : (
          <div
            type="div"
            className="btn btn-light col-2 mx-1 inactivetab"
            onClick={() => setActiveTab("c")}
          >
            Comments
          </div>
        )}
      </div>
      <ReviewTab />
    </>
  );
};
