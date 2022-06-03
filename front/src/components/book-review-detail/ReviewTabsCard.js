import { useState } from "react";

export const ReviewTabsCard = ({ authors, reviews, category }) => {
  const [activeTab, setActiveTab] = useState("r");
  return (
    <>
      <div className="row px-3">
        {activeTab === "r" ? (
          <div
            type="div"
            className="btn btn-warning col-2 mx-1 text-white"
          >
            Reviews
          </div>
        ) : (
          <div type="div" className="btn btn-light col-2 mx-1 inactivetab" onClick={() => setActiveTab("r")}>
            Reviews
          </div>
        )}
        {activeTab === "d" ? (
          <div
            type="div"
            className="btn btn-warning col-2 mx-1 text-white"
          >
            Description
          </div>
        ) : (
          <div type="div" className="btn btn-light col-2 mx-1 inactivetab" onClick={() => setActiveTab("d")}>
            Description
          </div>
        )}
        {activeTab === "c" ? (
          <div
            type="div"
            className="btn btn-warning col-2 mx-1 text-white"
          >
            Comments
          </div>
        ) : (
          <div type="div" className="btn btn-light col-2 mx-1 inactivetab" onClick={() => setActiveTab("c")}>
            Comments
          </div>
        )}
      </div>
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
};
