import React from "react";
import { Breadcrumb } from "../ui/Breadcrumb";

export const ReferralScreen = () => {
  return (
    <div className="container py-5">
      <Breadcrumb main="Profile" link="/user/profile" secondary="Referral" />
      <h2 className="row py-3 justify-content-center">Referral a student/professor</h2>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 card">
          <div className="row py-3">
            <div className="col-lg-10 card py-3 offset-1 bg-light">
              <p>Via Social Media</p>
            </div>
          </div>
          <div className="row py-3">
            <div className="col-lg-10 card py-3 offset-1 bg-light">
              <p>Copy my custom link</p>
            </div>
          </div>
          <div className="row py-3">
            <div className="col-lg-10 card py-3 offset-1 bg-light">
              <p>Via Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
