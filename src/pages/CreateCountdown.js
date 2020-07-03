import moment from 'moment-timezone';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory, useLocation } from 'react-router-dom';

import { roundUpToNearest } from 'utils/math';
import CreateCountdownForm from 'components/CreateCountdownForm';
import PreviewCountdown from 'components/PreviewCountdown';
import SiteHeader from 'components/SiteHeader';
import routes from 'static/routes';

const CreateCountdown = ({
  now = moment(),
  timeZone = moment.tz.guess(),
}) => {
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
    zone: timeZone || '',
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
      <SiteHeader title="Create a custom countdown timer to any date" />
      <PreviewCountdown
        defaultValues={defaultValues}
        values={values}
        titleLevel={2}
      />
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
