import { CSSProperties } from 'react';

export interface IPopoverPosition {
  style: CSSProperties;
  className?: string;
}

export interface IPositionFunctionProps {
  anchorRect: ClientRect | DOMRect;
  containerRect: ClientRect | DOMRect;
  contentRect: ClientRect | DOMRect;
  relativeRect: ClientRect;
  cushion: number;
  anchor: Element;
  container: Element;
  content: Element;
}

export interface IPositionFunction {
  (option: IPositionFunctionProps): IPopoverPosition;
}
