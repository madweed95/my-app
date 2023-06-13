import { FlightTicket } from "../types/allTypes";

/**
 * This function can be used anywhere in the app to greet the user
 * @param userName The user's first name
 * @returns A kind greeting message
 */
export const sayHello = (userName: string): string => {
  return "Welcome " + userName + "!";
};

export const sortTicketsByPrice = (
  tickets: FlightTicket[],
  value: "from min" | "from max" | undefined
) => {
  let sortedTickets: FlightTicket[] = [];
  if (!value) return;
  if (value === "from min")
    sortedTickets = tickets.sort((a, b) => a.price - b.price);
  else sortedTickets = tickets.sort((a, b) => b.price - a.price);
  return sortedTickets;
};

export const allSeatsBusy = (ticket: FlightTicket) => {
  return ticket.seats.every((seat) => seat.available === false);
};
