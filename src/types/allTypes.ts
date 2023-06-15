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

export interface Filters {
  cityFrom: string;
  cityTo: string;
  filteredPrice: number;
  filteredDuration: number;
  departureDate: string;
}
