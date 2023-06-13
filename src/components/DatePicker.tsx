import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const DatePicker: React.FC<{
  selectedDates: Date[] | undefined;
}> = ({ selectedDates }) => {
  return (
    <>
      <h4>
        We have found {selectedDates?.length}
        {`ticket${
          selectedDates?.length && selectedDates.length > 1 ? "s" : ""
        }`}
      </h4>
      <DayPicker mode="multiple" selected={selectedDates} fixedWeeks />
    </>
  );
};
