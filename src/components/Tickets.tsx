import React, { useState } from "react";
import { FlightTicket } from "../types/allTypes";
import "./Tickets.scss";
import moment from "moment";
import { allSeatsBusy } from "../utility/functions";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../resources/routes-constants";

const initialValues = {
  selectedSeat: "",
};

const validationSchema = Yup.object({
  selectedSeat: Yup.string().required("Please select a seat"),
});

export const Tickets: React.FC<{ ticket: FlightTicket }> = ({ ticket }) => {
  const [chosenTicket, setChosenTicket] = useState<FlightTicket>();
  const [chosenSeat, setChosenSeat] = useState<string>("");
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {
        chosenTicket &&
          navigate(`${ROUTES.RESERVATION_FORM}${ticket.id}`, {
            state: { chosenSeat, chosenTicket },
          });
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <div className="ticket-button-container">
            <div className="ticket-container">
              <div className="ticket-id">{ticket.id}</div>
              <div className="ticket-price">{`${ticket.price}€`}</div>
              <div className="ticket-container-price-and-seats">
                <div>
                  <div>{`From ${ticket.from}`}</div>
                  <div>
                    {moment(ticket.departure).format("DD MMM YYYY hh:mm")}
                  </div>
                  <br />
                  <div>{`To ${ticket.to}`}</div>
                  <div>
                    {moment(ticket.arrival).format("DD MMM YYYY hh:mm")}
                  </div>
                  <br />
                  <div>Duration is {ticket.duration}</div>
                </div>
                <div className="ticket-container-seats">
                  <div>Seats</div>
                  <ul>
                    {ticket.seats.map((seat) => {
                      return (
                        <li key={seat.id}>
                          {seat.number}
                          <label>
                            <Field
                              type="radio"
                              name="selectedSeat"
                              value={seat.number}
                              disabled={!seat.available}
                              checked={values.selectedSeat === seat.number}
                              onChange={() => {
                                setFieldValue("selectedSeat", seat.number);
                                setChosenTicket(ticket);
                                setChosenSeat(seat.number);
                              }}
                            />
                            {seat.available ? "Available" : "Not Available"}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  {errors.selectedSeat && touched.selectedSeat && (
                    <div className="error-message">{errors.selectedSeat}</div>
                  )}
                </div>
              </div>
            </div>
            <button
              disabled={allSeatsBusy(ticket)}
              className="ticket-book-button"
              type="submit"
            >
              {allSeatsBusy(ticket) ? "Sold out" : "Book your flight"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
