import moment from 'moment';
import React, { useContext } from 'react';

import CountdownThemeContext from './CountdownThemeContext';
import styles from './CountdownDisplaySegment.module.scss';

const {
  CountdownDisplaySegment: rootClass,
  CountdownDisplaySegment__amount: amountClass,
  CountdownDisplaySegment__digit: digitClass,
  CountdownDisplaySegment__unit: unitClass,
} = styles;

const CountdownDisplaySegment = ({ amount, unit, numDigits = 2 }) => {
  const digits = String(amount).padStart(numDigits, '0').split('');
  const unitSingular = moment.normalizeUnits(unit);
  const theme = useContext(CountdownThemeContext);
  const digitClassBgModifier = styles[`CountdownDisplaySegment__digit--bg-${theme.isDark ? 'dark': 'light'}`];
  return (
    <span className={rootClass}>
      <span className={amountClass}>
        {digits.map((ele, idx) => (
          <span className={`${digitClass} ${digitClassBgModifier}`} key={idx}>{ele}</span>)
        )}
      </span>
      {' '}
      <span className={unitClass}>{amount === 1 ? unitSingular : `${unitSingular}s`}</span>
    </span>
  );
};

export default CountdownDisplaySegment;
