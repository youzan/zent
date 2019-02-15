import cx from 'classnames';

export default function getTextPosition(position) {
  return cx({
    'zent-loading-icon-and-text--bottom': position === 'bottom',
    'zent-loading-icon-and-text--top': position === 'top',
    'zent-loading-icon-and-text--left': position === 'left',
    'zent-loading-icon-and-text--right': position === 'right',
  });
}
