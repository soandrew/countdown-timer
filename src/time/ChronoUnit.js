import { prod } from 'math';

const MILLIS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_MONTH = 365.2425 / 12;
const MONTHS_PER_YEAR = 12;

const SECONDS = {
  name: 'second',
  namePlural: 'seconds',
  durationInMillis: MILLIS_PER_SECOND,
};

const MINUTES = {
  name: 'minute',
  namePlural: 'minutes',
  durationInMillis: prod(MILLIS_PER_SECOND, SECONDS_PER_MINUTE),
};

const HOURS = {
  name: 'hour',
  namePlural: 'hours',
  durationInMillis: prod(MILLIS_PER_SECOND, SECONDS_PER_MINUTE, MINUTES_PER_HOUR),
};

const DAYS = {
  name: 'day',
  namePlural: 'days',
  durationInMillis: prod(MILLIS_PER_SECOND, SECONDS_PER_MINUTE, MINUTES_PER_HOUR, HOURS_PER_DAY),
};

const MONTHS = {
  name: 'month',
  namePlural: 'months',
  durationInMillis: prod(MILLIS_PER_SECOND, SECONDS_PER_MINUTE, MINUTES_PER_HOUR, HOURS_PER_DAY, DAYS_PER_MONTH),
};

const YEARS = {
  name: 'year',
  namePlural: 'years',
  durationInMillis: prod(MILLIS_PER_SECOND, SECONDS_PER_MINUTE, MINUTES_PER_HOUR, HOURS_PER_DAY, DAYS_PER_MONTH, MONTHS_PER_YEAR),
};

export { SECONDS, MINUTES, HOURS, DAYS, MONTHS, YEARS };
