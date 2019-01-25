import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';
import memoize from 'memoize-one';

import { getNodeFromSelector, removeAllChildren } from './util';
import PortalContent from './PortalContent';

// eslint-disable-next-line
export function unstable_unrenderPortal(containerNode, callback, onUnmount) {
  if (containerNode) {
    // React不支持在event handler中unmount组件，会引起问题。Portal的使用场景很容易出现
    // 这种情况，比如在portal内部按了关闭按钮关掉portal。setTimeout的作用是把unmount放到下一个tick
    // 中去做。
    //
    // Invariant Violation: React DOM tree root should always have a node reference.
    // https://github.com/facebook/react/issues/2605
    // https://github.com/facebook/react/issues/3298
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(containerNode);

      isFunction(callback) && callback();

      isFunction(onUnmount) && onUnmount();
    }, 0);
  }
}

// eslint-disable-next-line
export function unstable_renderPortal(child, containerNode, onMount) {
  if (!containerNode) {
    return;
  }

  // 这个API虽然是unstable，但是现在实现portal只能用它，如果用ReactDOM.render会导致
  // context失效。
  ReactDOM.unstable_renderSubtreeIntoContainer(
    this,
    child,
    containerNode,
    onMount
  );
}

/**
 * Pure portal, render the content (from render prop or from the only children) into the container
 */
export default class PurePortal extends Component {
  static propTypes = {
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,

    // render
    children: PropTypes.node,
    render: PropTypes.func, // prior to children

    // parent node
    selector: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,

    // append portal content to selector
    append: PropTypes.bool,
  };

  static defaultProps = {
    append: false,
  };

  getContainer = memoize(selector => {
    const node = getNodeFromSelector(selector);
    if (!this.props.append) {
      removeAllChildren(node);
    }

    return node;
  });

  render() {
    const { selector: container, onMount, onUnmount } = this.props;

    // Render the portal content to container node or parent node
    const { children, render } = this.props;
    const content = render ? render() : children;
    const domNode = this.getContainer(container);

    if (domNode) {
      return null;
    }

    return ReactDOM.createPortal(
      <PortalContent onMount={onMount} onUnmount={onUnmount}>
        {content}
      </PortalContent>,
      domNode
    );
  }
}
