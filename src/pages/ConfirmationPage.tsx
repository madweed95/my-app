import React, { useEffect, useState } from "react";
import { HeaderNav } from "../components/HeaderNav";
import { useLocation } from "react-router-dom";

import { Booking } from "../types/formik";
import moment from "moment";

const ConfirmationPage: React.FC = () => {
  const [booking, setBooking] = useState<Booking>();

  const location = useLocation();
  useEffect(() => {
    if (location.state) setBooking(location.state);
  }, [location.state]);

  if (!booking) return <form action="text"></form>;

  return (
    <>
      <HeaderNav />
      <h2>
        {" "}
        Thank you for reservation{" "}
        {`${
          booking.title
            ? booking.title + " " + booking.surname
            : booking.name + " " + booking.surname
        }`}
      </h2>
      <div>Passenger : {booking.name + " " + booking.surname}</div>
      <div>
        Ticket information : departure at{" "}
        {moment(booking.departure).format("DD MMM YYYY hh:mm")} from{" "}
        {booking.cityFrom}
      </div>
    </>
  );
};

export default ConfirmationPage;
