import React from 'react';
import CountdownTimer from 'components/CountdownTimer';
import useQueryParams from 'hooks/useQueryParams';

const DisplayCountdown = () => {
  const { iso, title } = useQueryParams();
  return (
    <CountdownTimer iso={iso} title={title} />
  );
};

export default DisplayCountdown;
