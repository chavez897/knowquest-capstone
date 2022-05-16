import React from "react";

export const Announcenment = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#333999" }}>
      <div className="row px-5">
        <div className="col-lg-8">
          <h3 className="text-white py-3">Announcement</h3>
          <div
            className="mb-3 bg-light py-3"
            style={{ overflow: "scroll", height: "20vh" }}
          >
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
            <p>Announcenment \n</p>
          </div>
        </div>
        <div className="col-lg-4" style={{ backgroundColor: "#f93" }}>
          <h3 className="py-3 text-center">KnowQuest Explained</h3>
          <div class="embed-responsive embed-responsive-16by9 justify-content-center d-flex mb-5">
            <iframe
              class="embed-responsive-item"
              src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
