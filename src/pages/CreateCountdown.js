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
import routes from 'static/routes';
import styles from './CreateCountdown.module.scss';

const {
  CreateCountdownHeader: headerClass,
  CreateCountdownHeader__text: headerTextClass,
  CreateCountdownPreview: previewClass,
  CreateCountdownPreview__title: previewTitleClass,
  CreateCountdownForm: formClass,
} = styles;

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

const CreateCountdownPreview = ({
  defaultValues,
  values: { endDate, endTime, zone, title },
}) => {
  return (
    <div className={previewClass}>
      <h2 className={previewTitleClass}>Preview</h2>
      <CountdownTimer
        iso={`${endDate}T${endTime}`}
        zone={zone || defaultValues.zone}
        title={title || defaultValues.title}
        titleLevel={3}
      />
    </div>
  );
};

const CreateCountdownForm = ({
  defaultValues,
  values: { endDate, endTime, zone, title },
  handleSubmit,
  handleChange,
}) => {
  return (
    <Form autoComplete="off" onSubmit={handleSubmit} className={formClass}>
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
  );
};

const CreateCountdown = ({ now = moment() }) => {
  const location = useLocation();
  const history = useHistory();
  const defaultValues = {
    zone: 'UTC',
    title: 'Countdown Timer',
  };
  const initialEnd = moment(now).minutes(roundUpToNearest(10, now.minutes() + 1));
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

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.replace(location.pathname, values);  // Save state in history
    const { endDate, endTime, zone, title } = values;
    const query = new URLSearchParams({
      iso: moment(`${endDate}T${endTime}`).format('YYYYMMDDTHHmm'),
      zone: zone || defaultValues.zone,
      title: title || defaultValues.title,
    });
    history.push(`${routes.display.path}?${query}`);
  }

  return (
    <>
      <header className={headerClass}>
        <h1 className={headerTextClass}>Create a custom countdown timer to any date</h1>
      </header>
      <CreateCountdownPreview defaultValues={defaultValues} values={values} />
      <Container fluid className="bg-dark text-white py-5 flex-grow-1">
        <h2 className="sr-only">Editor</h2>
        <Container className="bg-white text-dark pt-2 pb-3 rounded">
          <CreateCountdownForm
            defaultValues={defaultValues}
            values={values}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </Container>
      </Container>
    </>
  );
};

export default CreateCountdown;
