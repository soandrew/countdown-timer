import moment from 'moment';
import React from 'react';

import CountdownTimer from 'components/CountdownTimer';

const ONE_MINUTE = moment.duration(1, 'minute');

const RecurringEventCountdown = ({
  title,
  prev,
  next,
  now,
  toleranceMillis = ONE_MINUTE.asMilliseconds(),
}) => {
  const iso = (now.diff(prev) < toleranceMillis
    ? prev
    : next
  ).toISOString();
  return (
    <CountdownTimer title={title} iso={iso} zone={now.tz()} />
  ); 
};

export default RecurringEventCountdown;
