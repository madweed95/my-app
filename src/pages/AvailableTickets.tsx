import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { FlightTicket } from "../types/allTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { SearchResults } from "../components/SearchResults";

const AvailableTickets: React.FC = () => {
  const [foundTickets, setFoundTickets] = useState<FlightTicket[]>([]);

  const navigate = useNavigate();
  const searchResults = useSelector(
    (state: RootState) => state.dataSearch.searchReducer
  );

  useEffect(() => {
    if (searchResults) setFoundTickets(searchResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults]);

  return (
    <div className="homepage-body">
      <header>
        <button
          onClick={() => {
            navigate(-1);
            setFoundTickets([]);
          }}
        >
          Home page
        </button>
      </header>
      <SearchResults
        foundTickets={foundTickets}
        setFoundTickets={setFoundTickets}
      />
    </div>
  );
};

export default AvailableTickets;
