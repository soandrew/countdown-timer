import countdown from 'countdown';
import moment from 'moment-timezone';
import React, { useEffect, useMemo, useState } from 'react';

import locationForZone from 'static/locationForZone';
import CountdownDisplay from './CountdownDisplay';
import CountdownFooter from './CountdownFooter';
import styles from './CountdownTimer.module.scss';

const {
  CountdownTimer: rootClass,
  CountdownTimer__title: titleClass,
} = styles;

const CountdownTimer = ({
  iso = moment.invalid().toISOString(),
  zone,  // moment.js defaults to 'UTC'
  title = 'Countdown Timer',
  titleLevel = 1,
}) => {
  const end = useMemo(() => moment.tz(iso, zone), [iso, zone]);
  const [durationToEnd, setDurationToEnd] = useState(countdown(null, end.toDate()));
  useEffect(() => {
    const intervalId = countdown(timespan => setDurationToEnd(timespan), end.toDate());
    return () => clearInterval(intervalId)
  }, [end]);

  const {
    start: _start,
    end: _end,
    units: _units,
    value,
    ...countdownDisplayProps
  } = durationToEnd;

  const Heading = `h${titleLevel}`;

  return (
    <div className={rootClass}>
      <Heading className={titleClass}>{title}</Heading>
      {value > 0
        ? <CountdownDisplay {...countdownDisplayProps} />
        : <CountdownDisplay />
      }
      <CountdownFooter end={end} location={locationForZone[zone]} />
    </div>
  )
};

export default CountdownTimer;
