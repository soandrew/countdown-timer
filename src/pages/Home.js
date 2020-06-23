import React from 'react';
import moment from 'moment';
import CountdownTimer from 'components/CountdownTimer';

const ONE_MINUTE = moment.duration(1, 'minute');

const Home = ({ now = moment() }) => {
  const prevNewYearDay = moment(now).startOf('year');
  const newYearDay = moment(prevNewYearDay).add(1, 'year');
  const iso = (now.diff(prevNewYearDay) < ONE_MINUTE.asMilliseconds()
    ? prevNewYearDay
    : newYearDay
  ).toISOString();
  return (
    <CountdownTimer title='New Year Countdown' iso={iso} />
  );
};

export default Home;
