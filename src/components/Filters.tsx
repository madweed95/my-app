import React, { useEffect, useState } from "react";
import { FlightTicket } from "../types/allTypes";
import { RootState, useAppSelector } from "../store/store";
import moment from "moment";

export const Filters: React.FC<{
  highestPrice: number;
  setHighestPrice: React.Dispatch<React.SetStateAction<number>>;
  lowestPrice: number;
  setLowestPrice: React.Dispatch<React.SetStateAction<number>>;
  filteredPrice: number;
  setFilteredPrice: React.Dispatch<React.SetStateAction<number>>;
  shortestFlight: number;
  setShortestFlight: React.Dispatch<React.SetStateAction<number>>;
  longestFlight: number;
  setLongestFlight: React.Dispatch<React.SetStateAction<number>>;
  filteredDuration: number;
  setFilteredDuration: React.Dispatch<React.SetStateAction<number>>;
  departureDate: string;
  setDepartureDate: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  highestPrice,
  setHighestPrice,
  lowestPrice,
  setLowestPrice,
  filteredPrice,
  setFilteredPrice,
  shortestFlight,
  setShortestFlight,
  longestFlight,
  setLongestFlight,
  filteredDuration,
  setFilteredDuration,
  departureDate,
  setDepartureDate,
}) => {
  const [data, setData] = useState<FlightTicket[]>([]);
  const searchResults = useAppSelector((state: RootState) => state.dataFlights);

  useEffect(() => {
    setData(searchResults);
  }, [searchResults]);

  useEffect(() => {
    const maxPrice = data.reduce((max, obj) => {
      return obj.price > max ? obj.price : max;
    }, -Infinity);
    setHighestPrice(maxPrice);

    const minPrice = data.reduce((min, obj) => {
      return obj.price < min ? obj.price : min;
    }, Infinity);
    setLowestPrice(minPrice);

    const maxDuration = data.reduce((max, obj) => {
      const durationValue = parseInt(obj.duration, 10);
      return durationValue > max ? durationValue : max;
    }, -Infinity);
    setLongestFlight(maxDuration);

    const minDuration = data.reduce((min, obj) => {
      const durationValue = parseInt(obj.duration, 10);
      return durationValue < min ? durationValue : min;
    }, Infinity);
    setShortestFlight(minDuration);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(event.target.value, 10);
    setFilteredDuration(newDuration);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(event.target.value, 10);
    setFilteredPrice(newPrice);
  };

  return (
    <div>
      <ul>
        <li>
          {`${filteredPrice} €`}
          <input
            type="range"
            min={lowestPrice}
            max={highestPrice}
            name="Price"
            value={filteredPrice}
            onChange={handlePriceChange}
          />
        </li>
        <li>
          {`${filteredDuration} hours`}
          <input
            type="range"
            min={shortestFlight}
            max={longestFlight}
            name="Duration"
            value={filteredDuration}
            onChange={handleDurationChange}
          />
        </li>
        <li>
          {`Departure on ${moment(departureDate).format("DD MMM YYYY")}`}
          <input
            type="date"
            name="Duration"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDepartureDate(moment(e.target.value).toISOString())
            }
          />
        </li>
      </ul>
    </div>
  );
};
