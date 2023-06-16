import axios from "axios";
import { useQuery } from "react-query";
import { Filters, FlightTicket } from "../types/allTypes";
import { useEffect, useState } from "react";

const useGetTickets = (filter: Filters) => {
  const [allTickets, setAllTickets] = useState<FlightTicket[]>([]);

  const { data, isLoading } = useQuery(
    ["get_all_tickets"],
    () => {
      return axios.get<FlightTicket[]>(
        `http://localhost:3000/allTickets?${
          filter?.cityFrom ? "from=" + filter.cityFrom : ""
        }${filter?.cityTo ? "&to=" + filter.cityTo : ""}`
      );
    },
    {
      select: (response) => response.data,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) setAllTickets(data);
  }, [data]);

  return { allTickets, isLoading };
};

export default useGetTickets;
