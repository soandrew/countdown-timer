import React from 'react';
import { Link } from 'react-router-dom';

import CountdownTimer from 'components/CountdownTimer';
import routes from 'static/routes';
import styles from './CountdownLink.module.scss';

const {
  CountdownLink: rootClass,
} = styles;

const CountdownLink = ({
  iso,
  zone,
  title,
  theme,
  ...rest
}) => {
  const query = new URLSearchParams({ iso, zone, title, theme });
  return (
    <Link to={`${routes.display.path}?${query}`} className={rootClass}>
      <CountdownTimer
        {...{ iso, zone, title, theme }}
        {...rest}
      />
    </Link>
  );
};

export default CountdownLink;
