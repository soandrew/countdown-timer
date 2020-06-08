const of = (amount, unit) => ({
    amount,
    unit,
    toMillis() {
      return this.amount * this.unit.durationInMillis;
    },
});

const isEqual = (duration1, duration2) => {
  if (duration1 === duration2) return true;
  if (duration1 == null || duration2 == null) return false;
  return (
    duration1.amount === duration2.amount
    && duration1.unit === duration2.unit
  );
}

export default {
  of,
  isEqual,
};
