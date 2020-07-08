import { window } from 'browser-monads';

const WINDOWS_REGEX = /^win/i;

const isWindows = () => WINDOWS_REGEX.test(window.navigator.platform);

export {
  isWindows,
};
