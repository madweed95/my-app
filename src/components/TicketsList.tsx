import React, { useState } from "react";
import { FlightTicket } from "../types/allTypes";
import { Tickets } from "./Tickets";
import { sortBy, sortTicketsByPrice } from "../utility/functions";

export const TicketsList: React.FC<{
  filteredTickets: FlightTicket[];
}> = ({ filteredTickets }) => {
  const [selectedOption, setSelectedOption] = useState<
    "from min" | "from max" | ""
  >("");

  let sortedTickets = filteredTickets;

  if (selectedOption) {
    sortedTickets = sortTicketsByPrice(filteredTickets, selectedOption);
  }
  return (
    <div>
      {sortedTickets.length ? (
        <>
          <h2>Please choose the available flight</h2>
          <select
            value={selectedOption}
            onChange={(e) => sortBy(e, setSelectedOption)}
          >
            <option value="">Sort by</option>
            <option value="from min">From cheapest</option>
            <option value="from max">From most expensive</option>
          </select>
          {sortedTickets.map((ticket) => (
            <div key={ticket.id}>
              <Tickets ticket={ticket} />
              <br />
            </div>
          ))}
        </>
      ) : (
        <h3>
          Sorry, we could not find any available flight tickets for your search
          criteria. Please try again with different destinations.
        </h3>
      )}
    </div>
  );
};
