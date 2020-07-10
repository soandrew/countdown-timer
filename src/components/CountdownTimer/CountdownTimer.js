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

const shouldUseLightText = (theme) => ['dark', 'r'].includes(theme) || theme.includes('v');

const CountdownTimer = ({
  iso = moment.invalid().toISOString(),
  zone,  // moment.js defaults to 'UTC'
  title = 'Countdown Timer',
  titleLevel = 1,
  theme = 'light',
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
  const rootClassBgModifier = styles[`CountdownTimer--bg-${theme}`] ?? '';
  const rootClassTextModifier = styles[`CountdownTimer--text-${shouldUseLightText(theme) ? 'light' : 'dark'}`];

  return (
    <div className={`${rootClass} ${rootClassBgModifier} ${rootClassTextModifier}`}>
      <Heading className={titleClass}>{title}</Heading>
      {value > 0
        ? <CountdownDisplay {...countdownDisplayProps} />
        : <CountdownDisplay />
      }
      <CountdownFooter
        end={end}
        location={locationForZone[zone]}
        tooltipTheme={shouldUseLightText(theme) ? 'light' : 'dark'}
      />
    </div>
  )
};

export default CountdownTimer;
