import React from 'react';
import CountdownTimer from 'components/CountdownTimer';
import useQueryParams from 'hooks/useQueryParams';

const DisplayCountdown = () => {
  const { iso, zone, title } = useQueryParams();
  return (
    <CountdownTimer iso={iso} zone={zone} title={title} />
  );
};

export default DisplayCountdown;
