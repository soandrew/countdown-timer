import _ from 'lodash/core';
import moment from 'moment-timezone';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import countries from 'static/countries';
import locationForZone from 'static/locationForZone';
import { toRegionalIndicatorSymbol } from 'utils/string';

const FIVE_MINUTES = moment.duration(5, 'minutes');

const SPACE = '⠀';  // U+2800 BRAILLE PATTERN BLANK

const ZONES = _.chain(moment.tz.countries())
  .map(country => moment.tz.zonesForCountry(country))
  .flatten()
  .thru(arr => [...new Set(arr)])
  .map(zone => {
    const { city, country: countryCode } = locationForZone[zone];
    return {
      name: zone,
      city: city,
      country: countries[countryCode],
      flag: toRegionalIndicatorSymbol(countryCode),
    };
  })
  .tap(arr => arr.sort((a, b) => (
    a.country.localeCompare(b.country) || a.city.localeCompare(b.city)
  )))
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

const CountdownForm = ({
  defaultValues,
  values: { endDate, endTime, zone, title },
  handleSubmit,
  handleChange,
}) => {
  return (
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
        <Form.Label>Time zone</Form.Label>
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
          {ZONES.map(({ name, city, country, flag }) => (
            <option key={name} value={name}>
              {`${flag}${SPACE}${city}, ${country}`}
            </option>
          ))}
        </datalist>
        <Form.Text id="zone-help" className="text-muted">
          Start typing a city or country
        </Form.Text>
      </Form.Group>
      <Button type="submit" variant="dark" block className="p-3">
        Create your countdown
      </Button>
    </Form>
  );
};

export default CountdownForm;
