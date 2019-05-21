import * as React from 'react';

import { getContext } from '../PopoverContext';
import Trigger, { IPopoverTriggerProps, IIsOutside } from './Trigger';
import { isElement } from 'react-is';
// import { findDOMNode } from 'react-dom';

// interface IDot {
//   x: number;
//   y: number;
// }

// interface ILine {
//   a: IDot;
//   b: IDot;
// }

// interface IRect {
//   a: IDot;
//   b: IDot;
//   c: IDot;
//   d: IDot;
// }

// function isUpSide(k: number, b: number, dot: IDot) {
//   return dot.x * k + b < dot.y;
// }

// function isLeft(x: number, dot: IDot) {
//   return dot.x < x;
// }

// function isLineIntersectRect(line: ILine, rect: IRect): boolean {
//   let p = 0;
//   if (line.a.x === line.b.x) {
//     const { x } = line.a;
//     if (isLeft(x, rect.a)) {
//       p |= 0b0001;
//     }
//     if (isLeft(x, rect.b)) {
//       p |= 0b0010;
//     }
//     if (isLeft(x, rect.c)) {
//       p |= 0b0100;
//     }
//     if (isLeft(x, rect.d)) {
//       p |= 0b1000;
//     }
//   } else {
//     /**
//      * y = kx + b
//      */
//     const k = (line.b.y - line.a.y) / (line.b.x - line.a.x);
//     const b = line.a.y - k * line.a.x;
//     if (isUpSide(k, b, rect.a)) {
//       p |= 0b0001;
//     }
//     if (isUpSide(k, b, rect.b)) {
//       p |= 0b0010;
//     }
//     if (isUpSide(k, b, rect.c)) {
//       p |= 0b0100;
//     }
//     if (isUpSide(k, b, rect.d)) {
//       p |= 0b1000;
//     }
//   }
//   return !(p === 0b0000 || p === 0b1111);
// }

// function boundingClientRectToRect({
//   left,
//   top,
//   width,
//   height,
// }: ClientRect | DOMRect) {
//   return {
//     a: {
//       x: left,
//       y: top,
//     },
//     b: {
//       x: left + width,
//       y: top,
//     },
//     c: {
//       x: left,
//       y: top + height,
//     },
//     d: {
//       x: left + width,
//       y: top + height,
//     },
//   };
// }

/**
 * TODO: Mouse Move algorithm for better experience
 */
class MouseHandler {
  constructor(
    public showDelay: number,
    public hideDelay: number,
    private readonly trigger: PopoverHoverTrigger<any>
  ) {}

  nextMouseIn: boolean | null = null;
  isMouseIn = false;
  timer: number | null = null;

  onMouseEnter() {
    if (this.timer !== null) {
      if (this.nextMouseIn) {
        return;
      }
      clearTimeout(this.timer);
      this.timer = null;
      this.nextMouseIn = null;
    } else if (this.showDelay === 0) {
      this.isMouseIn = true;
      this.trigger.open();
    } else {
      this.nextMouseIn = true;
      this.timer = setTimeout(() => {
        this.timer = null;
        this.isMouseIn = true;
        this.nextMouseIn = null;
        this.trigger.open();
      }, this.showDelay) as any;
    }
  }

  onMouseLeave() {
    if (this.timer !== null) {
      if (!this.nextMouseIn) {
        return;
      }
      clearTimeout(this.timer);
      this.timer = null;
      this.nextMouseIn = null;
    } else if (this.hideDelay === 0) {
      this.isMouseIn = false;
    } else {
      this.nextMouseIn = false;
      this.timer = setTimeout(() => {
        this.timer = null;
        this.isMouseIn = false;
        this.nextMouseIn = null;
        this.trigger.close();
      }, this.hideDelay) as any;
    }
  }

  clearPending(isMouseIn: boolean) {
    if (this.nextMouseIn === isMouseIn && this.timer !== null) {
      this.nextMouseIn = null;
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  dispose() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
  }
}

export interface IPopoverHoverTriggerChildProps {
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
}

export interface IPopoverHoverTriggerProps<
  P extends IPopoverHoverTriggerChildProps
> extends IPopoverTriggerProps<P> {
  hideDelay: number;
  showDelay: number;
  isOutside?: IIsOutside;
}

export default class PopoverHoverTrigger<
  P extends IPopoverHoverTriggerChildProps = IPopoverHoverTriggerChildProps
> extends Trigger<
  IPopoverHoverTriggerChildProps,
  IPopoverHoverTriggerProps<P>
> {
  static defaultProps = {
    showDelay: 150,
    hideDelay: 150,
  };

  private triggerHandler: MouseHandler;
  private contentHandler: MouseHandler;
  // private mousePosition: IDot = {
  //   x: 0,
  //   y: 0,
  // };
  // mouseMoveTimestamp = Date.now();

  constructor(props: IPopoverHoverTriggerProps<P>) {
    super(props);
    const { showDelay, hideDelay } = this.props;
    this.triggerHandler = new MouseHandler(showDelay, hideDelay, this);
    /**
     * content mouse enter delay is always zero
     */
    this.contentHandler = new MouseHandler(0, hideDelay, this);
  }

  protected triggerProps: IPopoverHoverTriggerChildProps = {
    onMouseEnter: e => {
      this.triggerHandler.onMouseEnter();
      const { children } = this.props;
      if (isElement(children)) {
        const { onMouseEnter } = children.props;
        onMouseEnter && onMouseEnter(e);
      }
    },
    onMouseLeave: e => {
      this.triggerHandler.onMouseLeave();
      const { children } = this.props;
      if (isElement(children)) {
        const { onMouseLeave } = children.props;
        onMouseLeave && onMouseLeave(e);
      }
    },
  };

  protected getTriggerProps() {
    return this.triggerProps;
  }

  // protected mouseMoveImpl(e: MouseEvent) {
  //   const prev = this.mousePosition;
  //   const current: IDot = {
  //     x: e.clientX,
  //     y: e.clientY,
  //   };
  //   this.mousePosition = current;
  //   this.mouseMoveTimestamp = Date.now();
  //   if (this.triggerHandler.isMouseIn || this.contentHandler.isMouseIn) {
  //     return;
  //   }
  //   const { portalRef, visible } = getContext(this);
  //   if (!visible) {
  //     return;
  //   }
  //   const line: ILine = {
  //     a: prev,
  //     b: current,
  //   };
  //   const portal = portalRef.current;
  //   if (!portal) {
  //     return;
  //   }
  //   const content = portal.element;
  //   const trigger = findDOMNode(this);
  //   if (!(trigger instanceof Element)) {
  //     return;
  //   }
  //   const { isOutside } = this.props;
  //   if (
  //     isOutside &&
  //     isOutside(e, {
  //       triggerNode: trigger,
  //       contentNode: content,
  //     })
  //   ) {
  //     return this.close();
  //   }
  //   const contentRect = boundingClientRectToRect(
  //     content.getBoundingClientRect()
  //   );
  //   const triggerRect = boundingClientRectToRect(
  //     trigger.getBoundingClientRect()
  //   );
  //   if (
  //     isLineIntersectRect(line, contentRect) ||
  //     isLineIntersectRect(line, triggerRect)
  //   ) {
  //     // this.contentHandler.clearPending(false);
  //     // this.triggerHandler.clearPending(false);
  //   } else {
  //     this.close();
  //   }
  // }

  // onMouseMove = (e: MouseEvent) => {
  //   console.log('mouseMove')
  //   this.mouseMoveImpl(e);
  // };

  onWindowBlur = () => {
    this.triggerHandler.onMouseLeave();
    this.contentHandler.onMouseLeave();
  };

  open() {
    if (this.triggerHandler.isMouseIn || this.contentHandler.isMouseIn) {
      getContext(this).popover.setVisible(true);
    }
  }

  onContentMouseEnter = () => {
    this.contentHandler.onMouseEnter();
  };

  onContentMouseLeave = () => {
    this.contentHandler.onMouseLeave();
  };

  close() {
    if (this.triggerHandler.isMouseIn || this.contentHandler.isMouseIn) {
      return;
    }
    getContext(this).popover.setVisible(false);
  }

  componentDidMount() {
    // window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('blur', this.onWindowBlur);
    const { portalRef } = getContext(this);
    const portal = portalRef.current;
    if (portal) {
      portal.element.addEventListener('mouseenter', this.onContentMouseEnter);
      portal.element.addEventListener('mouseleave', this.onContentMouseLeave);
    }
  }

  componentDidUpdate() {
    const { showDelay, hideDelay } = this.props;
    this.triggerHandler.showDelay = showDelay;
    this.triggerHandler.hideDelay = hideDelay;
    /**
     * content mouse enter delay is always zero
     */
    this.contentHandler.hideDelay = hideDelay;
  }

  componentWillUnmount() {
    // window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('blur', this.onWindowBlur);
    this.triggerHandler.dispose();
    this.contentHandler.dispose();
    const { portalRef } = getContext(this);
    const portal = portalRef.current;
    if (portal) {
      portal.element.removeEventListener(
        'mouseenter',
        this.onContentMouseEnter
      );
      portal.element.removeEventListener(
        'mouseleave',
        this.onContentMouseLeave
      );
    }
  }
}
