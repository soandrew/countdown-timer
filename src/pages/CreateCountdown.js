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
    return (a.country.localeCompare(b.country)
      || a.city.localeCompare(b.city)
    );
  }))
  .value();

const CreateCountdown = ({ now = moment() }) => {
  const location = useLocation();
  const history = useHistory();
  const defaultTitle = 'Countdown Timer';
  const defaultZone = 'UTC';
  const defaultEnd = moment(now).minutes(roundUpToNearest(5, now.minutes()));
  const [values, setValues] = useState(Object.assign({
    endDate: defaultEnd.format(moment.HTML5_FMT.DATE),  // YYYY-MM-DD
    endTime: defaultEnd.format(moment.HTML5_FMT.TIME),  // HH:mm
    zone: moment.tz.guess() || defaultZone,
    title: defaultTitle,
  }, location.state));  // Restore state from history or use defaults
  const { endDate, endTime, zone, title } = values;

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.replace(location.pathname, values);  // Save state in history
    const iso = moment(`${endDate}T${endTime}`).format('YYYYMMDDTHHmm');
    history.push(`/display?${new URLSearchParams({ iso, zone, title })}`);
  }

  return (
    <Container>
      <CountdownTimer
        iso={`${endDate}T${endTime}`}
        zone={zone || defaultZone}
        title={title || defaultTitle}
      />
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
              type="text"
              name="title"
              value={title !== defaultTitle ? title : ''}
              placeholder={defaultTitle}
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
            value={zone !== defaultZone ? zone : ''}
            placeholder={defaultZone}
            list="zone-list"
            aria-describedby="zone-help"
            onChange={handleChange}
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
