import { CSSProperties } from 'react';

export interface IPositionCalculatorOptions<
  Anchor extends Element,
  Content extends Element
> {
  anchor: Anchor;
  content: Content;
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
    top: '-9999px',
    left: '-9999px',
  },
};

export function invisible(): IPositionProps {
  return INVISIBLE_POSITION;
}

export function rightCenter<Anchor extends Element, Content extends Element>({
  anchor,
  cushion = 10,
  content,
}: IPositionCalculatorOptions<Anchor, Content>): IPositionProps {
  const { right, top, bottom } = anchor.getBoundingClientRect();
  const x = right;
  const middle = (top + bottom) / 2;
  const y = middle - content.getBoundingClientRect().height / 2;
  const style: CSSProperties = {
    position: 'absolute',
    left: `${Math.round(x)}px`,
    top: `${Math.round(y)}px`,
    paddingLeft: `${cushion}px`,
  };
  return {
    name: 'top-center',
    style,
    className: 'zent-popup-right zent-popup-center',
  };
}
