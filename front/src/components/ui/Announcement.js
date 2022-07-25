import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncementsData } from "../../actions/announcements";

export const Announcenment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnnouncementsData());
  }, [dispatch]);

  const annoucements = useSelector((state) => state.announcements);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (input) => {
    const parts = input.split("-");
    return months[parseInt(parts[1]) - 1] + " " + parts[2] + ", " + parts[0];
  };

  return (
    <div className="row justify-content-center" style={{ backgroundColor: "#333999" }}>
      <div className="row px-5 w-75">
        <div className="col-lg-8">
          <h3 className="text-white py-3">Announcement</h3>
          <div
            className="bg-light mb-5"
            style={{ overflow: "scroll", height: "30vh" }}
          >
            {annoucements.map((annoucement) => (
              <div key={annoucement.id} className="row mx-2">
                <p className="fw-bold fs-5 text-warning col-12">
                  {formatDate(annoucement.date)}
                </p>
                <p className="col-12 -mt-2">{annoucement.announcements}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4" style={{ backgroundColor: "#f93" }}>
          <div className="row">
            <h3 className="py-3 text-center">KnowQuest Explained</h3>
          </div>
          <div className="row embed-responsive embed-responsive-16by9 justify-content-center d-flex m-0">
            <iframe
              title="VideoDemo"
              className="embed-responsive-item"
              src="https://knowquest.net/images/KnowQuest2020.mp4"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
