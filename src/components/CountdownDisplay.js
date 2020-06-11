import React from 'react';
import CountdownDisplaySegment from 'components/CountdownDisplaySegment';
import _ from 'lodash/core';
import moment from 'moment';
import styles from './CountdownDisplay.module.scss';

const {
  CountdownDisplay: rootClass,
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
    start = allSegments.length - minNumSegments;
  }
  return allSegments.slice(start);
};

const CountdownDisplay = (props) => {
  const segments = getSignificantSegments(props);
  return (
    <time dateTime={moment.duration(props).toISOString()} className={rootClass}>
      {segments.map(([amount, unit]) => (
        <CountdownDisplaySegment amount={amount} unit={unit} key={unit} />
      ))}
    </time>
  )
};

// This needs to be declared outside of function in order for it to work for 
// isEqual as well
CountdownDisplay.defaultProps = { 
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  minNumSegments: 3,
};

const isEqual = (prevProps, nextProps) => {
  const prevSegments = getSignificantSegments(prevProps);
  const nextSegments = getSignificantSegments(nextProps);
  return _.isEqual(prevSegments, nextSegments);
}

export default React.memo(CountdownDisplay, isEqual);
