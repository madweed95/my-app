import React, { useEffect, useState } from "react";
import { FlightTicket } from "../types/allTypes";
import { RootState, useAppSelector } from "../store/store";
import moment from "moment";
import { Slider } from "@mui/material";

export const Filters: React.FC<{
  highestPrice: number;
  setHighestPrice: React.Dispatch<React.SetStateAction<number>>;
  lowestPrice: number;
  setLowestPrice: React.Dispatch<React.SetStateAction<number>>;
  filteredPrice: number | number[];
  setFilteredPrice: React.Dispatch<React.SetStateAction<number | number[]>>;
  shortestFlight: number;
  setShortestFlight: React.Dispatch<React.SetStateAction<number>>;
  longestFlight: number;
  setLongestFlight: React.Dispatch<React.SetStateAction<number>>;
  filteredDuration: number | number[];
  setFilteredDuration: React.Dispatch<React.SetStateAction<number | number[]>>;
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

  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    setFilteredDuration(newValue);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilteredPrice(newValue);
  };
  return (
    <div>
      <ul>
        <li>
          {`${filteredPrice} €`}
          <Slider
            value={typeof filteredPrice === "number" ? filteredPrice : 0}
            onChange={handlePriceChange}
            aria-labelledby="input-slider"
            min={lowestPrice}
            max={highestPrice}
          />
        </li>
        <li>
          {`${filteredDuration} hours`}
          <Slider
            value={typeof filteredDuration === "number" ? filteredDuration : 0}
            onChange={handleDurationChange}
            aria-labelledby="input-slider"
            min={shortestFlight}
            max={longestFlight}
          />
        </li>
        <li>
          {`Departure on ${
            departureDate.length
              ? moment(departureDate).format("DD MMM YYYY")
              : ""
          }`}
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
