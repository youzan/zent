import { CSSProperties } from 'react';

export interface IPositionCalculatorOptions<
  Anchor extends Element,
  Content extends Element
> {
  anchorRect: ClientRect | DOMRect;
  contentRect: ClientRect | DOMRect;
  positionedParentRect: ClientRect | DOMRect;
  /**
   * Relative rect of anchor to content's position parent
   */
  relativeRect: ClientRect;
  cushion: number;
}

export interface IPositionProps {
  style?: CSSProperties;
  className?: string;
  name: string;
}

export interface IPositionCalculator<
  Anchor extends Element,
  Content extends Element
> {
  (anchor: IPositionCalculatorOptions<Anchor, Content>): IPositionProps;
}

export const INVISIBLE_POSITION: IPositionProps = {
  name: 'invisible',
  style: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    zIndex: -10,
  },
};

export function invisible(): IPositionProps {
  return INVISIBLE_POSITION;
}

export function rightCenter<Anchor extends Element, Content extends Element>({
  cushion,
  contentRect,
  relativeRect,
}: IPositionCalculatorOptions<Anchor, Content>): IPositionProps {
  const x = relativeRect.right + cushion;
  const middle = (relativeRect.top + relativeRect.bottom) / 2;
  const y = middle - contentRect.height / 2;
  const style: CSSProperties = {
    position: 'absolute',
    left: Math.round(x) + cushion,
    top: Math.round(y),
  };
  return {
    name: 'top-center',
    style,
    className: 'zent-popup-right zent-popup-vertical-center',
  };
}
