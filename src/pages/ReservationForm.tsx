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
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

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
            console.log(values);
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
                  <FormControl sx={{ m: 1 }}>
                    <InputLabel id="title-select-label">Title</InputLabel>
                    <Select
                      size="small"
                      value={values.title}
                      labelId="title-select-label"
                      label="Title"
                      onChange={(e: any) => {
                        e.preventDefault();
                        setFieldValue("title", e.target.value);
                      }}
                    >
                      <MenuItem value="Mr">Mr</MenuItem>
                      <MenuItem value="Ms">Ms</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    sx={{ margin: "10px" }}
                    size="small"
                    name="name"
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    value={values.name}
                    onChange={(e: any) => {
                      e.preventDefault();
                      setFieldValue("name", e.target.value);
                    }}
                    error={touched.name}
                    helperText={errors.name}
                  />
                  <TextField
                    sx={{ margin: "10px" }}
                    size="small"
                    name="surname"
                    id="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    value={values.surname}
                    onChange={(e: any) => {
                      e.preventDefault();
                      setFieldValue("surname", e.target.value);
                    }}
                    error={touched.surname}
                    helperText={errors.surname}
                  />
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
                <Box className="reservation-form-fields">
                  <h5>Contact information</h5>
                  <TextField
                    sx={{ margin: "10px" }}
                    type="email"
                    size="small"
                    name="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    error={touched.email}
                    helperText={errors.email}
                    onChange={(e) => {
                      e.preventDefault();
                      setFieldValue("email", e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ margin: "10px" }}
                    type="phone"
                    size="small"
                    name="phone"
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    onChange={(e) => {
                      e.preventDefault();
                      setFieldValue("phone", e.target.value);
                    }}
                  />

                  <TextField
                    sx={{ margin: "10px" }}
                    type="address"
                    size="small"
                    name="address"
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    error={touched.address}
                    helperText={errors.address}
                    onChange={(e) => {
                      e.preventDefault();
                      setFieldValue("address", e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ margin: "10px" }}
                    type="city"
                    size="small"
                    name="city"
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    error={touched.city}
                    helperText={errors.city}
                    onChange={(e) => {
                      e.preventDefault();
                      setFieldValue("city", e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ margin: "10px" }}
                    type="state"
                    size="small"
                    name="state"
                    id="outlined-basic"
                    label="State"
                    variant="outlined"
                    onChange={(e) => {
                      e.preventDefault();
                      setFieldValue("state", e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ margin: "10px" }}
                    type="postal"
                    size="small"
                    name="postal"
                    id="outlined-basic"
                    label="Postal code"
                    variant="outlined"
                    onChange={(e) => {
                      e.preventDefault();
                      setFieldValue("postal", e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ margin: "10px" }}
                    type="country"
                    size="small"
                    name="country"
                    id="outlined-basic"
                    label="Country"
                    variant="outlined"
                    error={touched.country}
                    helperText={errors.country}
                    onChange={(e) => {
                      e.preventDefault();
                      setFieldValue("country", e.target.value);
                    }}
                  />
                </Box>
                <Box className="reservation-form-fields">
                  <h5>Flight information</h5>

                  <TextField
                    aria-readonly
                    sx={{ margin: "10px" }}
                    size="small"
                    name="departure"
                    id="outlined-basic"
                    label="Flight day"
                    variant="outlined"
                    value={moment(values.departure).format("DD MMM YYYY hh:mm")}
                  />
                  <TextField
                    aria-readonly
                    sx={{ margin: "10px" }}
                    size="small"
                    name="seat"
                    id="outlined-basic"
                    label="Seat"
                    variant="outlined"
                    value={values.seat}
                  />
                  <TextField
                    aria-readonly
                    sx={{ margin: "10px" }}
                    size="small"
                    id="outlined-basic"
                    label="Departure city"
                    variant="outlined"
                    name="cityFrom"
                    value={values.cityFrom}
                  />
                  <TextField
                    aria-readonly
                    sx={{ margin: "5px" }}
                    size="small"
                    id="outlined-basic"
                    label="Arrival city"
                    variant="outlined"
                    name="cityTo"
                    value={values.cityTo}
                  />
                </Box>
              </div>

              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ReservationForm;
