// Arithmatic
const roundToNearest = (multiple, x) => Math.round(x / multiple) * multiple;
const roundUpToNearest = (multiple, x) => Math.ceil(x / multiple) * multiple;
const roundDownToNearest = (multiple, x) => Math.floor(x / multiple) * multiple;

// Statistics
const max = (...arr) => arr.reduce((acc, cur) => Math.max(acc, cur));
const min = (...arr) => arr.reduce((acc, cur) => Math.min(acc, cur));
const prod = (...arr) => arr.reduce((acc, cur) => acc * cur, 1);
const sum = (...arr) => arr.reduce((acc, cur) => acc + cur, 0);

export {
  roundToNearest,
  roundUpToNearest,
  roundDownToNearest,
  max,
  min,
  prod,
  sum,
};
