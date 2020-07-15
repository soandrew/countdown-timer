import { shallow } from 'enzyme';
import React from 'react';

import CountdownDisplaySegment from '../CountdownDisplaySegment';

describe('<CountdownDisplaySegment />', () => {
  it('should correctly pad amount and switch between plural and singular unit', () => {
    const baseProps = {
      unit: 'years',
      numDigits: 3,
    };
    const wrapper = shallow(<CountdownDisplaySegment {...baseProps} amount={3} />);
    expect(wrapper).toHaveText('003 years');
    
    wrapper.setProps({ amount: 2 });
    expect(wrapper).toHaveText('002 years');

    wrapper.setProps({ amount: 1 });
    expect(wrapper).toHaveText('001 year');

    wrapper.setProps({ amount: 0 });
    expect(wrapper).toHaveText('000 years');
  });
});
