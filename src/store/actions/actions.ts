import { SEARCH_FLIGHT, UPDATE_AVAILABILITY } from "../../constants/constants";
import { UpdateAvailabilityAction } from "../../types/allTypes";

export const updateAvailability = (
  flightId: number,
  seatId: number,
  available: boolean
): UpdateAvailabilityAction => ({
  type: UPDATE_AVAILABILITY,
  payload: { flightId, seatId, available },
});

export const searchFlight = (
  from?: string,
  to?: string,
  price?: number,
  duration?: number,
  departureDate?: string
) => {
  return {
    type: SEARCH_FLIGHT,
    payload: {
      from,
      to,
      price,
      duration,
      departureDate,
    },
  };
};
