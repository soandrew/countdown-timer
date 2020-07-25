import moment from 'moment';
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import SEO from 'components/SEO';
import Tooltip from 'components/Tooltip';
import routes from 'static/routes';
import { formatLocation } from 'utils/location';
import CountdownThemeContext from './CountdownThemeContext';
import styles from './CountdownFooter.module.scss';

const {
  CountdownFooter: rootClass,
  CountdownFooter__time: timeClass,
  CountdownFooter__zone: zoneClass,
} = styles;

const toDateString = dateTime => dateTime.format('dddd, MMMM D, YYYY');

const toTimeString = dateTime => (
  !dateTime.isSame(moment(dateTime).startOf('day')) ? dateTime.format('h:mm A') : ''
);

const renderDateTime = ({ end }) => (
  <time dateTime={end.toISOString(true)}>
    <span className={timeClass}>{toDateString(end)}</span>
    {toTimeString(end) && <> at <span className={timeClass}>{toTimeString(end)}</span></>}
  </time>
);

const renderLocation = ({ end, location, theme }) => (
  <Tooltip
    title={location ? end.format('[UTC]Z') : end.format('zz')}
    id="zone-info"
    theme={theme.isDark ? 'light' : 'dark'}
    className={zoneClass}
  >
    {formatLocation(location) || end.format('z')}
  </Tooltip>
);

const format = ({ end, location }) => end.isValid()
  ? `${toDateString(end)}${toTimeString(end) ? ` at ${toTimeString(end)}` : ''} in ${formatLocation(location) || end.format('z')} time`
  : end.format();

const render = ({ end, location, theme }) => end.isValid()
  ? <>{renderDateTime({ end })} in {renderLocation({ end, location, theme })} time</>
  : <span className={timeClass}>{end.format()}</span>;

const CountdownFooter = ({ end, location }) => {
  const theme = useContext(CountdownThemeContext);
  return (
    <>
      <Route exact path={routes.display.path}>
        <SEO
          description={`Live countdown timer counting down the days, hours, minutes, and seconds until ${format({ end, location })}`}
        />
      </Route>
      <span className={rootClass}>until {render({ end, location, theme })}</span>
    </>
  );
};

export default CountdownFooter;
