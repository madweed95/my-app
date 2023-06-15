import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { FlightTicket } from "../types/allTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import "./ReservationForm.scss";
import moment from "moment";
import { HeaderNav } from "../components/HeaderNav";
import { updateAvailability } from "../store/actions/actions";
import { useAppDispatch } from "../store/store";
import { ROUTES } from "../resources/routes-constants";
const ReservationForm: React.FC = () => {
  const [chosenTicket, setChosenTicket] = useState<FlightTicket>();
  const [chosenSeat, setChosenSeat] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setChosenTicket(location.state?.chosenTicket);
    setChosenSeat(location.state?.chosenSeat);
  }, [location.state]);

  const validationSchema = Yup.object().shape({
    title: Yup.string(),
    name: Yup.string().required("First name is required"),
    surname: Yup.string().required("Last name is required"),
    bday: Yup.string().required("Date of birth is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string(),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string(),
    postal: Yup.string(),
    country: Yup.string().required("Country is required"),
    departure: Yup.string().required("Flight day is required"),
    cityFrom: Yup.string().required("Departure city is required"),
    cityTo: Yup.string().required("Arrival city is required"),
    seat: Yup.string().required("Seat is required"),
  });
  const initialValues = {
    title: "",
    name: "",
    surname: "",
    bday: "",
    month: "",
    year: "",
    email: "",
    phone: "+",
    address: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    departure: chosenTicket?.departure ? chosenTicket.departure : "",
    cityFrom: chosenTicket?.from ? chosenTicket.from : "",
    cityTo: chosenTicket?.to,
    seat: chosenSeat ? chosenSeat : "",
  };

  if (!chosenTicket || !chosenSeat) {
    return null;
  }

  return (
    <>
      <HeaderNav />
      <div className="reservation-form-box">
        <h1>Reservation Form</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            dispatch(updateAvailability(chosenTicket.id, chosenSeat));
            navigate(ROUTES.CONFIRMATION_PAGE, { state: values });
          }}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <div className="reservation-form-fields-box">
                <div className="reservation-form-fields">
                  <h5>Passenger information</h5>
                  <div>Title</div>
                  <select
                    value={values.title}
                    onChange={(e: any) => {
                      e.preventDefault();
                      setFieldValue("title", e.target.value);
                    }}
                  >
                    <option value=""></option>
                    <option value="mr">Mr</option>
                    <option value="ms">Ms</option>
                  </select>
                  <div>First name</div>
                  <Field
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={(e: any) => {
                      e.preventDefault();
                      setFieldValue("name", e.target.value);
                    }}
                  />
                  {errors.name && touched.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                  <div>Last name</div>
                  <Field
                    name="surname"
                    type="text"
                    value={values.surname}
                    onChange={(e: any) => {
                      e.preventDefault();
                      setFieldValue("surname", e.target.value);
                    }}
                  />{" "}
                  {errors.surname && touched.surname && (
                    <div className="error-message">{errors.surname}</div>
                  )}
                </div>
                <div className="reservation-form-fields">
                  <h5>Date of birth</h5>
                  <Field
                    name="bday"
                    type="date"
                    onChange={(e: any) => {
                      e.preventDefault();
                      setFieldValue("bday", e.target.value);
                    }}
                  />
                  {errors.bday && touched.bday && (
                    <div className="error-message">{errors.bday}</div>
                  )}
                </div>
                <div className="reservation-form-fields">
                  <h5>Contact information</h5>
                  <div>Email</div>
                  <Field name="email" type="email" />
                  {errors.email && touched.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                  <div>Phone number</div>
                  <Field name="phone" type="phone" />

                  <div>Address</div>
                  <Field name="address" type="address" />
                  {errors.address && touched.address && (
                    <div className="error-message">{errors.address}</div>
                  )}
                  <div>City</div>
                  <Field name="city" type="text" />
                  {errors.city && touched.city && (
                    <div className="error-message">{errors.city}</div>
                  )}
                  <div>State</div>
                  <Field name="state" type="text" />
                  <div>Postal code</div>
                  <Field name="postal" type="text" />
                  <div>Country</div>
                  <Field name="country" type="text" />
                  {errors.country && touched.country && (
                    <div className="error-message">{errors.country}</div>
                  )}
                </div>
                <div className="reservation-form-fields">
                  <h5>Flight information</h5>
                  <div>Flight day</div>
                  <Field
                    name="departure"
                    readOnly
                    value={moment(values.departure).format("DD MMM YYYY hh:mm")}
                  />
                  <div>Seat</div>
                  <Field name="seat" readOnly value={values.seat} />
                  <div>Departure city</div>
                  <Field name="cityFrom" readOnly value={values.cityFrom} />
                  <div>Arrival city</div>
                  <Field name="cityTo" readOnly value={values.cityTo} />
                </div>
              </div>

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ReservationForm;
