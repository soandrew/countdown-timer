import _ from 'lodash/core';
import moment from 'moment-timezone';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

import RecurringEventCountdown from 'components/RecurringEventCountdown';
import SiteHeader from 'components/SiteHeader';
import holidays from 'static/holidays';

const makeRecurringEvents = (now) => _.chain(holidays)
  .map(({ name, date, offset }) => {
    const occurrence = moment.tz(date, now.tz());
    const [prev, next] = now.isSameOrAfter(occurrence)
      ? [occurrence, moment(occurrence).add(1, offset)]
      : [moment(occurrence).subtract(1, offset), occurrence];
    return {
      title: `${name} Countdown`,
      prev,
      next,
    };
  })
  .tap(arr => arr.push(
    {
      title: 'Countdown to Midnight',
      prev: moment(now).startOf('day'),
      next: moment(now).startOf('day').add(1, 'day'),
    },
    {
      title: 'Countdown to the Weekend',
      prev: moment(now).day(-1).startOf('day'),  // Previous Saturday
      next: moment(now).day(6).startOf('day'),  // This Saturday
    },
  ))
  .sortBy(({ next }) => next.valueOf())
  .value();

const Home = ({
  now = moment.tz(moment.tz.guess()),
}) => {
  return (
    <>
      <SiteHeader title="Live Countdown Timers" />
      <ListGroup>
        {makeRecurringEvents(now).map(props => (
          <ListGroup.Item key={props.title} className="border-left-0 border-right-0">
            <RecurringEventCountdown
              now={now}
              {...props}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Home;
