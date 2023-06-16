import axios from "axios";
import { useQuery } from "react-query";
import { FlightTicket } from "../types/allTypes";
import { useEffect, useState } from "react";

const useGetTickets = () => {
  const [allTickets, setAllTickets] = useState<FlightTicket[]>([]);

  const { data, isLoading } = useQuery(
    ["get_all_tickets"],
    () => {
      return axios.get<FlightTicket[]>(`http://localhost:3000/allTickets`);
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
