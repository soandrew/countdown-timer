import '@testing-library/jest-dom/extend-expect';
import { act, render } from '@testing-library/react';
import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';

import CountdownDisplay from '../CountdownDisplay';
import CountdownFooter from '../CountdownFooter';
import CountdownTimer from '../CountdownTimer';

const notBlankString = () => /\S+/;

describe('<CountdownTimer />', () => {
  describe('when no props provided', () => {
    it('should render a default header', () => {
      const heading = shallow(<CountdownTimer />).find('h1');
      expect(heading).toExist();
      expect(heading.text()).toMatch(notBlankString());
    });

    it('should render a display with duration 0', () => {
      const display = shallow(<CountdownTimer />).find(CountdownDisplay);
      expect(display)
        .toExist()
        .toHaveProp({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
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
      expect(display)
        .toExist()
        .toHaveProp({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
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
      const display = render(<CountdownTimer {...props} />).getByRole('timer');
      expect(display)
        .toHaveTextContent('01 year')
        .toHaveTextContent('00 months')
        .toHaveTextContent('05 days')
        .toHaveTextContent('00 hours')
        .toHaveTextContent('03 minutes')
        .toHaveTextContent('00 seconds');

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 1100))
      })

      expect(display)
        .toHaveTextContent('01 year')
        .toHaveTextContent('00 months')
        .toHaveTextContent('05 days')
        .toHaveTextContent('00 hours')
        .toHaveTextContent('02 minutes')
        .toHaveTextContent('59 seconds');
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
      expect(display)
        .toExist()
        .toHaveProp({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
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
      const view = render(<CountdownTimer {...props} />);
      expect(view.getByText(props.title).parentNode.className).toMatch(`--text-${timerTextColor}`);
      expect(view.getAllByText('0')[0].className).toMatch(`--bg-${digitBgColor}`);
      expect(view.getByRole('tooltip').parentNode.className).toMatch(`--${tooltipTheme}`);
    });
  });
});