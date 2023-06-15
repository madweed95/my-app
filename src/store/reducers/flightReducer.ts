import { UPDATE_AVAILABILITY } from "../../resources/constants";
import { initialState as initVal } from "../initialState";
import { UpdateAvailabilityAction } from "../../types/reducers";

const initialState = initVal;

const flightReducer = (
  state = initialState,
  action: UpdateAvailabilityAction
) => {
  switch (action.type) {
    case UPDATE_AVAILABILITY: {
      const payload = action.payload;
      const { flightId, seatNumber } = payload;
      return state.map((flight) => {
        if (flight.id === flightId) {
          console.log(flight.id === flightId);
          return {
            ...flight,
            seats: flight.seats.map((seat) =>
              seat.number === seatNumber ? { ...seat, available: false } : seat
            ),
          };
        }
        return flight;
      });
    }
    default:
      return state;
  }
};

export default flightReducer;
