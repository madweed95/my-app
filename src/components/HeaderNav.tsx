import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderNav.scss";
import { ROUTES } from "../resources/routes-constants";
import { Button } from "@mui/material";

export const HeaderNav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header-navigator">
        <Button
          variant="contained"
          onClick={() => {
            navigate(ROUTES.HOMEPAGE_ROUTE);
          }}
        >
          Home page
        </Button>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </header>
  );
};
