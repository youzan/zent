/* eslint-disable no-underscore-dangle */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getViewportSize from '../dom/getViewportSize';
import WindowEventHandler from './WindowEventHandler';

/**
 * Handles window.resize event.
 *
 * The event handler got a second parameter: {deltaX, deltaY}.
 * The resize event handler should be throttled since resize events can fire at a high rate.
 */
export default class WindowResizeHandler extends PureComponent {
  static propTypes = {
    onResize: PropTypes.func.isRequired,
  };

  onResize = evt => {
    const viewportSize = getViewportSize();
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
  };

  componentDidMount() {
    this._prevViewportSize = getViewportSize();
  }

  render() {
    return <WindowEventHandler eventName="resize" callback={this.onResize} />;
  }
}
