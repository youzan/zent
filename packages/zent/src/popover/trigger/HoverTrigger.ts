import * as React from 'react';

import { getContext } from '../PopoverContext';
import Trigger, { IPopoverTriggerProps, IIsOutside } from './Trigger';
import { isElement } from 'react-is';
import { findDOMNode } from 'react-dom';

interface IDot {
  x: number;
  y: number;
}

interface ILine {
  a: IDot;
  b: IDot;
}

interface IRect {
  a: IDot;
  b: IDot;
  c: IDot;
  d: IDot;
}

function isUpSide(k: number, b: number, dot: IDot) {
  return dot.x * k + b < dot.y;
}

function isLeft(x: number, dot: IDot) {
  return dot.x < x;
}

function isLineIntersectRect(line: ILine, rect: IRect): boolean {
  let p = 0;
  if (line.a.x === line.b.x) {
    const { x } = line.a;
    if (isLeft(x, rect.a)) {
      p |= 0b0001;
    }
    if (isLeft(x, rect.b)) {
      p |= 0b0010;
    }
    if (isLeft(x, rect.c)) {
      p |= 0b0100;
    }
    if (isLeft(x, rect.d)) {
      p |= 0b1000;
    }
  } else {
    /**
     * y = kx + b
     */
    const k = (line.b.y - line.a.y) / (line.b.x - line.a.x);
    const b = line.a.y - k * line.a.x;
    if (isUpSide(k, b, rect.a)) {
      p |= 0b0001;
    }
    if (isUpSide(k, b, rect.b)) {
      p |= 0b0010;
    }
    if (isUpSide(k, b, rect.c)) {
      p |= 0b0100;
    }
    if (isUpSide(k, b, rect.d)) {
      p |= 0b1000;
    }
  }
  return !(p === 0b0000 || p === 0b1111);
}

function boundingClientRectToRect({
  left,
  top,
  width,
  height,
}: ClientRect | DOMRect) {
  return {
    a: {
      x: left,
      y: top,
    },
    b: {
      x: left + width,
      y: top,
    },
    c: {
      x: left,
      y: top + height,
    },
    d: {
      x: left + width,
      y: top + height,
    },
  };
}

class MouseHandler {
  constructor(public showDelay: number, public hideDelay: number) {}

  nextMouseIn: boolean | null = null;
  isMouseIn = false;
  timer: number | null = null;

  onMouseEnter() {
    if (this.timer !== null && this.nextMouseIn !== true) {
      clearTimeout(this.timer);
      this.timer = null;
      this.nextMouseIn = null;
    } else {
      this.nextMouseIn = true;
      this.timer = setTimeout(() => {
        this.timer = null;
        this.isMouseIn = true;
        this.nextMouseIn = null;
      }, this.showDelay) as any;
    }
  }

  onMouseLeave() {
    if (this.timer !== null && this.nextMouseIn !== false) {
      clearTimeout(this.timer);
      this.timer = null;
      this.nextMouseIn = null;
    } else {
      this.nextMouseIn = false;
      this.timer = setTimeout(() => {
        this.timer = null;
        this.isMouseIn = false;
        this.nextMouseIn = null;
      }, this.hideDelay) as any;
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
  private mousePosition: IDot = {
    x: 0,
    y: 0,
  };

  constructor(props: IPopoverHoverTriggerProps<P>) {
    super(props);
    const { showDelay, hideDelay } = this.props;
    this.triggerHandler = new MouseHandler(showDelay, hideDelay);
    this.contentHandler = new MouseHandler(showDelay, hideDelay);
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

  onMouseMove = (e: MouseEvent) => {
    const prev = this.mousePosition;
    const current: IDot = {
      x: e.clientX,
      y: e.clientY,
    };
    this.mousePosition = current;
    if (this.triggerHandler.isMouseIn || this.contentHandler.isMouseIn) {
      return;
    }
    const { portalRef, popover } = getContext(this);
    const line: ILine = {
      a: prev,
      b: current,
    };
    const portal = portalRef.current;
    if (!portal) {
      return;
    }
    const content = portal.element;
    const trigger = findDOMNode(this);
    if (!(trigger instanceof Element)) {
      return;
    }
    const { isOutside } = this.props;
    if (
      isOutside &&
      isOutside(e, {
        triggerNode: trigger,
        contentNode: content,
      })
    ) {
      return popover.close();
    }
    const contentRect = boundingClientRectToRect(
      content.getBoundingClientRect()
    );
    const triggerRect = boundingClientRectToRect(
      trigger.getBoundingClientRect()
    );
    if (
      isLineIntersectRect(line, contentRect) ||
      isLineIntersectRect(line, triggerRect)
    ) {
      return;
    }
    popover.close();
  };

  onWindowBlur = () => {
    this.triggerHandler.onMouseLeave();
    this.contentHandler.onMouseLeave();
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('blur', this.onWindowBlur);
  }

  componentDidUpdate() {
    const { showDelay, hideDelay } = this.props;
    this.triggerHandler.showDelay = showDelay;
    this.triggerHandler.hideDelay = hideDelay;
    this.contentHandler.showDelay = showDelay;
    this.contentHandler.hideDelay = hideDelay;
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('blur', this.onWindowBlur);
  }
}
