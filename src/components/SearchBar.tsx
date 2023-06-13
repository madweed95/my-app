import React from "react";
import "./SearchBar.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../resources/routes-constants";
import { searchFlight } from "../store/actions/actions";

export const SearchBars: React.FC<{
  setCityFrom: React.Dispatch<React.SetStateAction<string>>;
  setCityTo: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setCityFrom, setCityTo }) => {
  return (
    <div>
      From
      <input
        onChange={(e) => {
          e.preventDefault();
          setCityFrom(e.target.value);
        }}
      ></input>
      To
      <input
        onChange={(e) => {
          e.preventDefault();
          setCityTo(e.target.value);
        }}
      ></input>
    </div>
  );
};

export const SearchButtons: React.FC<{
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters: boolean;
  cityFrom: string;
  cityTo: string;
  filteredPrice: number;
  filteredDuration: number;
}> = ({
  setShowFilters,
  showFilters,
  cityFrom,
  cityTo,
  filteredPrice,
  filteredDuration,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <button
        className="searchbar-btn"
        onClick={() => {
          setShowFilters(!showFilters);
        }}
      >
        Advanced search
      </button>
      <button
        className="searchbar-btn"
        onClick={() => {
          dispatch(
            searchFlight(
              cityFrom,
              cityTo,
              filteredPrice > 0 ? filteredPrice : undefined,
              filteredDuration > 0 ? filteredDuration : undefined
            )
          );
          navigate(ROUTES.TICKETS_AVAILABLE);
        }}
      >
        Search
      </button>
    </>
  );
};
