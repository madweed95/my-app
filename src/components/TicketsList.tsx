import React, { useState } from "react";
import { FlightTicket } from "../types/allTypes";
import { Tickets } from "./Tickets";
import { sortBy, sortTicketsByPrice } from "../utility/functions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="sort-select-label">Sort</InputLabel>
            <Select
              value={selectedOption}
              labelId="sort-select-label"
              label="Sort"
              onChange={(e) => sortBy(e, setSelectedOption)}
            >
              <MenuItem value="from min">From cheapest</MenuItem>
              <MenuItem value="from max">From most expensive</MenuItem>
            </Select>
          </FormControl>
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
