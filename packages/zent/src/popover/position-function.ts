import { CSSProperties } from 'react';

export interface IPopoverPosition {
  getCSSStyle: () => CSSProperties;
  name: string;
}

export type PositionFunctionImpl = (
  anchorBoundingBox: ClientRect,
  containerBoundingBox: ClientRect,
  contentDimension: { width: number; height: number },
  options: {
    cushion: number;
    anchor: Element;
    container: Element;
    anchorBoundingBoxViewport: any;
    containerBoundingBoxViewport: any;
  }
) => IPopoverPosition;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

export type PositionFunction = (
  prefix: string,
  ...args: ArgumentTypes<PositionFunctionImpl>
) => IPopoverPosition;
