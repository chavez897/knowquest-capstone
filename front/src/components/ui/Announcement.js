import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncementsData } from "../../actions/announcements";

export const Announcenment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnnouncementsData());
    console.log(annoucements);
  }, [dispatch]);

  const annoucements = useSelector((state) => state.announcements);
  // console.log(annoucements);

  return (
    <div className="row" style={{ backgroundColor: "#333999" }}>
      <div className="row px-5">
        <div className="col-lg-8">
          <h3 className="text-white py-3">Announcement</h3>
          <div
            className="bg-light mb-5"
            style={{ overflow: "scroll", height: "30vh" }}
          >
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
          </div>
        </div>
        <div className="col-lg-4" style={{ backgroundColor: "#f93" }}>
          <div className="row"><h3 className="py-3 text-center">KnowQuest Explained</h3></div>
          <div className="row embed-responsive embed-responsive-16by9 justify-content-center d-flex">
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
