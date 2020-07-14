import React, { forwardRef, useCallback } from 'react';
import styles from './AbbrWithTooltip.module.scss';

const {
  AbbrWithTooltip: rootClass,
} = styles;

const AbbrWithTooltip = ({
  title,
  theme,
  children,
  className,
  ...rest
}, ref) => {
  const rootClassThemeModifier = styles[`AbbrWithTooltip--theme-${theme}`];
  return (
    <abbr
      title={title}
      data-original-title={title}
      tabIndex={0}
      onMouseEnter={useCallback(({ target }) => target.removeAttribute('title') ,[])}
      onMouseLeave={useCallback(({ target }) => target.title = target.dataset.originalTitle, [])}
      onClick={useCallback(e => e.preventDefault(), [])}
      className={`${rootClass} ${rootClassThemeModifier} ${className}`}
      ref={ref}
      {...rest}
    >
      {children}
    </abbr>
  );
}

export default forwardRef(AbbrWithTooltip);
