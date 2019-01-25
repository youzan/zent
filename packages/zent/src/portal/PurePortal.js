import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import memoize from 'memoize-one';

import { getNodeFromSelector, removeAllChildren } from './util';
import PortalContent from './PortalContent';

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

    if (!domNode) {
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
