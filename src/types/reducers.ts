import { UPDATE_AVAILABILITY } from "../resources/constants";

export interface UpdateAvailabilityAction {
  type: typeof UPDATE_AVAILABILITY;
  payload: {
    flightId: number;
    seatNumber: string;
  };
}
