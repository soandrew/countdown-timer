import moment from 'moment';
import React from 'react';

import { formatLocation } from 'utils/location';
import styles from './CountdownFooter.module.scss';

const {
  CountdownFooter: rootClass,
  CountdownFooter__time: timeClass,
  CountdownFooter__zone: zoneClass,
} = styles;

const CountdownFooter = ({ end, location }) => {
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
      <abbr
        title={location ? end.format('[UTC]Z') : end.format('zz')}
        className={zoneClass}
      >
        {location ? formatLocation(location) : end.format('z')}
      </abbr>
      {' time'}
    </>
  );

  return (
    <span className={rootClass}>{timeEl} {zoneEl}</span>
  );
};

export default CountdownFooter;
