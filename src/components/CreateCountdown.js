import React, { useState } from 'react';
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
    <div className="container">
      <CountdownTimer
        iso={`${endDate}T${endTime}`}
        title={title || CountdownTimer.defaultProps.title}
      />
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
              id="title"
              type="text"
              name="title"
              value={values.title}
              placeholder={CountdownTimer.defaultProps.title}
              onChange={handleChange}
              className="form-control"
          />
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="endDate">Date</label>
            <input
                id="endDate"
                type="date"
                name="endDate"
                value={values.endDate}
                required
                onChange={handleChange}
                className="form-control"
            />
          </div>
          <div className="form-group col">
            <label htmlFor="endTime">Time</label>
            <input
                id="endTime"
                type="time"
                step={60 * 5}
                name="endTime"
                value={values.endTime}
                required
                onChange={handleChange}
                className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateCountdown;
