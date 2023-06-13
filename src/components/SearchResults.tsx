import React, { useState } from "react";
import { FlightTicket } from "../types/allTypes";
import { Tickets } from "./Tickets";
import { sortTicketsByPrice } from "../utility/functions";

export const SearchResults: React.FC<{
  setFoundTickets: React.Dispatch<React.SetStateAction<FlightTicket[]>>;
  foundTickets: FlightTicket[];
}> = ({ foundTickets, setFoundTickets }) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setSelectedOption(option);

    // Sort the tickets only if an option is selected
    if (option) {
      const sortedTickets = sortTicketsByPrice(
        foundTickets,
        option as "from min" | "from max"
      );
      // Update the state with sorted tickets
      setFoundTickets(sortedTickets as FlightTicket[]);
    }
  };

  return (
    <div>
      {foundTickets.length ? (
        <>
          <h2>Please choose the available flight</h2>

          <select value={selectedOption} onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="from min">From cheapest</option>
            <option value="from max">From most expensive</option>
          </select>
          {foundTickets.map((ticket) => (
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
