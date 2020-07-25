import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';

import CountdownLink from '../CountdownLink';
import CountdownTimer from '../CountdownTimer';
import RecurringEventCountdown from '../RecurringEventCountdown';

describe('<RecurringEventCountdown />', () => {
  describe('when now is within tolerance milliseconds of prev', () => {
    describe('should render a countdown to the previous date', () => {
      test.each`
        link     | Countdown
        ${false} | ${CountdownTimer}
        ${true}  | ${CountdownLink}
      `('<$Countdown.name />', ({ link, Countdown }) => {
        const props = {
          prev: moment().date(1),
          now: moment().date(2),
          next: moment().date(5),
          toleranceMillis: moment.duration(2, 'days').asMilliseconds(),
          link,
        };
        const countdown = shallow(<RecurringEventCountdown {...props} />).find(Countdown);
        expect(moment(countdown.prop('iso')).isSame(props.prev, 's')).toEqual(true);
      });
    });
  });

  describe('when now is beyond tolerance milliseconds of prev', () => {
    describe('should render a countdown to the next date', () => {
      test.each`
        link     | Countdown
        ${false} | ${CountdownTimer}
        ${true}  | ${CountdownLink}
      `('<$Countdown.name />', ({ link, Countdown }) => {
        const props = {
          prev: moment().date(1),
          now: moment().date(4),
          next: moment().date(5),
          toleranceMillis: moment.duration(2, 'days').asMilliseconds(),
          link,
        };
        const countdown = shallow(<RecurringEventCountdown {...props} />).find(Countdown);
        expect(moment(countdown.prop('iso')).isSame(props.next, 's')).toEqual(true);
      });
    });
  });
});
