import React, { useState } from "react";
import { SearchBars, SearchButtons } from "../components/SearchBar";
import "./HomePage.scss";
import { Filters } from "../components/Filters";

const HomePage: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [cityFrom, setCityFrom] = useState<string>("");
  const [cityTo, setCityTo] = useState<string>("");
  const [highestPrice, setHighestPrice] = useState<number>(0);
  const [lowestPrice, setLowestPrice] = useState<number>(0);
  const [filteredPrice, setFilteredPrice] = useState<number>(0);
  const [shortestFlight, setShortestFlight] = useState<number>(0);
  const [longestFlight, setLongestFlight] = useState<number>(0);
  const [filteredDuration, setFilteredDuration] = useState<number>(0);

  return (
    <div className="homepage-body">
      <h1>Find your flight now!</h1>
      <div className="homepage-box-search">
        <SearchBars setCityFrom={setCityFrom} setCityTo={setCityTo} />
        <SearchButtons
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          cityFrom={cityFrom}
          cityTo={cityTo}
          filteredPrice={filteredPrice}
          filteredDuration={filteredDuration}
        />
      </div>
      {showFilters && (
        <Filters
          highestPrice={highestPrice}
          setHighestPrice={setHighestPrice}
          lowestPrice={lowestPrice}
          setLowestPrice={setLowestPrice}
          filteredPrice={filteredPrice}
          setFilteredPrice={setFilteredPrice}
          shortestFlight={shortestFlight}
          setShortestFlight={setShortestFlight}
          longestFlight={longestFlight}
          setLongestFlight={setLongestFlight}
          filteredDuration={filteredDuration}
          setFilteredDuration={setFilteredDuration}
        />
      )}
    </div>
  );
};

export default HomePage;
