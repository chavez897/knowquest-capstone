import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContestsData } from "../../actions/contests";

export const ReferralScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContestsData());
  }, [dispatch]);

  const contests = useSelector((state) => state.contests);

  return (
    <div className="container py-3">
      <h2 className="row py-3">Referral a student/professor</h2>
      <div className="row py-3">
        <div className="col-lg-6 card py-3 offset-1 bg-light"><p>Via Social Media</p></div>
      </div>
      <div className="row py-3">
        <div className="col-lg-6 card py-3 offset-1 bg-light"><p>Copy my custom link</p></div>
      </div>
      <div className="row py-3">
        <div className="col-lg-6 card py-3 offset-1 bg-light"><p>Via Email</p></div>
      </div>
    </div>
  );
};
