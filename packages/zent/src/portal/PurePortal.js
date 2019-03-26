import { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';

import { getNodeFromSelector } from './util';

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
export default class PurePortal extends PureComponent {
  static propTypes = {
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,

    // render
    children: PropTypes.node,
    render: PropTypes.func, // prior to children

    // parent node
    selector: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,
  };

  static contextTypes = {
    zentI18n: PropTypes.object,
  };

  componentDidMount() {
    this.renderPortal();
  }

  componentWillReceiveProps(nextProps) {
    // 如果container变了的话，删除再重新打开
    const { selector: container } = this.props;
    if (container !== nextProps.container) {
      this.pendingDestroy = true; // flag to trigger re-render in componentDidUpdate
    }
  }

  componentDidUpdate() {
    if (this.pendingDestroy) {
      // unrenderPortal是异步的（原因看unstable_unrenderPortal的代码），所以用callback的形式调用renderPortal
      this.unrenderPortal(() => {
        this.pendingDestroy = false;
        this.renderPortal();
      });
    } else {
      this.renderPortal();
    }
  }

  componentWillUnmount() {
    this.unrenderPortal();
  }

  unrenderPortal = callback => {
    const containerNode = this.containerNode;

    unstable_unrenderPortal.call(
      this,
      containerNode,
      () => {
        this.containerNode = null;
        isFunction(callback) && callback();
      },
      this.props.onUnmount
    );
  };

  renderPortal = (props = this.props) => {
    const { selector: container } = props;

    if (!container) {
      return;
    }

    // Cache the containerNode
    if (!this.containerNode) {
      this.containerNode = getNodeFromSelector(container);
    }

    // Render the portal content to container node or parent node
    const { children, render } = props;
    const content = render ? render() : Children.only(children);

    unstable_renderPortal.call(
      this,
      content,
      this.containerNode,
      this.props.onMount
    );
  };

  render() {
    return null;
  }
}
