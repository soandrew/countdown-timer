const max = (...arr) => arr.reduce((acc, cur) => Math.max(acc, cur));
const min = (...arr) => arr.reduce((acc, cur) => Math.min(acc, cur));
const prod = (...arr) => arr.reduce((acc, cur) => acc * cur, 1);
const sum = (...arr) => arr.reduce((acc, cur) => acc + cur, 0);

export {
  max,
  min,
  prod,
  sum,
};
