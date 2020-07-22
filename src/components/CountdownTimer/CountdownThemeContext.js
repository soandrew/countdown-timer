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
    name: 'Red-Orange-Yellow',
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
    name: 'Blue-Indigo-Purple',
    isDark: true,
  },
  {
    id: 'v',
    name: 'Purple',
    isDark: true,
  },
  {
    id: 'vmr',
    name: 'Purple-Pink-Red',
    isDark: true,
  },
];

const CountdownThemeContext = React.createContext(THEMES[0]);
CountdownThemeContext.displayName = 'CountdownTheme';

export default CountdownThemeContext;
export { THEMES as themes };
