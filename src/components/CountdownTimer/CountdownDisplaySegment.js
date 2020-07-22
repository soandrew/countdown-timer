import moment from 'moment';
import React, { useContext } from 'react';

import CountdownThemeContext from './CountdownThemeContext';
import styles from './CountdownDisplaySegment.module.scss';

const rootClass = 'CountdownDisplaySegment';
const amountClass = `${rootClass}__amount`;
const digitClass = `${rootClass}__digit`;
const unitClass = `${rootClass}__unit`;

const CountdownDisplaySegment = ({ amount, unit, numDigits = 2 }) => {
  const digits = String(amount).padStart(numDigits, '0').split('');
  const unitSingular = moment.normalizeUnits(unit);
  const theme = useContext(CountdownThemeContext);
  return (
    <span className={styles[rootClass]}>
      <span className={styles[amountClass]}>
        {digits.map((ele, idx) => (
          <span
            className={[
              styles[digitClass],
              styles[`${digitClass}--bg-${theme.isDark ? 'dark': 'light'}`],
            ].join(' ')}
            key={idx}
          >
            {ele}
          </span>
        ))}
      </span>
      {' '}
      <span className={styles[unitClass]}>{amount === 1 ? unitSingular : `${unitSingular}s`}</span>
    </span>
  );
};

export default CountdownDisplaySegment;
