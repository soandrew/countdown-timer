import React from 'react';
import CountdownTimer from 'components/CountdownTimer';
import styles from './CountdownPreview.module.scss';

const {
  CountdownPreview: rootClass,
  CountdownPreview__title: titleClass,
} = styles;

const CountdownPreview = ({
  defaultValues,
  values: { endDate, endTime, zone, title },
  titleLevel,
}) => {
  const Heading = `h${titleLevel}`;
  return (
    <div className={rootClass}>
      <Heading className={titleClass}>Preview</Heading>
      <CountdownTimer
        iso={`${endDate}T${endTime}`}
        zone={zone || defaultValues.zone}
        title={title || defaultValues.title}
        titleLevel={titleLevel + 1}
      />
    </div>
  );
};

export default CountdownPreview;
