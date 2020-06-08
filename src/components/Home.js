import React from 'react';
import CountdownTimer from 'components/CountdownTimer';
import { MINUTES } from 'time/ChronoUnit';
import Duration from 'time/Duration';

const Home = ({ now = new Date() }) => {
  const prevNewYearDate = new Date(now.getFullYear(), 0, 1);
  const newYearDate = new Date(now.getFullYear() + 1, 0, 1);
  const iso = (now.getTime() - prevNewYearDate.getTime() < Duration.of(1, MINUTES).toMillis()
    ? prevNewYearDate
    : newYearDate
  ).toISOString();
  return (
    <CountdownTimer title='New Year Countdown' iso={iso} />
  );
};

export default Home;
