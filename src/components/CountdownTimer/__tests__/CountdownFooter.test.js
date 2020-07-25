import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';

import CountdownFooter from '../CountdownFooter';

describe('<CountdownFooter />', () => {
  describe('when end is invalid', () => {
    it('should only render invalid date text', () => {
      const wrapper = shallow(<CountdownFooter end={moment.invalid()} />);
      expect(wrapper)
        .toIncludeText('until Invalid date')
        .not.toIncludeText(' at ')
        .not.toIncludeText(' in ')
        .not.toContainMatchingElement('time');
    });
  });

  describe('when end is valid', () => {
    it('should render a time element with datetime attribute', () => {
      const props = {
        end: moment(),
        location: { city: 'Toronto', country: 'CA' },
      };
      const time = shallow(<CountdownFooter {...props} />).find('time');
      expect(time)
        .toExist()
        .toHaveProp('dateTime', props.end.toISOString(true));
    });
  });

  describe('when end is valid and not midnight', () => {
    it('should render all parts', () => {
      const props = {
        end: moment(),
        location: { city: 'Toronto', country: 'CA' },
      };
      const wrapper = shallow(<CountdownFooter {...props} />);
      expect(wrapper)
        .toIncludeText('until ')
        .not.toIncludeText('Invalid date')
        .toIncludeText(' at ')
        .toIncludeText(' in ');
    });
  });

  describe('when end is valid and midnight', () => {
    it('should render all parts except for time part', () => {
      const props = {
        end: moment().startOf('day'),
        location: { city: 'Toronto', country: 'CA' },
      };
      const wrapper = shallow(<CountdownFooter {...props} />);
      expect(wrapper)
        .toIncludeText('until ')
        .not.toIncludeText('Invalid date')
        .not.toIncludeText(' at ')
        .toIncludeText(' in ');
    });
  });
});
