import React from 'react';
import ChronoUnit from 'time/ChronoUnit.js';
import Duration from 'time/Duration.js';

const CountdownDisplaySegment = ({ amount, unit }) => {
  return (
    <span>
      <span>{amount}</span>
      <span>{amount === 1 ? unit.name : unit.namePlural}</span>
    </span>
  );
};

const CountdownDisplay = ({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}) => {
  const segments = [
    Duration.of(years, ChronoUnit.YEARS),
    Duration.of(months, ChronoUnit.MONTHS),
    Duration.of(days, ChronoUnit.DAYS),
    Duration.of(hours, ChronoUnit.HOURS),
    Duration.of(minutes, ChronoUnit.MINUTES),
    Duration.of(seconds, ChronoUnit.SECONDS),
  ];

  // Determine first segment to display
  let start = segments.findIndex(({amount}) => amount > 0);
  if (start === -1 || start > segments.length - 3) {
    start = segments.length - 3;
  }

  return (
    <span>
      <CountdownDisplaySegment {...segments[start]} />
      <CountdownDisplaySegment {...segments[start + 1]} />
      <CountdownDisplaySegment {...segments[start + 2]} />
    </span>
  )
};

export default CountdownDisplay;
