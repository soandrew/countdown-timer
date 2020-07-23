import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import routes from 'static/routes';
import CreateCountdown from '../CreateCountdown';

expect.extend({
  toHaveTagName(received, expected) {
    const { isNot, utils: { matcherHint, printExpected, printReceived } } = this;
    return {
      pass: received.tagName.toLowerCase() === expected,
      message: () => (
        [
          matcherHint('toHaveTagName', undefined, undefined, this),
          '',
          `Expected the element ${isNot ? 'not to' : 'to'} have tag name: ${printExpected(expected)}`,
          `Received: ${printReceived(received.tagName.toLowerCase())}`,
        ].join('\n')
      ),
    };
  },
});

const renderWithRouter = (ui) => {
  const view = { history: {}, location: {} };
  Object.assign(view, render(
    <MemoryRouter basename={process.env.PUBLIC_URL} initialEntries={[routes.create.path]}>
      <Route exact path={routes.create.path}>{ui}</Route>
      <Route>
        {({ history, location }) => {
          Object.assign(view.history, history);
          Object.assign(view.location, location);
          return null;
        }}
      </Route>
    </MemoryRouter>
  ));
  return view;
};

describe('<CreateCountdown />', () => {
  it('should have the correct document outline', () => {
    const headings = renderWithRouter(<CreateCountdown />).getAllByRole('heading');
    expect(headings).toHaveLength(4);
    expect(headings[0])
      .toHaveTagName('h1')
      .toHaveTextContent(expect.not.blankString());
    expect(headings[1])
      .toHaveTagName('h2')
      .toHaveTextContent('Countdown preview');
    expect(headings[2])
      .toHaveTagName('h3')
      .toHaveTextContent('Countdown Timer');
    expect(headings[3])
      .toHaveTagName('h2')
      .toHaveTextContent('Countdown editor');
  });

  describe('the title field', () => {
    it('should have a default placeholder value matching the default preview title', () => {
      const titleField = renderWithRouter(<CreateCountdown />).getByLabelText(/title/i);
      expect(titleField)
        .toHaveAttribute('placeholder', 'Countdown Timer')
        .not.toHaveValue();
    });

    it('should update the preview title when user types', () => {
      const view = renderWithRouter(<CreateCountdown />);
      const previewTitle = view.getByRole('heading', { name: 'Countdown Timer' });
      const titleField = view.getByLabelText(/title/i);

      const newTitle = 'Hello, World!';
      userEvent.type(titleField, newTitle);

      expect(titleField).toHaveValue(newTitle);
      expect(previewTitle).toHaveTextContent(newTitle);
    });
  });

  describe('the date field', () => {
    it('should update the preview footer when value changes', () => {
      const view = renderWithRouter(<CreateCountdown />);
      const footer = view.getByText(/until.*time/);
      const dateField = view.getByLabelText(/date/i);

      fireEvent.change(dateField, { target: { value: '2020-08-10' } });

      expect(dateField).toHaveValue('2020-08-10');
      expect(footer).toHaveTextContent('August 10, 2020');
    });
  });

  describe('the time field', () => {
    it('should update the preview footer when value changes', () => {
      const view = renderWithRouter(<CreateCountdown />);
      const footer = view.getByText(/until.*time/);
      const timeField = view.getByLabelText(/time(?! zone)/i);

      fireEvent.change(timeField, { target: { value: '09:30' } });

      expect(timeField).toHaveValue('09:30');
      expect(footer).toHaveTextContent('9:30');
    });
  });

  describe('the date and time fields', () => {
    it('should have default values after the current time', () => {
      const view = renderWithRouter(<CreateCountdown />);
      const dateField = view.getByLabelText(/date/i);
      const timeField = view.getByLabelText(/time(?! zone)/i);

      expect(dateField).toHaveValue();
      expect(timeField).toHaveValue();

      expect(moment(`${dateField.value} ${timeField.value}`).isAfter()).toEqual(true);
    });
  });

  describe('the zone field', () => {
    describe('when able to locate user timezone', () => {
      it('should have a default value of the user timezone', () => {
        jest.spyOn(moment.tz, 'guess').mockReturnValue('Asia/Shanghai');
        const zoneField = renderWithRouter(<CreateCountdown />).getByLabelText(/time zone/i);
        expect(zoneField).toHaveValue('Asia/Shanghai');
      });
    });

    describe('when not able to locate user timezone', () => {
      it('should have a default placeholder value of UTC', () => {
        jest.spyOn(moment.tz, 'guess').mockReturnValue(null);
        const zoneField = renderWithRouter(<CreateCountdown />).getByLabelText(/time zone/i);
        expect(zoneField)
          .toHaveAttribute('placeholder', 'UTC')
          .not.toHaveValue();
      });
    });

    it('should update the preview footer when value changes', () => {
      const view = renderWithRouter(<CreateCountdown />);
      const footer = view.getByText(/until.*time/);
      const zoneField = view.getByLabelText(/time zone/i);

      fireEvent.change(zoneField, { target: { value: 'Europe/London' } });

      expect(zoneField).toHaveValue('Europe/London');
      expect(footer).toHaveTextContent('London, United Kingdom');
    });

    it('should prevent user from inputting an unknown timezone', () => {
      jest.spyOn(moment.tz, 'guess').mockReturnValue('Australia/Sydney');
      const view = renderWithRouter(<CreateCountdown />);
      const zoneField = view.getByLabelText(/time zone/i);

      zoneField.focus();
      fireEvent.change(zoneField, { target: { value: 'garbage' } });
      zoneField.blur();

      expect(zoneField).toHaveValue('Australia/Sydney');
    });
  });

  describe('the theme field', () => {
    it('should have a single default value', () => {
      const themeFieldOptions = renderWithRouter(<CreateCountdown />)
        .container
        .ownerDocument
        .getElementsByName('theme');
      expect(Array.from(themeFieldOptions).filter(el => el.checked)).toHaveLength(1);
    });

    it('should update the preview background when value changes', () => {
      const view = renderWithRouter(<CreateCountdown />);
      const countdown = view.getByRole('timer').parentNode;
      const themeFieldBivOption = view.getByLabelText(/blue-indigo-purple/i);

      userEvent.click(themeFieldBivOption);

      expect(themeFieldBivOption).toBeChecked();
      expect(countdown.className).toMatch('--bg-biv');
    });
  });

  describe('the submit button', () => {
    it('should send user to display countdown page with the correct query params', () => {
      const view = renderWithRouter(<CreateCountdown />);
      userEvent.type(view.getByLabelText(/title/i), 'My Countdown');
      fireEvent.change(view.getByLabelText(/date/i), { target: { value: '2020-10-25' } });
      fireEvent.change(view.getByLabelText(/time(?! zone)/i), { target: { value: '13:30' } });
      fireEvent.change(view.getByLabelText(/time zone/i), { target: { value: 'America/Vancouver' } });
      userEvent.click(view.getByLabelText(/green/i));

      userEvent.click(view.getByRole('button', { name: /create.*countdown/i }));

      expect(view.location.pathname).toEqual('/display');
      const query = new URLSearchParams(view.location.search);
      expect(query.get('title')).toEqual('My Countdown');
      expect(query.get('iso')).toEqual('20201025T1330');
      expect(query.get('zone')).toEqual('America/Vancouver');
      expect(query.get('theme')).toEqual('g');
    });
  });

  it('should restore form state when user navigates back after clicking submit button', () => {
    const view = renderWithRouter(<CreateCountdown />);
    userEvent.type(view.getByLabelText(/title/i), 'My Countdown');
    fireEvent.change(view.getByLabelText(/date/i), { target: { value: '2020-10-25' } });
    fireEvent.change(view.getByLabelText(/time(?! zone)/i), { target: { value: '13:30' } });
    fireEvent.change(view.getByLabelText(/time zone/i), { target: { value: 'America/Vancouver' } });
    userEvent.click(view.getByLabelText(/green/i));

    userEvent.click(view.getByRole('button', { name: /create.*countdown/i }));

    expect(view.queryByRole('button', { name: /create.*countdown/i })).not.toBeInTheDocument();

    view.history.goBack();

    expect(view.getByLabelText(/date/i)).toHaveValue('2020-10-25');
    expect(view.getByLabelText(/time(?! zone)/i)).toHaveValue('13:30');
    expect(view.getByLabelText(/time zone/i)).toHaveValue('America/Vancouver');
    expect(view.getByLabelText(/green/i)).toBeChecked();
  });
});
