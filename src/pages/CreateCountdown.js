import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash/core';
import moment from 'moment-timezone';
import CountdownTimer from 'components/CountdownTimer';
import { roundUpToNearest } from 'math';
import countries from 'static/countries';
import locationForZone from 'static/locationForZone';

const FIVE_MINUTES = moment.duration(5, 'minutes');

const ZONES = _.chain(moment.tz.countries())
  .map(country => moment.tz.zonesForCountry(country))
  .flatten()
  .thru(arr => [...new Set(arr)])
  .map(zone => {
    const { city, country } = locationForZone[zone];
    return {
      name: zone,
      city: city,
      country: countries[country],
    };
  })
  .tap(arr => arr.sort((a, b) => {
    return a.country.localeCompare(b.country) || a.city.localeCompare(b.city);
  }))
  .value();

const isListInputValid = (function () {
  const memo = Object.create(null);
  return ({ target: { list, value } }) => {
    if (list !== memo.list) {
      memo.values = new Set(Array.from(list.options).map(el => el.value));
      memo.list = list;
    }
    return memo.values.has(value);
  };
})();

const CreateCountdown = ({ now = moment() }) => {
  const location = useLocation();
  const history = useHistory();
  const defaultValues = {
    zone: 'UTC',
    title: 'Countdown Timer',
  };
  const initialEnd = moment(now).minutes(roundUpToNearest(5, now.minutes() + 1));
  const initialValues = {
    endDate: initialEnd.format(moment.HTML5_FMT.DATE),  // YYYY-MM-DD
    endTime: initialEnd.format(moment.HTML5_FMT.TIME),  // HH:mm
    zone: moment.tz.guess() || '',
    title: '',
  };
  const [values, setValues] = useState({
    ...initialValues,
    ...location.state,
  });  // Restore state from history or use initial values
  const { endDate, endTime, zone, title } = values;

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.replace(location.pathname, values);  // Save state in history
    const query = new URLSearchParams({
      iso: moment(`${endDate}T${endTime}`).format('YYYYMMDDTHHmm'),
      zone: zone || defaultValues.zone,
      title: title || defaultValues.title,
    });
    history.push(`/display?${query}`);
  }

  return (
    <Container>
      <CountdownTimer
        iso={`${endDate}T${endTime}`}
        zone={zone || defaultValues.zone}
        title={title || defaultValues.title}
      />
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder={defaultValues.title}
              onChange={handleChange}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="endDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
                type="date"
                name="endDate"
                value={endDate}
                required
                onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="endTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
                type="time"
                step={FIVE_MINUTES.asSeconds()}
                name="endTime"
                value={endTime}
                required
                onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="zone">
          <Form.Label>Time Zone</Form.Label>
          <Form.Control
            type="text"
            name="zone"
            defaultValue={zone}
            list="zone-list"
            placeholder={zone || defaultValues.zone}
            aria-describedby="zone-help"
            onChange={e => isListInputValid(e) && handleChange(e)}
            onFocus={({ target }) => {
              if (target.value) [target.value, target.placeholder] = ['', target.value]}
            }
            onBlur={({ target }) => target.value = zone}
          />
          <datalist id="zone-list">
            {ZONES.map(({name, city, country}) => (
              <option key={name} value={name}>{`${city}, ${country}`}</option>
            ))}
          </datalist>
          <Form.Text id="zone-help" className="text-muted">
            Start typing a city or country
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="primary" block>Create your countdown</Button>
      </Form>
    </Container>
  );
};

export default CreateCountdown;
