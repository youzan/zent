import isEqual from 'lodash-es/isEqual';
import { IPopoverPosition } from '../position-function';

export default function isEqualPlacement(
  a: IPopoverPosition,
  b: IPopoverPosition
) {
  return (
    a && b && a.name === b.name && isEqual(a.getCSSStyle(), b.getCSSStyle())
  );
}
