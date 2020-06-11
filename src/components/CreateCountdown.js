import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import CountdownTimer from 'components/CountdownTimer';
import { roundUpToNearest } from 'math';

const CreateCountdown = ({ now = moment() }) => {
  const location = useLocation();
  const history = useHistory();
  const defaultEnd = moment(now).minutes(roundUpToNearest(5, now.minutes()));
  const [values, setValues] = useState(Object.assign({
    endDate: defaultEnd.format(moment.HTML5_FMT.DATE),  // YYYY-MM-DD
    endTime: defaultEnd.format(moment.HTML5_FMT.TIME),  // HH:mm
    title: '',
  }, location.state));  // Restore state from history or use defaults
  const { endDate, endTime, title } = values;

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.replace(location.pathname, values);  // Save state in history
    const iso = moment(`${endDate} ${endTime}`).format('YYYYMMDDTHHmm');
    const search = new URLSearchParams({ iso, title });
    history.push(`/display?${search}`);
  }

  return (
    <Container>
      <CountdownTimer
        iso={`${endDate}T${endTime}`}
        title={title || CountdownTimer.defaultProps.title}
      />
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder={CountdownTimer.defaultProps.title}
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
                step={60 * 5}
                name="endTime"
                value={values.endTime}
                required
                onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Button type="submit" variant="primary" block>Create your countdown</Button>
      </Form>
    </Container>
  );
};

export default CreateCountdown;
