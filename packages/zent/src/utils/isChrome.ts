import isBrowser from './isBrowser';

declare var chrome: unknown;
declare var opr: unknown;

const winNav = isBrowser && window.navigator;
const vendorName = winNav && winNav.vendor;
const userAgent = winNav && winNav.userAgent;

const isChromium = isBrowser && typeof chrome !== 'undefined';
const isOpera = isBrowser && typeof opr !== 'undefined';
const isIEedge = userAgent && userAgent.indexOf('Edge') > -1;

const isIOSChrome = !!(userAgent && userAgent.match('CriOS'));
const isDesktopChrome =
  isChromium && vendorName === 'Google Inc.' && !isOpera && !isIEedge;

const isChrome = isIOSChrome || isDesktopChrome;

export default isChrome;
