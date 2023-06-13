import { combineReducers } from "@reduxjs/toolkit";
import { UpdateAvailabilityAction } from "../../types/allTypes";
import { UPDATE_AVAILABILITY } from "../../constants/constants";
import { initialState as initVal } from "../initialState";

const initialState = initVal;

const flightReducer = (
  state = initialState,
  action: UpdateAvailabilityAction
) => {
  switch (action.type) {
    case UPDATE_AVAILABILITY: {
      const payload = action.payload;
      const { flightId, seatId, available } = payload;
      return {
        flights: state.map((flight) => {
          if (flight.id === flightId) {
            return {
              ...flight,
              seats: flight.seats.map((seat) =>
                seat.id === seatId ? { ...seat, available } : seat
              ),
            };
          }
          return flight;
        }),
      };
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  flightReducer,
});

export default rootReducer;
