import countries from 'static/countries';

const ALPHABETICAL_REGEX = /^[A-Za-z]*$/;

const isAlphabetical = (str) => ALPHABETICAL_REGEX.test(str);


const WINDOWS_REGEX = /^win/i;

const isWindows = () => WINDOWS_REGEX.test(window?.navigator.platform);


const REGIONAL_INDICATOR_SYMBOL_OFFSET = (
  '🇦'.codePointAt()  // U+1F1E6 REGIONAL INDICATOR SYMBOL LETTER A
  -
  'A'.codePointAt()  // U+0041 LATIN CAPITAL LETTER A
);

const toRegionalIndicatorSymbol = (str) => {
  const chars = [...str].map(char => {
    return isAlphabetical(char)
      ? char.toUpperCase().codePointAt() + REGIONAL_INDICATOR_SYMBOL_OFFSET
      : char.codePointAt();
  });
  return String.fromCodePoint(...chars);
};


const SPACE = '\u2004';  // U+2004 THREE-PER-EM SPACE

const formatLocation = (location) => {
  if (!location) return '';
  const { city, country: countryCode } = location;
  const flag = toRegionalIndicatorSymbol(countryCode);
  const country = countries[countryCode];
  return `${!isWindows() ? `${flag}${SPACE}` : ''}${city}, ${country}`;
};


const compareLocation = (a, b) => {
  if (a === b) return 0;
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return countries[a.country].localeCompare(countries[b.country])
    || a.city.localeCompare(b.city);
};

export {
  compareLocation,
  formatLocation,
};
