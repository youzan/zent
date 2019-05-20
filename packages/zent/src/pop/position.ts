import camelCase from 'camelcase';
import { Omit } from 'utility-types';

import Popover, {
  IPositionFunction,
  IPopoverPosition,
  IPositionFunctionProps,
} from '../popover';

const { Position } = Popover;

export const POSITIONS = [
  'left-top',
  'left-center',
  'left-bottom',
  'right-top',
  'right-center',
  'right-bottom',
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'auto-bottom-center',
  'auto-bottom-left',
  'auto-bottom-right',
  'auto-top-center',
  'auto-top-left',
  'auto-top-right',
] as const;

export type PopPositions = typeof POSITIONS[number];

type PopoverPositions = keyof Omit<typeof Position, 'INVISIBLE_POSITION'>;

const POSITION_MAP = {} as Record<PopPositions, PopoverPositions>;

for (let i = 0; i < POSITIONS.length; i += 1) {
  const name = POSITIONS[i];
  const pascal = camelCase(name, {
    pascalCase: true,
  }) as PopoverPositions;
  POSITION_MAP[name] = pascal;
}

// FIXME: these values and css variables in pop.scss are interrelated
const ARROW_OFFSET_H = 15;
const ARROW_OFFSET_V = 9;

/**
 * 4√2
 */
const ARROW_WIDTH_HALF = 5.657;

interface IFixUpFunction {
  (position: IPopoverPosition, props: IPositionFunctionProps): IPopoverPosition;
}

const FIX_UP_FUNCTIONS: Record<string, IFixUpFunction> = {
  'left-top'(position: IPopoverPosition, props: IPositionFunctionProps) {
    const { style } = position;
    if (typeof style.top === 'number') {
      style.top +=
        props.anchorRect.height / 2 - ARROW_OFFSET_V - ARROW_WIDTH_HALF;
    }
    return position;
  },
  'left-bottom'(position: IPopoverPosition, props: IPositionFunctionProps) {
    const { style } = position;
    if (typeof style.top === 'number') {
      style.top -=
        props.anchorRect.height / 2 - ARROW_OFFSET_V - ARROW_WIDTH_HALF;
    }
    return position;
  },
  'right-top'(position: IPopoverPosition, props: IPositionFunctionProps) {
    const { style } = position;
    if (typeof style.top === 'number') {
      style.top +=
        props.anchorRect.height / 2 - ARROW_OFFSET_V - ARROW_WIDTH_HALF;
    }
    return position;
  },
  'right-bottom'(position: IPopoverPosition, props: IPositionFunctionProps) {
    const { style } = position;
    if (typeof style.top === 'number') {
      style.top -=
        props.anchorRect.height / 2 - ARROW_OFFSET_V - ARROW_WIDTH_HALF;
    }
    return position;
  },
  'top-left'(position: IPopoverPosition, props: IPositionFunctionProps) {
    const { style } = position;
    if (typeof style.left === 'number') {
      style.left +=
        props.anchorRect.width / 2 - ARROW_OFFSET_H - ARROW_WIDTH_HALF;
    }
    return position;
  },
  'top-right'(position: IPopoverPosition, props: IPositionFunctionProps) {
    const { style } = position;
    if (typeof style.left === 'number') {
      style.left -=
        props.anchorRect.width / 2 - ARROW_OFFSET_H - ARROW_WIDTH_HALF;
    }
    return position;
  },
  'bottom-left'(position: IPopoverPosition, props: IPositionFunctionProps) {
    const { style } = position;
    if (typeof style.left === 'number') {
      style.left +=
        props.anchorRect.width / 2 - ARROW_OFFSET_H - ARROW_WIDTH_HALF;
    }
    return position;
  },
  'bottom-right'(position: IPopoverPosition, props: IPositionFunctionProps) {
    const { style } = position;
    if (typeof style.left === 'number') {
      style.left -=
        props.anchorRect.width / 2 - ARROW_OFFSET_H - ARROW_WIDTH_HALF;
    }
    return position;
  },
};

function withFixUp(
  props: IPositionFunctionProps,
  pos: IPositionFunction,
  position: PopPositions
) {
  const p = pos(props);
  if (!POSITION_MAP[position]) {
    return p;
  }
  const name = p.className && p.className.substring(22);
  console.log(name);
  const fix = name && FIX_UP_FUNCTIONS[name];
  if (fix) {
    return fix(p, props);
  }
  return p;
}

export default function getPosition(
  position: PopPositions | IPositionFunction,
  centerArrow?: boolean
): IPositionFunction {
  if (typeof position === 'function') {
    return position;
  }

  let positionName = POSITION_MAP[position];
  let pos: IPositionFunction = Position[positionName];

  // Choose a fallback in case position is invalid
  if (!pos) {
    pos = Position.TopCenter;
    positionName = 'TopCenter';
  }

  if (centerArrow) {
    return props => withFixUp(props, pos, position);
  }

  return pos;
}
