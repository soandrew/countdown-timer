import React from 'react';
import CountdownTimer from 'components/CountdownTimer';
import styles from './PreviewCountdown.module.scss';

const {
  PreviewCountdown: rootClass,
  PreviewCountdown__title: titleClass,
} = styles;

const PreviewCountdown = ({
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

export default PreviewCountdown;
