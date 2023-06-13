import { combineReducers } from "@reduxjs/toolkit";
import { FlightTicket, SearchFlight } from "../../types/allTypes";
import { SEARCH_FLIGHT } from "../../constants/constants";
import { initialState as initVal } from "../initialState";

const initialState: FlightTicket[] = [];

const searchReducer = (
  state = initialState,
  action: SearchFlight
): FlightTicket[] => {
  switch (action.type) {
    case SEARCH_FLIGHT: {
      const { from, to, price, duration, departureDate } = action.payload;

      const searchResults = initVal.filter((flight) => {
        // const isMatchingFrom =
        //   from === undefined ||
        //   flight.from.toLowerCase() === from.toLowerCase();

        // const isMatchingTo =
        //   to === undefined || flight.to.toLowerCase() === to.toLowerCase();

        const isMatchingPrice = price === undefined || flight.price <= price;

        // const convertedDuration = parseInt(flight.duration, 10);
        // const isMatchingDuration =
        //   duration === undefined || convertedDuration === duration;

        // const isMatchingDepartureDate =
        //   departureDate === undefined || flight.departure === departureDate;

        return (
          // isMatchingFrom &&
          // isMatchingTo &&
          isMatchingPrice
          //  &&
          // isMatchingDuration &&
          // isMatchingDepartureDate
        );
      });

      return searchResults;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchReducer,
});

export default rootReducer;
