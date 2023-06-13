import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ROUTES } from "./resources/routes-constants";
import AvailableTickets from "./pages/AvailableTickets";

const RootComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
        <Route path={ROUTES.TICKETS_AVAILABLE} element={<AvailableTickets />} />
      </Routes>
    </Router>
  );
};

export default RootComponent;
