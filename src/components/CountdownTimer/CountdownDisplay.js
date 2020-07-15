import isEqual from 'lodash/isEqual';
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
  minNumSegments,
}) => {
  const allSegments = [
    [years, 'years'],
    [months, 'months'],
    [days, 'days'],
    [hours, 'hours'],
    [minutes, 'minutes'],
    [seconds, 'seconds'],
  ];
  // Determine first significant segment
  let start = allSegments.findIndex(([amount]) => amount > 0);
  if (start === -1 || start + minNumSegments > allSegments.length) {
    start = Math.max(allSegments.length - minNumSegments, 0);
  }
  return allSegments.slice(start);
};

const CountdownDisplay = (props) => {
  const children = getSignificantSegments(props).map(([amount, unit]) => (
    <CountdownDisplaySegment amount={amount} unit={unit} key={unit} />
  ));
  // Split into date and time segments
  if (children.length > 4) children.splice(-3, 0, <hr key="break" className={breakClass}/>);
  return (
    <time
      dateTime={moment.duration(props).toISOString()}
      role="timer"
      aria-atomic
      className={rootClass}
    >
      {children}
    </time>
  )
};

// This needs to be declared outside of function in order for it to work for 
// areEqual as well
CountdownDisplay.defaultProps = { 
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  minNumSegments: 3,
};

const areEqual = (prevProps, nextProps) => {
  const prevSegments = getSignificantSegments(prevProps);
  const nextSegments = getSignificantSegments(nextProps);
  return isEqual(prevSegments, nextSegments);
}

export default React.memo(CountdownDisplay, areEqual);
