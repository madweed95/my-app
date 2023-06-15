import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ROUTES } from "./resources/routes-constants";
import ReservationForm from "./pages/ReservationForm";
import SearchResults from "./pages/SearchResults";
import ConfirmationPage from "./pages/ConfirmationPage";

const RootComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
        <Route path={ROUTES.SEARCH_RESULTS} element={<SearchResults />} />
        <Route path={ROUTES.RESERVATION_FORM} element={<ReservationForm />} />
        <Route path={ROUTES.CONFIRMATION_PAGE} element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default RootComponent;
