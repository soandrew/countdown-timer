import { shallow, mount } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { act } from 'react-dom/test-utils';

import Tooltip from 'components/Tooltip';
import CountdownDisplay from '../CountdownDisplay';
import CountdownDisplaySegment from '../CountdownDisplaySegment';
import CountdownFooter from '../CountdownFooter';
import CountdownTimer from '../CountdownTimer';

describe('<CountdownTimer />', () => {
  describe('when no props provided', () => {
    it('should render a default header', () => {
      const heading = shallow(<CountdownTimer />).find('h1');
      expect(heading).toExist();
      expect(heading.text()).toMatch(expect.not.blankString());
    });

    it('should render a display with duration 0', () => {
      const display = shallow(<CountdownTimer />).find(CountdownDisplay);
      expect(display).toExist();
      expect(display.props()).toEqual({});
    });

    it('should render a footer with an invalid date', () => {
      const footer = shallow(<CountdownTimer />).find(CountdownFooter);
      expect(footer).toExist();
      expect(footer.prop('end').isValid()).toEqual(false);
    });
  });

  describe('when title is provided', () => {
    it('should render a header with the correct text', () => {
      const heading = shallow(<CountdownTimer title="Hello, World" />).find('h1');
      expect(heading)
        .toExist()
        .toHaveText('Hello, World');
    });
  });

  describe('when iso is in the past', () => {
    const props = {
      iso: '20180131T1139',
      zone: 'America/New_York'
    };

    it('should render a display with duration 0', () => {
      const display = shallow(<CountdownTimer {...props} />).find(CountdownDisplay);
      expect(display).toExist();
      expect(display.props()).toEqual({});
    });

    it('should render a footer with the correct date', () => {
      const footer = shallow(<CountdownTimer {...props} />).find(CountdownFooter);
      expect(footer).toExist();
      expect(footer.prop('end').isSame(moment.tz(props.iso, props.zone))).toEqual(true);
    });
  });

  describe('when iso is in the future', () => {
    const props = {
      iso: moment().add({
        years: 1,
        days: 5,
        minutes: 3,
      }).toISOString(),
      zone: 'America/Vancouver',
    };

    it('should render a live display with the correct duration', async () => {
      const wrapper = mount(<CountdownTimer {...props} />);
      expect(wrapper.find(CountdownDisplay)).toHaveProp({
        years: 1,
        months: 0,
        days: 5,
        hours: 0,
        minutes: 3,
        seconds: 0,
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 1100));
      });
      wrapper.update();

      expect(wrapper.find(CountdownDisplay)).toHaveProp({
        years: 1,
        months: 0,
        days: 5,
        hours: 0,
        minutes: 2,
        seconds: 59,
      });
    });

    it('should render a footer with the correct date', () => {
      const footer = shallow(<CountdownTimer {...props} />).find(CountdownFooter);
      expect(footer.prop('end').isSame(moment.tz(props.iso, props.zone))).toEqual(true);
    });
  });

  describe('when iso is invalid', () => {
    // Suppress console warnings from moment.js for unrecognized iso format
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    const props = {
      iso: 'garbage',
    };

    it('should render a display with duration 0', () => {
      const display = shallow(<CountdownTimer {...props} />).find(CountdownDisplay);
      expect(display).toExist();
      expect(display.props()).toEqual({});
    });

    it('should render a footer with an invalid date', () => {
      const footer = shallow(<CountdownTimer {...props} />).find(CountdownFooter);
      expect(footer.prop('end').isValid()).toEqual(false);
    });
  });

  describe('when zone is invalid', () => {
    // Suppress console errors from moment.js for unknown zone
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    const props = {
      iso: '20180131T1139',
      zone: 'garbage',
    };

    it('should default to UTC and render a footer with the correct date', () => {
      const footer = shallow(<CountdownTimer {...props} />).find(CountdownFooter);
      expect(footer).toExist();
      expect(footer.prop('end').isSame(moment.tz(props.iso, 'UTC'))).toEqual(true);
    });
  });

  describe('it should pass down theme to children as needed', () => {
    test.each`
      timerTheme | timerTextColor | digitBgColor | tooltipTheme
      ${'r'}     | ${'light'}     | ${'dark'}    | ${'light'}
      ${'biv'}   | ${'light'}     | ${'dark'}    | ${'light'}
      ${'y'}     | ${'dark'}      | ${'light'}   | ${'dark'}
      ${'roy'}   | ${'dark'}      | ${'light'}   | ${'dark'}
    `('theme=$timerTheme', ({ timerTheme, timerTextColor, digitBgColor, tooltipTheme }) => {
      const props = {
        iso: '20180131T1139',
        title: 'Countdown Timer',
        theme: timerTheme,
      };
      const wrapper = mount(<CountdownTimer {...props} />);
      expect(wrapper.find(CountdownTimer).getDOMNode().className)
        .toMatch(`--bg-${timerTheme}`)
        .toMatch(`--text-${timerTextColor}`);
      wrapper.find(CountdownDisplaySegment).forEach(it => {
        it.getDOMNode().firstChild.childNodes.forEach(it => {
          expect(it.className).toMatch(`--bg-${digitBgColor}`);
        });
      });
      expect(wrapper.find(Tooltip).getDOMNode().className).toMatch(`--${tooltipTheme}`);
    });
  });
});
