import React, { forwardRef, useCallback } from 'react';
import styles from './Tooltip.module.scss';

const {
  Tooltip: rootClass,
} = styles;

const Tooltip = ({
  title,
  id,
  theme = 'dark',
  children,
  className,
  ...rest
}, ref) => {
  const rootClassThemeModifier = styles[`Tooltip--${theme}`];
  return (
    <div className={`${rootClass} ${rootClassThemeModifier}`}>
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
