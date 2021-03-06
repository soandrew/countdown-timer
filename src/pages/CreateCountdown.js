import moment from 'moment-timezone';
import React, { useCallback, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory, useLocation } from 'react-router-dom';

import CountdownForm from 'components/CountdownForm';
import CountdownPreview from 'components/CountdownPreview';
import SEO from 'components/SEO';
import SiteHeader from 'components/SiteHeader';
import routes from 'static/routes';

const roundUpToNearest = (multiple, x) => Math.ceil(x / multiple) * multiple;

const parseFormValues = ({ endDate, endTime, zone, title, theme }, defaultValues) => ({
  iso: `${endDate.replace(/-/g, '')}T${endTime.replace(/:/g, '')}`,
  zone: zone || defaultValues.zone,
  title: title || defaultValues.title,
  theme: theme,
});

const CreateCountdown = ({
  now = moment.tz(moment.tz.guess()),
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
    zone: now.tz() ?? '',
    title: '',
    theme: 'light',
  };
  const [values, setValues] = useState({
    ...initialValues,
    ...location.state,
  });  // Restore state from history or use initial values

  const handleChange = useCallback(({ target: { name, value } }) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    history.replace(location.pathname, values);  // Save state in history
    const query = new URLSearchParams(parseFormValues(values, defaultValues));
    history.push(`${routes.display.path}?${query}`);
  };

  return (
    <>
      <SEO
        title="Create a Countdown Timer"
        description="Create a custom countdown timer to any date and time. Specify a date and time, add a title, and choose a background. Supports timezones."
      />
      <SiteHeader title="Create a custom countdown timer to any date and time" shrink={true} />
      <CountdownPreview
        {...parseFormValues(values, defaultValues)}
        titleLevel={2}
      />
      <Container as="section" fluid className="bg-dark text-white py-5 flex-grow-1">
        <Container className="bg-white text-dark pt-2 pb-3 rounded-lg">
          <CountdownForm
            defaultValues={defaultValues}
            values={values}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            titleLevel={2}
          />
        </Container>
      </Container>
    </>
  );
};

export default CreateCountdown;
