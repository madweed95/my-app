import { UPDATE_AVAILABILITY } from "../../resources/constants";

export const updateAvailability = (flightId: number, seatNumber: string) => ({
  type: UPDATE_AVAILABILITY,
  payload: { flightId, seatNumber },
});
