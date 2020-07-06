// Arithmetic
const roundToNearest = (multiple, x) => Math.round(x / multiple) * multiple;
const roundUpToNearest = (multiple, x) => Math.ceil(x / multiple) * multiple;
const roundDownToNearest = (multiple, x) => Math.floor(x / multiple) * multiple;

export {
  roundToNearest,
  roundUpToNearest,
  roundDownToNearest,
};
