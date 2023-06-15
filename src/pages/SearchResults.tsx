import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { Filters } from "../types/allTypes";
import { RootState, useAppSelector } from "../store/store";
import { TicketsList } from "../components/TicketsList";
import { HeaderNav } from "../components/HeaderNav";
import { useLocation } from "react-router-dom";
import useFilterTickets from "../hooks/useFilterTickets";

const SearchResults: React.FC = () => {
  const [filters, setFilters] = useState<Filters | undefined>();

  const location = useLocation();

  const searchResults = useAppSelector((state: RootState) => state.dataFlights);

  useEffect(() => {
    if (location.state) setFilters(location.state);
  }, [location.state]);

  const filteredTickets = useFilterTickets(searchResults, filters);

  if (!filters) return null;

  return (
    <div>
      <HeaderNav />
      <TicketsList filteredTickets={filteredTickets} />
    </div>
  );
};

export default SearchResults;
