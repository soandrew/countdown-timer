import React, { useEffect, useMemo, useState } from 'react';
import countdown from 'countdown';
import moment from 'moment-timezone';
import CountdownDisplay from 'components/CountdownDisplay';
import CountdownFooter from 'components/CountdownFooter';
import locationForZone from 'static/locationForZone';
import styles from './CountdownTimer.module.scss';

const {
  CountdownTimer: rootClass,
  CountdownTimer__title: titleClass,
} = styles;

const CountdownTimer = ({
  iso = moment.invalid().toISOString(),
  zone = 'UTC',
  title = 'Countdown Timer',
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

  return (
    <div className={rootClass}>
      <h1 className={titleClass}>{title}</h1>
      {value > 0
        ? <CountdownDisplay {...countdownDisplayProps} />
        : <CountdownDisplay />
      }
      <CountdownFooter end={end} location={locationForZone[zone]} />
    </div>
  )
};

export default CountdownTimer;
