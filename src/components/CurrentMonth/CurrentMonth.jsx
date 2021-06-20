import React from 'react';
import PropTypes from 'prop-types';

import './CurrentMonth.css'

export const CurrentMonth = ({ month }) => {

  return (
    <div
      className="CurrentMonth"
    >
      {month}
    </div>
  )
}

CurrentMonth.propTypes = {
  month: PropTypes.string
}
