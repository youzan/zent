/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Component } from 'react';

import getViewportSize from '../dom/getViewportSize';
import WindowEventHandler from './WindowEventHandler';
import { runOnceInNextFrame } from '../nextFrame';

const RESIZE_OPTIONS = {
  passive: true,
};

export interface IWindowResizeHandlerDelta {
  deltaX: number;
  deltaY: number;
}

export interface IWindowResizeHandlerProps {
  onResize(e: UIEvent, delta: IWindowResizeHandlerDelta): void;
}

/**
 * Handles window.resize event.
 *
 * The event handler got a second parameter: {deltaX, deltaY}.
 * The `onResize` callback is throttled.
 */
export default class WindowResizeHandler extends Component<
  IWindowResizeHandlerProps
> {
  _prevViewportSize: {
    width: number;
    height: number;
  } | null = null;

  onResize = runOnceInNextFrame((evt: UIEvent) => {
    const viewportSize = getViewportSize();

    if (!this._prevViewportSize) {
      this._prevViewportSize = viewportSize;
    }

    const prevViewportSize = this._prevViewportSize;

    const delta = {
      deltaX: viewportSize.width - prevViewportSize.width,
      deltaY: viewportSize.height - prevViewportSize.height,
    };

    if (delta.deltaX === 0 && delta.deltaY === 0) {
      return;
    }

    this.props.onResize(evt, delta);
    this._prevViewportSize = viewportSize;
  });

  componentDidMount() {
    this._prevViewportSize = getViewportSize();
  }

  componentWillUnmount() {
    this.onResize.cancel();
  }

  render() {
    return (
      <WindowEventHandler
        eventName="resize"
        listener={this.onResize}
        options={RESIZE_OPTIONS}
      />
    );
  }
}
