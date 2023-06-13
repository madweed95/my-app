import React from "react";
import { FlightTicket } from "../types/allTypes";
import "./Tickets.scss";
import moment from "moment";
import { allSeatsBusy } from "../utility/functions";

export const Tickets: React.FC<{ ticket: FlightTicket }> = ({ ticket }) => {
  return (
    <div className="ticket-button-container">
      <div className="ticket-container">
        <div className="ticket-id">{ticket.id}</div>
        <div className="ticket-price">{ticket.price + "€"}</div>
        <div className="ticket-container-price-and-seats">
          <div>
            <div>{"From " + ticket.from}</div>
            <div>{moment(ticket.departure).format("DD MMM YYYY hh-mm")}</div>
            <br />
            <div>{"To " + ticket.to}</div>
            <div>{moment(ticket.arrival).format("DD MMM YYYY hh-mm")}</div>
          </div>
          <div className="ticket-container-seats">
            <div>Seats</div>
            <ul>
              {ticket.seats.map((seat) => {
                return (
                  <li key={seat.id}>
                    {seat.number}
                    <input type="radio" disabled={!seat.available} />
                    {seat.available ? "available" : "n/a"}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <button disabled={allSeatsBusy(ticket)} className="ticket-book-button">
        {allSeatsBusy(ticket) ? "Sold out" : "Book your flight"}
      </button>
    </div>
  );
};
