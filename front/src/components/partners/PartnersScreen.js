import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersData } from "../../actions/partners";

export const PartnersScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPartnersData());
  }, [dispatch]);

  const partners = useSelector((state) => state.partners);

  return (
    <div className="container-fluid">
      {partners.map((partner) => (
        <div key={partner.id} className="col-lg-4 py-2">
         {partner.name}
        </div>
      ))}
    </div>
  );
};
