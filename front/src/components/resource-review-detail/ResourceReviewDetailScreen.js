import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../ui/Breadcrumb";
import { BookDataCard } from "../book-review-detail/BookDataCard";
import { ResourceFeaturesCard } from "./ResourceFeaturesCard";
import { ResourceTabsCard } from "./ResourceTabsCard";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { getResourcesData } from "../../actions/resourceReviewDetail";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../plugins/axios";
import { useHistory } from "react-router-dom";

export const ResourceReviewDetailScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { resourceId = "" } = queryString.parse(location.search);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (resourceId.length <= 0) {
      history.push("/search");
    } else {
      Swal.fire({
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      dispatch(getResourcesData(resourceId)).then(() => {
        Swal.close();
        setLoading(false);
      });
      axiosInstance
        .get(`/resources-ratings/comments/?resource_id=${resourceId}`)
        .then((res) => {
          setComments(res.data);
        });
    }
  }, [resourceId]);

  const resourceDetail = useSelector((state) => state.resourceReviewDetail);

  return (
    <div className="container py-5">
      <Breadcrumb main="Rating Details" />
      {!loading ? (
        <>
          <div className="pb-5 pt-2">
            <p className="fw-bold fs-2">{resourceDetail.resourceTitle} </p>
          </div>
          <div className="row">
            <div className="col-12 col-md-8">
              <BookDataCard
                authors={resourceDetail.resourceTitle}
                reviews={resourceDetail.overallAverage}
                category="Resource"
              />
              <ResourceTabsCard comments={comments} />
            </div>
            <div className="col-12 col-md-4 mt-5 mt-md-0">
              <ResourceFeaturesCard resourceId={resourceId} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
