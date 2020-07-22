import React from 'react';

const CountdownThemeContext = React.createContext({ name: 'light', isDark: false });
CountdownThemeContext.displayName = 'CountdownTheme';

export default CountdownThemeContext;
