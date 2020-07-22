import moment from 'moment';
import React from 'react';

import CountdownDisplaySegment from './CountdownDisplaySegment';
import styles from './CountdownDisplay.module.scss';

const {
  CountdownDisplay: rootClass,
  CountdownDisplay__break: breakClass,
} = styles;

const getSignificantSegments = ({
  years,
  months,
  days,
  hours,
  minutes,
  seconds,
}, minNumSegments) => {
  const segments = [
    [years, 'years'],
    [months, 'months'],
    [days, 'days'],
    [hours, 'hours'],
    [minutes, 'minutes'],
    [seconds, 'seconds'],
  ];
  // Determine first significant segment
  let start = segments.findIndex(([amount]) => amount > 0);
  if (start === -1 || start + minNumSegments > segments.length) {
    start = Math.max(segments.length - minNumSegments, 0);
  }
  return segments.slice(start);
};

const CountdownDisplay = ({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  minNumSegments = 3,
}) => {
  const segments = { years, months, days, hours, minutes, seconds };
  const children = getSignificantSegments(segments, minNumSegments).map(([amount, unit]) => (
    <CountdownDisplaySegment amount={amount} unit={unit} key={unit} />
  ));
  // Split into date and time segments
  if (children.length > 4) children.splice(-3, 0, <hr key="break" className={breakClass}/>);
  return (
    <time
      dateTime={moment.duration(segments).toISOString()}
      role="timer"
      aria-atomic
      className={rootClass}
    >
      {children}
    </time>
  )
};

export default CountdownDisplay;
