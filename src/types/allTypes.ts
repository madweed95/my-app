import { SEARCH_FLIGHT, UPDATE_AVAILABILITY } from "../constants/constants";

interface Seat {
  id: number;
  number: string;
  available: boolean;
}

export interface FlightTicket {
  id: number;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  seats: Seat[];
}

export interface UpdateAvailabilityAction {
  type: typeof UPDATE_AVAILABILITY;
  payload: {
    flightId: number;
    seatId: number;
    available: boolean;
  };
}
export interface SearchFlight {
  type: typeof SEARCH_FLIGHT;
  payload: {
    from?: string;
    to?: string;
    price?: number;
    duration?: number;
    departureDate?: string;
  };
}
