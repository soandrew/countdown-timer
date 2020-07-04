import moment from 'moment';
import React from 'react';

import CountdownLink from 'components/CountdownLink';
import CountdownTimer from 'components/CountdownTimer';

const ONE_MINUTE = moment.duration(1, 'minute');

const RecurringEventCountdown = ({
  prev,
  next,
  now,
  toleranceMillis = ONE_MINUTE.asMilliseconds(),
  link = false,
  ...rest
}) => {
  const Countdown = link ? CountdownLink : CountdownTimer;
  const iso = (now.diff(prev) < toleranceMillis
    ? prev
    : next
  ).format('YYYYMMDD[T]HHmmss');
  return (
    <Countdown iso={iso} zone={now.tz()} {...rest} />
  ); 
};

export default RecurringEventCountdown;
