import React, { useEffect, useMemo, useState } from 'react';
import countdown from 'countdown';
import CountdownDisplay from 'components/CountdownDisplay';
import styles from './CountdownTimer.module.scss';

const {
  CountdownTimer: rootClass,
  CountdownTimer__title: titleClass,
  CountdownTimer__footer: footerClass,
} = styles;

const CountdownTimer = ({
  iso,
  title = 'Countdown Timer',
}) => {
  const endDate = useMemo(() => new Date(iso), [iso]);
  const [timeToEndDate, setTimeToEndDate] = useState(countdown(null, endDate));
  useEffect(() => {
    const intervalId = countdown((timespan) => setTimeToEndDate(timespan), endDate);
    return () => clearInterval(intervalId)
  }, [endDate]);

  const {
    start,  // eslint-disable-line no-unused-vars
    end,  // eslint-disable-line no-unused-vars
    units,  // eslint-disable-line no-unused-vars
    value,
    ...countdownDisplayProps
  } = timeToEndDate;

  return (
    <div className={rootClass}>
      <h1 className={titleClass}>{title}</h1>
      {value > 0
        ? <CountdownDisplay {...countdownDisplayProps} />
        : <CountdownDisplay />
      }
      <span className={footerClass}>until <time dateTime={iso}>{endDate.toString()}</time></span>
    </div>
  )
};

export default CountdownTimer;
