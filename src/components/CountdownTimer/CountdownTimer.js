import countdown from 'countdown';
import moment from 'moment-timezone';
import React, { useEffect, useMemo, useState } from 'react';

import locationForZone from 'static/locationForZone';
import CountdownDisplay from './CountdownDisplay';
import CountdownFooter from './CountdownFooter';
import CountdownThemeContext from './CountdownThemeContext';
import styles from './CountdownTimer.module.scss';

const rootClass = 'CountdownTimer';
const titleClass = `${rootClass}__title`;

const isDarkTheme = (theme) => ['dark', 'r'].includes(theme) || theme.includes('v');

const CountdownTimer = ({
  iso = moment.invalid().toISOString(),
  zone = 'UTC',
  title = 'Countdown Timer',
  titleLevel = 1,
  theme = 'light',
}) => {
  const end = useMemo(() => moment.tz(iso, moment.tz(zone).zoneName() !== 'UTC' ? zone : null), [iso, zone]);
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
    <CountdownThemeContext.Provider
      value={useMemo(() => ({ name: theme, isDark: isDarkTheme(theme) }), [theme])}
    >
      <div
        className={[
          styles[rootClass],
          styles[`${rootClass}--bg-${theme}`] ?? '',
          styles[`${rootClass}--text-${isDarkTheme(theme) ? 'light' : 'dark'}`],
        ].join(' ')}
      >
        <Heading className={styles[titleClass]}>{title}</Heading>
        <CountdownDisplay {...(value > 0 ? countdownDisplayProps : {})} />
        <CountdownFooter end={end} location={locationForZone[zone]} />
      </div>
    </CountdownThemeContext.Provider>
  );
};

export default CountdownTimer;
