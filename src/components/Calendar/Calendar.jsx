import React from "react";
import PropTypes from 'prop-types';
import { format } from 'date-fns'
import { CurrentMonth } from '../CurrentMonth/CurrentMonth'
import { WeekDays } from '../WeekDays/WeekDays'
import { DayCells } from '../DayCells/DayCells'
import './Calendar.css'

const getFormattedMonth = (date) => {
  const formattedMonth = format(date, 'MMMM yyyy')

  return formattedMonth;
}

export const Calendar = ({ gainLossData }) => {
  const firstActiveDay = new Date(gainLossData[0].date)
  const formattedMonth = getFormattedMonth(firstActiveDay)

  return (
    <div className="Calendar">
      <CurrentMonth
        month={formattedMonth}
      />
      <div className="Calendar_cells">
        <WeekDays
          firstActiveDay={firstActiveDay}
        />
        <DayCells
          gainLossData={gainLossData}
          firstActiveDay={firstActiveDay}
        />
      </div>
    </div>
  )
}

Calendar.defaultProps = {
  gainLossData: [{
    date: '1 Dec 2020',
    trades: 5,
    gainLoss: 16536.10
  }, {
    date: '2 Dec 2020',
    trades: 1,
    gainLoss: -3541.72
  }, {
    date: '3 Dec 2020',
    trades: 3,
    gainLoss: 5946.79
  }, {
    date: '4 Dec 2020',
    trades: 2,
    gainLoss: -2488.25
  }, {
    date: '7 Dec 2020',
    trades: 2,
    gainLoss: 9578.25
  }, {
    date: '8 Dec 2020',
    trades: 1,
    gainLoss: 1016.268
  }, {
    date: '9 Dec 2020',
    trades: 4,
    gainLoss: 12055.90
  }, {
    date: '10 Dec 2020',
    trades: 1,
    gainLoss: 15375.78
  }, {
    date: '14 Dec 2020',
    trades: 1,
    gainLoss: -868.14
  }]
}

Calendar.propTypes = {
  gainLossData: PropTypes.arrayOf(PropTypes.object),
}

