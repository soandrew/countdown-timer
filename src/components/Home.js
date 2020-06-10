import React from 'react';
import moment from 'moment';
import CountdownTimer from 'components/CountdownTimer';
import { MINUTES } from 'time/ChronoUnit';
import Duration from 'time/Duration';

const Home = ({ now = moment() }) => {
  const prevNewYearDay = moment({ year: now.year(), month: 0, date: 1 });
  const newYearDay = moment(prevNewYearDay).add(1, 'year');
  const iso = (now.diff(prevNewYearDay) < Duration.of(1, MINUTES).toMillis()
    ? prevNewYearDay
    : newYearDay
  ).toISOString();
  return (
    <CountdownTimer title='New Year Countdown' iso={iso} />
  );
};

export default Home;
