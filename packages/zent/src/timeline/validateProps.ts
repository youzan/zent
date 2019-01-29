import * as PropTypes from 'prop-types';
import { ReactNode } from 'react';

import { ITimelineProps } from './Timeline';

export function validateProps(
  props: ITimelineProps & { children?: ReactNode },
  ...args: [string, string, string, string]
) {
  if (props.timeline) {
    return PropTypes.array(props, ...args);
  }

  if (props.children) {
    return PropTypes.node(props, ...args);
  }

  return new Error(`one of 'timeline' or 'children' must be set`);
}
