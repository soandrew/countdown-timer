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

const toISODurationString = ({
  years,
  months,
  days,
  hours,
  minutes,
  seconds,
}) => {
  return `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
};

const CountdownDisplay = (props) => {
  const segments = getSignificantSegments(props);
  return (
    <time dateTime={toISODurationString(props)} className={rootClass}>
      {segments.map(duration => (
        <CountdownDisplaySegment {...duration} key={duration.unit.name} />
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
  numSegments: 3,
};

const isEqual = (prevProps, nextProps) => {
  const prevSegments = getSignificantSegments(prevProps);
  const nextSegments = getSignificantSegments(nextProps);
  if (prevSegments.length !== nextSegments.length) {
    return false;
  }
  for (let i = prevSegments.length; i >= 0; i--) {
    if (!Duration.isEqual(prevSegments[i], nextSegments[i])) {
      return false;
    }
  }
  return true;
}

export default React.memo(CountdownDisplay, isEqual);
