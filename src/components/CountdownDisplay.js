import React from 'react';
import CountdownDisplaySegment from 'components/CountdownDisplaySegment';
import ChronoUnit from 'time/ChronoUnit.js';
import Duration from 'time/Duration.js';
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
  numSegments,
}) => {
  const allSegments = [
    Duration.of(years, ChronoUnit.YEARS),
    Duration.of(months, ChronoUnit.MONTHS),
    Duration.of(days, ChronoUnit.DAYS),
    Duration.of(hours, ChronoUnit.HOURS),
    Duration.of(minutes, ChronoUnit.MINUTES),
    Duration.of(seconds, ChronoUnit.SECONDS),
  ];
  // Determine first significant segment
  let start = allSegments.findIndex(({amount}) => amount > 0);
  if (start === -1 || start + numSegments > allSegments.length) {
    start = allSegments.length - numSegments;
  }
  return allSegments.slice(start, start + numSegments);
};

const CountdownDisplay = (props) => {
  const significantSegments = getSignificantSegments(props);
  return (
    <span className={rootClass}>
      {significantSegments.map(duration => (
        <CountdownDisplaySegment {...duration} key={duration.unit.name} />
      ))}
    </span>
  )
};

CountdownDisplay.defaultProps = {
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  numSegments: 3,
};

const areEqual = (prevProps, nextProps) => {
  const prevSignificantSegments = getSignificantSegments(prevProps);
  const nextSignificantSegments = getSignificantSegments(nextProps);
  if (prevSignificantSegments.length !== nextSignificantSegments.length) return false;
  for (let i = prevSignificantSegments.length; i >= 0; i--) {
    if (!Duration.isEqual(prevSignificantSegments[i], nextSignificantSegments[i])) return false;
  }
  return true;
}

export default React.memo(CountdownDisplay, areEqual);
