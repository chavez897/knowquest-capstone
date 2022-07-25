import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../plugins/axios";
import { useSelector } from "react-redux";

export const ResourceFeaturesCard = ({resourceId}) => {

  const resourceDetail = useSelector((state) => state.resourceReviewDetail);

  //state for resources
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    axiosInstance.get(`/resources-ratings/subject/?resource_id=${resourceId}`).then((res) => {
      setSubject(res.data.subject);
    });

    axiosInstance.get(`/resources-ratings/semester/?resource_id=${resourceId}`).then((res) => {
      setSemester(res.data.semester);
    });

    axiosInstance.get(`/resources-ratings/year/?resource_id=${resourceId}`).then((res) => {
      setYear(res.data.year);
    });

  }, []);

  return (
    <div className="card bg-muted text-white">
      <div className="bg-light">
        <div className="row px-5 py-4">
          <div className="col-12 text-dark">
            <div>
              <p className="fw-bold fs-2">Resource Feature </p>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Media Type:</div>
              <div className="col-6 text-end fw-lighter">{resourceDetail.resourceMediaType}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Subject:</div>
              <div className="col-6 text-end fw-lighter">{subject}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Semesmter:</div>
              <div className="col-6 text-end fw-lighter">{semester}</div>
            </div>
            <div className="row my-2">
              <div className="col-6 text-start fw-lighter">Year:</div>
              <div className="col-6 text-end fw-lighter">{year}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
