import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import Portal from 'portal';
import WindowResizeHandler from 'utils/component/WindowResizeHandler';
import WindowEventHandler from 'utils/component/WindowEventHandler';
import findPositionedParent from 'utils/dom/findPositionedParent';
import throttle from 'lodash/throttle';

import PropTypes from 'prop-types';

import invisiblePlacement from './placement/invisible';

function translateToContainerCoordinates(containerBB, bb) {
  const { left, top } = containerBB;
  return {
    width: bb.width,
    height: bb.height,
    top: bb.top - top,
    left: bb.left - left,
    bottom: bb.bottom - top,
    right: bb.right - left,
  };
}

/**
 * Like triggers, content can be replaced with your own implementation, all you have to do is extend this base class.
 *
 * The props on this class are all private.
 */
export default class PopoverContent extends (PureComponent || Component) {
  static propTypes = {
    children: PropTypes.node,

    prefix: PropTypes.string,

    id: PropTypes.string,

    getContentNode: PropTypes.func,

    visible: PropTypes.bool,

    // placement strategy
    placement: PropTypes.func,

    cushion: PropTypes.number,

    // A function that returns the anchor for this popover
    // () => Node
    getAnchor: PropTypes.func,

    // defaults to body
    containerSelector: PropTypes.string,

    onPositionUpdated: PropTypes.func,

    onPositionReady: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      position: null,
    };

    // 标记 content 的位置是否 ready
    this.positionReady = false;
  }

  getAnchor() {
    return this.props.getAnchor();
  }

  getPositionedParent() {
    // findPositionedParent returns null on fail
    if (this.positionedParent !== undefined) {
      return this.positionedParent;
    }

    const { containerSelector } = this.props;
    const container = document.querySelector(containerSelector);
    const parent = findPositionedParent(container, true);
    this.positionedParent = parent;
    return parent;
  }

  adjustPosition = () => {
    if (!this.props.visible) {
      return;
    }

    const content = this.props.getContentNode();

    // 可能还未渲染出来，先放到一个不可见的位置
    if (!content) {
      this.setState({
        position: invisiblePlacement(this.props.prefix),
      });
      setTimeout(this.adjustPosition, 0);
      return;
    }

    const contentBoundingBox = content.getBoundingClientRect();

    const anchor = this.getAnchor();
    if (!anchor) {
      return;
    }
    const boundingBox = anchor.getBoundingClientRect();

    const parent = this.getPositionedParent();
    if (!parent) {
      return;
    }
    const parentBoundingBox = parent.getBoundingClientRect();

    const relativeBB = translateToContainerCoordinates(
      parentBoundingBox,
      boundingBox
    );
    const relativeContainerBB = translateToContainerCoordinates(
      parentBoundingBox,
      parentBoundingBox
    );
    const position = this.props.placement(
      this.props.prefix,
      relativeBB,
      relativeContainerBB,
      {
        width: contentBoundingBox.width,
        height: contentBoundingBox.height,
      },
      {
        cushion: this.props.cushion,
        anchor,
        container: parent,
        anchorBoundingBoxViewport: boundingBox,
        containerBoundingBoxViewport: parentBoundingBox,
      }
    );

    this.setState(
      {
        position,
      },
      () => {
        this.props.onPositionUpdated();
        if (!this.positionReady) {
          this.positionReady = true;
          this.props.onPositionReady();
        }
      }
    );
  };

  onWindowResize = throttle((evt, delta) => {
    if (this.props.visible && (delta.deltaX !== 0 || delta.deltaY !== 0)) {
      this.adjustPosition();
    }
  }, 16);

  onWindowScroll = throttle(this.adjustPosition, 16);

  componentDidMount() {
    const { visible } = this.props;

    if (visible) {
      this.adjustPosition();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      // reset position mark
      this.positionReady = false;

      this.adjustPosition();
    }
  }

  render() {
    const {
      prefix,
      className,
      id,
      visible,
      children,
      containerSelector,
    } = this.props;
    const { position } = this.state;

    if (!position) {
      return null;
    }

    const cls = cx(className, `${prefix}-popover`, id, position.toString());

    return (
      <Portal
        prefix={prefix}
        visible={visible}
        selector={containerSelector}
        className={cls}
        css={position.getCSSStyle()}
      >
        <div className={`${prefix}-popover-content`}>
          {children}
          <WindowResizeHandler onResize={this.onWindowResize} />
          <WindowEventHandler
            eventName="scroll"
            callback={this.onWindowScroll}
          />
        </div>
      </Portal>
    );
  }
}
