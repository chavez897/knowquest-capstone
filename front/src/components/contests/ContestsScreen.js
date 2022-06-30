import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContestsData } from "../../actions/contests";
import { Breadcrumb } from "../ui/Breadcrumb";
import { Card } from "../ui/Card";
import { ContestIntro } from "./ContestsIntro";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const ContestsScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContestsData());
  }, [dispatch]);

  const contests = useSelector((state) => state.contests);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container py-5">
      <Breadcrumb main="Contests" />
      <div className="row py-3">
        <ContestIntro />
      </div>
      <Carousel responsive={responsive} showDots={true} className="py-5">
        {contests.map((contest) => (
          <div key={contest.id} className="px-2">
            <Card
              src={contest.logo}
              title={contest.name}
              description={contest.description}
              href="#"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
