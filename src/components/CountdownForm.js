import _ from 'lodash/core';
import moment from 'moment-timezone';
import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { themes } from 'components/CountdownTimer';
import locationForZone from 'static/locationForZone';
import { compareLocation, formatLocation } from 'utils/location';
import styles from './CountdownForm.module.scss';

const {
  CountdownForm: rootClass,
} = styles;

const FIVE_MINUTES = moment.duration(5, 'minutes');

const ZONES = _.chain(moment.tz.countries())
  .map(country => moment.tz.zonesForCountry(country))
  .flatten()
  .thru(arr => [...new Set(arr)])  // Make unique
  .map(zone => ({
    name: zone,
    location: locationForZone[zone],
  }))
  .tap(arr => arr.sort((a, b) => compareLocation(a.location, b.location)))
  .value();

const isListInputValid = (() => {
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
  values: { endDate, endTime, zone, title, theme },
  handleSubmit,
  handleChange,
  titleLevel,
}) => {
  const Heading = `h${titleLevel}`;
  return (
    <Form autoComplete="off" onSubmit={handleSubmit} className={rootClass}>
      <Heading className="sr-only">Countdown editor</Heading>
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
          onChange={useCallback(e => isListInputValid(e) && handleChange(e), [handleChange])}
          onFocus={useCallback(({ target }) => {
            if (target.value) [target.value, target.placeholder] = ['', target.value]
          }, [])}
          onBlur={useCallback(({ target }) => target.value = zone, [zone])}
        />
        <datalist id="zone-list">
          {ZONES.map(({ name, location, offset }) => {
            return (
              <option key={name} value={name}>{formatLocation(location)}</option>
            );
          })}
        </datalist>
        <Form.Text id="zone-help" className="text-muted">
          Start typing a city or country
        </Form.Text>
      </Form.Group>
      <Form.Group as="fieldset">
        <Form.Label as="legend">Background colour</Form.Label>
        {themes.map(({ id, name }) => (
          <Form.Check key={id} id={id} inline>
            <Form.Check.Input
              type="radio"
              name="theme"
              value={id}
              checked={theme === id}
              onChange={handleChange}
            />
            <Form.Check.Label className="sr-only">{name}</Form.Check.Label>
          </Form.Check>
        ))}
      </Form.Group>
      <Button type="submit" variant="dark" block className="p-3">
        Create your countdown
      </Button>
    </Form>
  );
};

export default CountdownForm;
