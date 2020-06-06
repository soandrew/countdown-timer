import React, { useEffect, useMemo, useState } from 'react';
import countdown from 'countdown';
import CountdownDisplay from 'components/CountdownDisplay';

const CountdownTimer = ({
  iso,
  title = '',
}) => {
  const endDate = useMemo(() => Date.parse(iso), [iso]);
  const [timeToEndDate, setTimeToEndDate] = useState(countdown(null, endDate));
  useEffect(() => {
    const intervalId = countdown((timespan) => setTimeToEndDate(timespan), endDate);
    return () => clearInterval(intervalId)
  }, [endDate]);

  const {
    start,  // unused
    end,  // unused
    units,  // unused
    value,
    ...countdownDisplayProps
  } = timeToEndDate;

  return (
    <div>
      <h1>{title}</h1>
      {value > 0
        ? <CountdownDisplay {...countdownDisplayProps} />
        : <CountdownDisplay />
      }
    </div>
  )
};

export default CountdownTimer;
