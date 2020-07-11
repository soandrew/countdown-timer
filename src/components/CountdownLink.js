import pick from 'lodash/pick';
import React from 'react';
import { Link } from 'react-router-dom';

import CountdownTimer from 'components/CountdownTimer';
import routes from 'static/routes';
import styles from './CountdownLink.module.scss';

const {
  CountdownLink: rootClass,
} = styles;

const CountdownLink = (props) => {
  const query = new URLSearchParams(pick(props, ['iso', 'zone', 'title', 'theme']));
  return (
    <Link to={`${routes.display.path}?${query}`} className={rootClass}>
      <CountdownTimer {...props} />
    </Link>
  );
};

export default CountdownLink;
