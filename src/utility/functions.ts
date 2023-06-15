import { FlightTicket } from "../types/allTypes";

export const allSeatsBusy = (ticket: FlightTicket) => {
  return ticket.seats.every((seat) => seat.available === false);
};

export const sortTicketsByPrice = (
  tickets: FlightTicket[],
  sortOption: "from min" | "from max" | ""
): FlightTicket[] => {
  const sortedTickets = [...tickets];

  if (sortOption !== "")
    sortedTickets.sort((a, b) => {
      if (sortOption === "from min") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  return sortedTickets;
};

export const sortBy = (
  event: any,
  setSelectedOption: React.Dispatch<
    React.SetStateAction<"" | "from min" | "from max">
  >
) => {
  const option = event.target.value as "from min" | "from max" | "";
  setSelectedOption(option);
};
