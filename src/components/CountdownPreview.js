import React from 'react';
import CountdownTimer from 'components/CountdownTimer';
import styles from './CountdownPreview.module.scss';

const {
  CountdownPreview: rootClass,
  CountdownPreview__title: titleClass,
} = styles;

const CountdownPreview = ({
  titleLevel,
  ...rest
}) => {
  const Heading = `h${titleLevel}`;
  return (
    <section className={rootClass}>
      <Heading className={titleClass}>
        <span className="sr-only">Countdown </span>preview
      </Heading>
      <CountdownTimer
        titleLevel={titleLevel + 1}
        {...rest}
      />
    </section>
  );
};

export default CountdownPreview;
