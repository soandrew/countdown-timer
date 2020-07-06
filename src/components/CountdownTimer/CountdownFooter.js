import moment from 'moment';
import React from 'react';

import countries from 'static/countries';
import styles from './CountdownFooter.module.scss';

const {
  CountdownFooter: rootClass,
  CountdownFooter__time: timeClass,
  CountdownFooter__zone: zoneClass,
} = styles;

const CountdownFooter = ({
  end,
  location: { city, country } = {},
}) => {
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
      {city
        ? (
          <abbr title={end.format('[UTC]Z')} className={zoneClass}>
            {`${city}, ${countries[country]}`}
          </abbr>
        )
        : <abbr title={end.format('zz')} className={zoneClass}>{end.format('z')}</abbr>
      }
      {' time'}
    </>
  );

  return (
    <span className={rootClass}>{timeEl} {zoneEl}</span>
  );
};

export default CountdownFooter;
