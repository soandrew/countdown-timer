import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import CountdownTimer from 'components/CountdownTimer';
import routes from 'static/routes';
import DisplayCountdown from '../DisplayCountdown';

const mountWithRouter = (ui, location) => {
  return mount(
    <MemoryRouter initialEntries={[location]}>
      {ui}
    </MemoryRouter>
  );
};

describe('<DisplayCountdown />', () => {
  it('should pass query params to countdowm timer', () => {
    const queryParams = {
      iso: '20201025T1330',
      zone: 'America/Vancouver',
      title: 'My Countdown',
      theme: 'g',
    };
    const countdown = mountWithRouter(<DisplayCountdown />, {
      pathname: routes.display.path,
      search: `?${new URLSearchParams(queryParams)}`,
    }).find(CountdownTimer);
    expect(countdown).toHaveProp(queryParams);
  });
});
