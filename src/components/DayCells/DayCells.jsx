import React from 'react';
import PropTypes from 'prop-types';
import { format, endOfWeek, startOfWeek, endOfMonth, startOfMonth, isSameMonth, addDays, isSameDay } from 'date-fns'
import './DayCells.css';
import clsx from 'clsx';

export const DayCells = ({ gainLossData, firstActiveDay }) => {
  const monthFirstDay = startOfMonth(firstActiveDay);
  const monthLastDay = endOfMonth(monthFirstDay);
  const startDate = startOfWeek(monthFirstDay);
  const endDate = endOfWeek(monthLastDay);
  let wholePeriodStats;
  let dayCellsRendered;

  const getFormattedAmount = (amount) => {
    if (!amount) return ''

    const formattedAmount = amount > 0 ? `$${amount}` : `-$${Math.abs(amount)}`
    return formattedAmount
  }

  const setActiveDays = (activeDates, start, end) => {
    const activityData = []
    let day = start;
    let counter = 0;
    while (day <= end) {
      const convertedDate = new Date(activeDates[counter]?.date)

      if (isSameDay(day, convertedDate)) {
        activityData.push(
          {
            ...activeDates[counter],
            date: day,
          }
        )
        counter++
      }
      else {
        activityData.push(
          {
            date: day,
            trades: '',
            gainLoss: ''
          }
        )
      }
      day = addDays(day, 1);
    }
    return activityData;
  }

  wholePeriodStats = setActiveDays(gainLossData, startDate, endDate)

  const calendarCellsRender = (startDate) => {
    const weeks = [];
    let days = [];
    let day = startDate;
    let counter = 0;

    while (day <= endDate) {
      for (let weekDay = 0; weekDay < 7; weekDay++) {
        const formattedDate = format(day, 'd');

        const { trades, gainLoss: dayTotal } = wholePeriodStats[counter]
        const classes = clsx({
          DayCells_cell: true,
          'DayCells_cell___anotherMonth': !isSameMonth(day, monthFirstDay),
          'DayCells_cell___activeDay': trades,
          'DayCells_cell___gainDay': dayTotal > 0,
          'DayCells_cell___lossDay': dayTotal < 0,
        })
        days.push(
          <div
            className={classes}
            key={day}
          >
            <div>
              <span className="DayCells_cell___cellNumber">{formattedDate}</span>
              <span>
                {dayTotal && getFormattedAmount(dayTotal)}
              </span>
            </div>
            <div >
              {trades && trades + " Trades"}
            </div>
          </div>
        );
        day = addDays(day, 1)
        counter++
      }
      weeks.push(
        <div className="DayCells_row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return weeks
  }

  dayCellsRendered = calendarCellsRender(startDate);

  return (
    <div
    >
      {dayCellsRendered}
    </div>
  )
}

DayCells.propTypes = {
  gainLossData: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    trades: PropTypes.number.isRequired,
    gainLoss: PropTypes.number.isRequired
  })),
  firstActiveDay: PropTypes.instanceOf(Date)
}
