import { useEffect, useState } from "react";
import moment from "moment";
import { Filters, FlightTicket } from "../types/allTypes";

const useFilterTickets = (
  allTickets: FlightTicket[],
  filters: Filters | undefined
) => {
  const [filteredData, setFilteredData] = useState<FlightTicket[]>([]);

  useEffect(() => {
    const applyFilters = () => {
      let filteredResults = allTickets;

      if (filters?.cityFrom) {
        filteredResults = filteredResults.filter((flight) =>
          flight.from.toLowerCase().includes(filters.cityFrom.toLowerCase())
        );
      }

      if (filters?.cityTo) {
        filteredResults = filteredResults.filter((flight) =>
          flight.to.toLowerCase().includes(filters.cityTo.toLowerCase())
        );
      }

      if (filters?.filteredPrice) {
        filteredResults = filteredResults.filter(
          (flight) => flight.price <= filters?.filteredPrice
        );
      }

      if (filters?.filteredDuration) {
        filteredResults = filteredResults.filter(
          (flight) => parseInt(flight.duration, 10) <= filters?.filteredDuration
        );
      }

      if (filters?.departureDate.length) {
        filteredResults = filteredResults.filter((flight) =>
          moment(flight.departure).isSame(moment(filters?.departureDate), "day")
        );
      }

      setFilteredData(filteredResults);
    };

    applyFilters();
  }, [
    allTickets,
    filters?.cityFrom,
    filters?.cityTo,
    filters?.filteredPrice,
    filters?.filteredDuration,
    filters?.departureDate,
  ]);

  return filteredData;
};

export default useFilterTickets;
