import { shallow } from 'enzyme';
import React from 'react';

import CountdownDisplay from '../CountdownDisplay';
import CountdownDisplaySegment from '../CountdownDisplaySegment';

describe('<CountdownDisplay />', () => {

  const UNITS = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

  describe('when years is non-zero', () => {
    const props = {
      years: 1,
      months: 6,
      days: 23,
      hours: 2,
      minutes: 46,
      seconds: 52,
    };

    it('should correctly render all segments', () => {
      const segments = shallow(<CountdownDisplay {...props} />).find(CountdownDisplaySegment);
      expect(segments).toHaveLength(UNITS.length);
      segments.forEach((segment, i) => expect(segment).toHaveProp({
        unit: UNITS[i],
        amount: props[UNITS[i]],
      }));
    });

    it('should render a time element with the correct datetime', () => {
      const time = shallow(<CountdownDisplay {...props} />).find('time[role="timer"]');
      expect(time)
        .toExist()
        .toHaveProp('dateTime', 'P1Y6M23DT2H46M52S');
    });
  });

  describe('when leading segments are 0-valued', () => {
    const props = {
      years: 0,
      months: 0,
      days: 1,
      hours: 5,
      minutes: 0,
      seconds: 13,
    };

    it('should trim leading 0-valued segments while respecting minNumSegments', () => {
      const wrapper = shallow(<CountdownDisplay {...props} minNumSegments={3} />)
      let segments = wrapper.find(CountdownDisplaySegment);
      expect(segments).toHaveLength(4);
      segments.forEach((segment, i) => expect(segment).toHaveProp({
        unit: UNITS[i+2],
        amount: props[UNITS[i+2]],
      }));

      wrapper.setProps({ minNumSegments: 5 });
      segments = wrapper.find(CountdownDisplaySegment);
      expect(segments).toHaveLength(5);
      segments.forEach((segment, i) => expect(segment).toHaveProp({
        unit: UNITS[i+1],
        amount: props[UNITS[i+1]],
      }));
    });

    it('should render a time element with the correct role and datetime', () => {
      const time = shallow(<CountdownDisplay {...props} />).find('time[role="timer"]');
      expect(time)
        .toExist()
        .toHaveProp('dateTime', 'P1DT5H13S');
    });
  });

  describe('when missing segment values', () => {
    it('should treat missing segment values as 0', () => {
      const segments = shallow(<CountdownDisplay />)
        .find(CountdownDisplaySegment);
      expect(segments.length).toBeGreaterThan(0);
      segments.forEach((segment, i) => expect(segment).toHaveProp({
        amount: 0,
      }));
    });

    it('should render a time element with the correct role and datetime', () => {
      const time = shallow(<CountdownDisplay />).find('time[role="timer"]');
      expect(time)
        .toExist()
        .toHaveProp('dateTime', 'P0D');
    });
  });

  it('should handle minNumSegments values that are too large', () => {
    const segments = shallow(<CountdownDisplay minNumSegments={UNITS.length + 2} />)
      .find(CountdownDisplaySegment);
    expect(segments).toHaveLength(UNITS.length);
  });
});
