import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContestsData } from "../../actions/contests";
import { Card } from "../ui/Card";

export const ContestsScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContestsData());
  }, [dispatch]);

  const contests = useSelector((state) => state.contests);

  return (
    <div className="container-fluid">
      <div className="row py-3">
        {contests.map((contest) => (
          <div key={contest.id} className="col-lg-4 py-2">
            <Card
              src={contest.logo}
              title={contest.name}
              description={contest.description}
              offer={contest.offers}
              initial_date={contest.initial_limited_time}
              final_date={contest.final_limited_time}
              location={contest.locations}
              href="#"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
