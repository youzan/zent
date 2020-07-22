import { CSSProperties } from 'react';

export interface IPopoverPosition {
  style: CSSProperties;
  className?: string;
}

export interface IPositionFunctionProps {
  /**
   * position relative to positioned parent, use this to calculate content position
   */
  relativeRect: ClientRect;

  /**
   * anchor bounding box
   */
  anchorRect: ClientRect | DOMRect;

  /**
   * positioned parent bounding box
   */
  containerRect: ClientRect | DOMRect;

  /**
   * content bounding box
   */
  contentRect: ClientRect | DOMRect;

  cushion: number;

  /**
   * anchor node
   */
  anchor: Element;

  /**
   * positioned parent node
   */
  container: Element;

  /**
   * content node
   */
  content: Element;
}

export interface IPositionFunction {
  (option: IPositionFunctionProps): IPopoverPosition;
}
