import React from "react";
import PropTypes from "prop-types";
import { format, startOfWeek, addDays, startOfMonth } from "date-fns";
import "./WeekDays.css";

export const WeekDays = ({ firstActiveDay }) => {
  const getWeekDays = (date) => {
    const weekDays = [];
    const monthFirstDay = startOfMonth(date);
    const weekStartDate = startOfWeek(monthFirstDay);

    for (let weekDay = 0; weekDay < 7; weekDay++) {
      weekDays.push(format(addDays(weekStartDate, weekDay), "EEE"));
    }

    return weekDays;
  };

  const weekDays = getWeekDays(firstActiveDay);

  return (
    <div className="WeekDays_row">
      {weekDays.map((day) => (
        <div className="WeekDays_day" key={day} >
          {day}
        </div>
      ))}
    </div>
  );
};

WeekDays.propTypes = {
  month: PropTypes.string,
};
