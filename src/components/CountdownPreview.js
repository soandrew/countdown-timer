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
    <div className={rootClass}>
      <Heading className={titleClass}>Preview</Heading>
      <CountdownTimer
        titleLevel={titleLevel + 1}
        {...rest}
      />
    </div>
  );
};

export default CountdownPreview;
