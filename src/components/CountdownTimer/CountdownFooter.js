import moment from 'moment';
import React from 'react';

import Tooltip from 'components/Tooltip';
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
      {end.isValid()
        ? (
          <time dateTime={end.toISOString(true)}>
            <span className={timeClass}>{end.format('dddd, MMMM D, YYYY')}</span>
            {!end.isSame(moment(end).startOf('day')) && (
              <>
                {' at '}
                <span className={timeClass}>{end.format('h:mm A')}</span>
              </>
            )}
          </time>
        )
        : <span className={timeClass}>{end.format()}</span>
      }
    </>
  );
  const zoneEl = end.isValid() && (
    <>
      {' in '}
      <Tooltip
        title={location ? end.format('[UTC]Z') : end.format('zz')}
        id="zone-info"
        theme={tooltipTheme}
        className={zoneClass}
      >
        {location ? formatLocation(location) : end.format('z')}
      </Tooltip>
      {' time'}
    </>
  );

  return (
    <span className={rootClass}>{timeEl}{zoneEl}</span>
  );
};

export default CountdownFooter;
