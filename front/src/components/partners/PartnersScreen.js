import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersData } from "../../actions/partners";
import { Breadcrumb } from "../ui/Breadcrumb";
import { Card } from "../ui/Card";
import { PartnersIntro } from "./PartnersIntro";

export const PartnersScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPartnersData());
  }, [dispatch]);

  const partners = useSelector((state) => state.partners);
  
  return (
    <div className="container py-5">
      <Breadcrumb main="Partners" />
      <div className="row py-3">
        <PartnersIntro />
      </div>
      <div className="row py-3">
        {partners.map((partner) => (
          <div key={partner.id} className="col-lg-4 py-2">
            <Card
              src={partner.logo}
              title={partner.name}
              description={partner.description}
              offer={partner.offers}
              initial_date={partner.initialLimitedTime}
              end_date={partner.finalLimitedTime}
              location={partner.locations}
              href="#"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
