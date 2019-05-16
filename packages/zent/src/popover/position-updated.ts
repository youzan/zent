import Popover from './Popover';

export function positionUpdated(popover: Popover) {
  const { onPositionReady, onPositionUpdated } = popover.props;
  onPositionUpdated && onPositionUpdated();
  if (popover.isPositionReady === false) {
    popover.isPositionReady = true;
    onPositionReady && onPositionReady();
  }
}
