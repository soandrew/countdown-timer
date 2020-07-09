import React, { forwardRef } from 'react';
import styles from './AbbrWithTooltip.module.scss';

const {
  AbbrWithTooltip: rootClass,
} = styles;

const AbbrWithTooltip = ({
  title,
  children,
  className,
  ...rest
}, ref) => {
  return (
    <abbr
      data-original-title={title}
      tabIndex={0}
      className={`${rootClass} ${className}`}
      ref={ref}
      {...rest}
    >
      {children}
    </abbr>
  );
}

export default forwardRef(AbbrWithTooltip);
