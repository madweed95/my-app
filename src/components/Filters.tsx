import React, { useEffect } from "react";
import { initialState } from "../store/initialState";

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
}) => {
  useEffect(() => {
    const maxPrice = initialState.reduce((max, obj) => {
      return obj.price > max ? obj.price : max;
    }, -Infinity);
    setHighestPrice(maxPrice);

    const minPrice = initialState.reduce((min, obj) => {
      return obj.price < min ? obj.price : min;
    }, Infinity);
    setLowestPrice(minPrice);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const maxDuration = initialState.reduce((max, obj) => {
      const durationValue = parseInt(obj.duration, 10);
      return durationValue > max ? durationValue : max;
    }, -Infinity);
    setLongestFlight(maxDuration);

    const minDuration = initialState.reduce((min, obj) => {
      const durationValue = parseInt(obj.duration, 10);
      return durationValue < min ? durationValue : min;
    }, Infinity);
    setShortestFlight(minDuration);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </ul>
    </div>
  );
};
