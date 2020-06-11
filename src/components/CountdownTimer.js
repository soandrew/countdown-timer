import React, { useEffect, useMemo, useState } from 'react';
import countdown from 'countdown';
import moment from 'moment';
import CountdownDisplay from 'components/CountdownDisplay';
import styles from './CountdownTimer.module.scss';

const {
  CountdownTimer: rootClass,
  CountdownTimer__title: titleClass,
  CountdownTimer__footer: footerClass,
} = styles;

const CountdownTimer = ({
  iso,
  title,
}) => {
  const end = useMemo(() => moment(iso), [iso]);
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
      <span className={footerClass}>until <time dateTime={iso}>{end.format('LLLL')}</time></span>
    </div>
  )
};

// Declared outside of function in order for its values to be used elsewhere
CountdownTimer.defaultProps = {
  iso: moment.invalid(),
  title: 'Countdown Timer',
};

export default CountdownTimer;
