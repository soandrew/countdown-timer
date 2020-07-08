import countries from 'static/countries';
import { isWindows } from 'utils/matchers';
import { toRegionalIndicatorSymbol } from 'utils/string';

const SPACE = '\u2004';  // U+2004 THREE-PER-EM SPACE

const formatLocation = ({ city, country: countryCode }) => {
  const flag = toRegionalIndicatorSymbol(countryCode);
  const country = countries[countryCode];
  return `${!isWindows() ? `${flag}${SPACE}` : ''}${city}, ${country}`;
};

const compareLocation = (a, b) => {
  return countries[a.country].localeCompare(countries[b.country])
    || a.city.localeCompare(b.city);
};

export {
  compareLocation,
  formatLocation,
};
