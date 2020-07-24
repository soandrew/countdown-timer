import React from 'react';

const THEMES = [
  {
    id: 'light',
    name: 'Light',
    isDark: false,
  },
  {
    id: 'dark',
    name: 'Dark',
    isDark: true,
  },
  {
    id: 'r',
    name: 'Red',
    isDark: true,
  },
  {
    id: 'roy',
    name: 'Red to yellow gradient',
    isDark: false,
  },
  {
    id: 'y',
    name: 'Yellow',
    isDark: false,
  },
  {
    id: 'g',
    name: 'Green',
    isDark: false,
  },
  {
    id: 'b',
    name: 'Blue',
    isDark: false,
  },
  {
    id: 'biv',
    name: 'Blue to purple gradient',
    isDark: true,
  },
  {
    id: 'v',
    name: 'Purple',
    isDark: true,
  },
  {
    id: 'vmr',
    name: 'Purple to red gradient',
    isDark: true,
  },
];

const CountdownThemeContext = React.createContext(THEMES[0]);
CountdownThemeContext.displayName = 'CountdownTheme';

export default CountdownThemeContext;
export { THEMES as themes };
