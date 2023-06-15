import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderNav.scss";
import { ROUTES } from "../resources/routes-constants";

export const HeaderNav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header-navigator">
        <button
          onClick={() => {
            navigate(ROUTES.HOMEPAGE_ROUTE);
          }}
        >
          Home page
        </button>
        <br />
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </header>
  );
};
