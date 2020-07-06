const REGIONAL_INDICATOR_SYMBOL_OFFSET = (
  '🇦'.codePointAt()  // U+1F1E6 REGIONAL INDICATOR SYMBOL LETTER A
  -
  'A'.codePointAt()  // U+0041 LATIN CAPITAL LETTER A
);

const ALPHABETICAL_REGEX = /^[A-Za-z]*$/;

const isAlphabetical = (str) => ALPHABETICAL_REGEX.test(str);

const toRegionalIndicatorSymbol = (str) => {
  const chars = [...str].map(char => {
    return isAlphabetical(char)
      ? char.toUpperCase().codePointAt() + REGIONAL_INDICATOR_SYMBOL_OFFSET
      : char.codePointAt();
  });
  return String.fromCodePoint(...chars);
};

export {
  isAlphabetical,
  toRegionalIndicatorSymbol,
};
