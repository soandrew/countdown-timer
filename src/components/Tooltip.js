import React, { forwardRef, useCallback } from 'react';
import styles from './Tooltip.module.scss';

const rootClass = 'Tooltip';

const Tooltip = ({
  title,
  id,
  theme = 'dark',
  children,
  className,
  ...rest
}, ref) => {
  return (
    <div className={[styles[rootClass], styles[`${rootClass}--${theme}`]].join(' ')}>
      <span
        tabIndex={0}
        aria-describedby={id}
        className={className}
        ref={ref}
        onClick={useCallback(e => e.preventDefault(), [])}
        {...rest}
      >
        {children}
      </span>  
      <div role="tooltip" id={id}>{title}</div>
    </div>
  );
}

export default forwardRef(Tooltip);
