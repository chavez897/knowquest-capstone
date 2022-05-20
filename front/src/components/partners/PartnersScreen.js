import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersData } from "../../actions/partners";
import { Card } from "../ui/Card";

export const PartnersScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPartnersData());
  }, [dispatch]);

  const partners = useSelector((state) => state.partners);

  return (
    <div className="container-fluid">
      <div className="row py-3">
        {partners.map((partner) => (
          <div key={partner.id} className="col-lg-4 py-2">
            <Card
              src={partner.logo}
              title={partner.name}
              description={partner.description}
              offer={partner.offers}
              initial_date={partner.initial_limited_time}
              final_date={partner.final_limited_time}
              location={partner.locations}
              href="#"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
