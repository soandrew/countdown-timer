import _ from 'lodash/core';
import moment from 'moment-timezone';
import React from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';

import RecurringEventCountdown from 'components/RecurringEventCountdown';
import SiteHeader from 'components/SiteHeader';
import holidays from 'static/holidays';
import routes from 'static/routes';
import styles from './Home.module.scss';

const {
  Banner: bannerClass,
  'Banner--sm': bannerSmallModifier,
} = styles;

const makeRecurringEvents = (now) => _.chain(holidays)
  .map(({ name, date, offset, ...rest }) => {
    const occurrence = moment.tz(date, now.tz());
    const [prev, next] = now.isSameOrAfter(occurrence)
      ? [occurrence, moment(occurrence).add(1, offset)]
      : [moment(occurrence).subtract(1, offset), occurrence];
    return {
      title: `${name} Countdown`,
      prev,
      next,
      ...rest
    };
  })
  .tap(arr => arr.push(
    {
      title: 'Countdown to Midnight',
      prev: moment(now).startOf('day'),
      next: moment(now).startOf('day').add(1, 'day'),
      theme: 'v',
    },
    {
      title: 'Countdown to the Weekend',
      prev: moment(now).day(-1).startOf('day'),  // Previous Saturday
      next: moment(now).day(6).startOf('day'),  // This Saturday
      theme: 'y',
    },
  ))
  .sortBy(({ next }) => next.valueOf())
  .value();

const TopBanner = () => (
  <Container className="pt-3 pb-1 pb-sm-0">
    <p className={`${bannerClass} ${bannerSmallModifier}`}>
      <span className="mb-2 mb-sm-0 mr-sm-2">Select a countdown below or</span>
      <Button as={Link} to={routes.create.path} variant="outline-dark">
        Create a custom countdown
      </Button>
    </p>
  </Container>
);

const BottomBanner = () => (
  <Container as="nav" className="pt-4 pb-2">
    <p className={bannerClass}>
      <span className="mb-2">Can't find the countdown you're looking for?</span>
      <Button as={Link} to={routes.create.path} variant="dark" className="p-3">
        Create a custom countdown
      </Button>
    </p>
  </Container>
);

const Home = ({
  now = moment.tz(moment.tz.guess()),
}) => {
  return (
    <>
      <SiteHeader title="Live Countdown Timers" />
      <TopBanner />
      <ListGroup as="ul">
        {makeRecurringEvents(now).map(props => (
          <ListGroup.Item
              as="li"
              key={props.title}
              className="border-left-0 border-right-0 rounded-0 p-2"
            >
            <RecurringEventCountdown
              {...props}
              now={now}
              titleLevel={2}
              link
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <BottomBanner />
    </>
  );
};

export default Home;
