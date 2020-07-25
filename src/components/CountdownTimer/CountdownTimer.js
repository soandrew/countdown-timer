import countdown from 'countdown';
import moment from 'moment-timezone';
import React, { useEffect, useMemo, useState } from 'react';
import { Route } from 'react-router-dom';

import SEO from 'components/SEO';
import locationForZone from 'static/locationForZone';
import routes from 'static/routes';
import CountdownDisplay from './CountdownDisplay';
import CountdownFooter from './CountdownFooter';
import CountdownThemeContext, { themes } from './CountdownThemeContext';
import styles from './CountdownTimer.module.scss';

const rootClass = 'CountdownTimer';
const titleClass = `${rootClass}__title`;

const CountdownTimer = ({
  iso = moment.invalid().toISOString(),
  zone = 'UTC',
  title = 'Countdown Timer',
  titleLevel = 1,
  theme: themeId = 'light',
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

  const theme = useMemo(() => themes.find(theme => theme.id === themeId) ?? themes[0], [themeId]);
  const Heading = `h${titleLevel}`;

  return (
    <CountdownThemeContext.Provider value={theme}>
      <div
        className={[
          styles[rootClass],
          styles[`${rootClass}--bg-${theme.id}`],
          styles[`${rootClass}--text-${theme.isDark ? 'light' : 'dark'}`],
        ].join(' ')}
      >
        <Route exact path={routes.display.path}>
          <SEO title={title} />
        </Route>
        <Heading className={styles[titleClass]}>{title}</Heading>
        <CountdownDisplay {...(value > 0 ? countdownDisplayProps : {})} />
        <CountdownFooter end={end} location={locationForZone[zone]} />
      </div>
    </CountdownThemeContext.Provider>
  );
};

export default CountdownTimer;
