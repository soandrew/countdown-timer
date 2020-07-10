import moment from 'moment';
import React from 'react';

import AbbrWithTooltip from 'components/AbbrWithTooltip';
import { formatLocation } from 'utils/location';
import styles from './CountdownFooter.module.scss';

const {
  CountdownFooter: rootClass,
  CountdownFooter__time: timeClass,
  CountdownFooter__zone: zoneClass,
} = styles;

const CountdownFooter = ({ end, location, tooltipTheme }) => {
  const timeEl = (
    <>
      {'until '}
      <time dateTime={end.toISOString(true)}>
        <span className={timeClass}>{end.format('dddd, MMMM D, YYYY')}</span>
        {end.isValid() && !end.isSame(moment(end).startOf('day')) && (
          <>
            {' at '}
            <span className={timeClass}>{end.format('h:mm A')}</span>
          </>
        )}
      </time>
    </>
  );
  const zoneEl = end.isValid() && (
    <>
      {'in '}
      <AbbrWithTooltip
        title={location ? end.format('[UTC]Z') : end.format('zz')}
        theme={tooltipTheme}
        className={zoneClass}
        onClick={e => e.preventDefault()}
      >
        {location ? formatLocation(location) : end.format('z')}
      </AbbrWithTooltip>
      {' time'}
    </>
  );

  return (
    <span className={rootClass}>{timeEl} {zoneEl}</span>
  );
};

export default CountdownFooter;
