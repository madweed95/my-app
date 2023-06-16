import React from "react";
import "./SearchBar.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../resources/routes-constants";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";

export const SearchBars: React.FC<{
  setCityFrom: React.Dispatch<React.SetStateAction<string>>;
  setCityTo: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setCityFrom, setCityTo }) => {
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="From"
        variant="outlined"
        onChange={(e) => {
          e.preventDefault();
          setCityFrom(e.target.value);
        }}
      />

      <TextField
        id="outlined-basic"
        label="To"
        variant="outlined"
        onChange={(e) => {
          e.preventDefault();
          setCityTo(e.target.value);
        }}
      />
    </div>
  );
};

export const SearchButtons: React.FC<{
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters: boolean;
  cityFrom: string;
  cityTo: string;
  filteredPrice: number | number[];
  filteredDuration: number | number[];
  departureDate: string;
}> = ({
  setShowFilters,
  showFilters,
  cityFrom,
  cityTo,
  filteredPrice,
  filteredDuration,
  departureDate,
}) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        variant="contained"
        className="searchbar-btn"
        onClick={() => {
          setShowFilters(!showFilters);
        }}
      >
        Advanced search
      </Button>
      <Button
        variant="contained"
        className="searchbar-btn"
        onClick={() => {
          navigate(ROUTES.SEARCH_RESULTS, {
            state: {
              cityFrom,
              cityTo,
              filteredPrice,
              filteredDuration,
              departureDate,
            },
          });
        }}
      >
        Search
      </Button>
    </Box>
  );
};
