import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from 'static/logo-icon.svg';
import routes from 'static/routes';
import styles from './SiteHeader.module.scss';

const {
  'SiteHeader': rootClass,
  'SiteHeader--shrink': rootClassShrinkModifier,
  'SiteHeader__brand': brandClass,
  'SiteHeader__icon': iconClass,
  'SiteHeader__name': nameClass,
  'SiteHeader__title': titleClass,
} = styles;

const SiteHeader = ({ title, shrink = false }) => {
  return (
    <header className={[rootClass, shrink ? rootClassShrinkModifier : null].join(' ')}>
      <Link to={routes.home.path} className={brandClass}>
        <Logo className={iconClass} />
        <span className={nameClass}>Countdown Timer</span>
      </Link>
      {title && <h1 className={titleClass}>{title}</h1>}
    </header>
  );
};

export default SiteHeader;
