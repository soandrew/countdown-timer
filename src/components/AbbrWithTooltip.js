import React, { forwardRef } from 'react';
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
      data-original-title={title}
      tabIndex={0}
      className={`${rootClass} ${rootClassThemeModifier} ${className}`}
      ref={ref}
      {...rest}
    >
      {children}
    </abbr>
  );
}

export default forwardRef(AbbrWithTooltip);
