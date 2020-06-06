import React from 'react';
import styles from './CountdownDisplaySegment.module.scss';

const {
  CountdownDisplaySegment: rootClass,
  CountdownDisplaySegment__amount: amountClass,
  CountdownDisplaySegment__digit: digitClass,
  CountdownDisplaySegment__unit: unitClass,
} = styles;

const CountdownDisplaySegment = ({ amount, unit, numDigits = 2 }) => {
  const digits = String(amount).padStart(numDigits, '0').split('');
  return (
    <span className={rootClass}>
      <span className={amountClass}>
        {digits.map((ele, idx) => <span className={digitClass} key={idx}>{ele}</span>)}
      </span>
      <span className={unitClass}>{amount === 1 ? unit.name : unit.namePlural}</span>
    </span>
  );
};

export default CountdownDisplaySegment;
