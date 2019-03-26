import { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

import { unstable_renderPortal, unstable_unrenderPortal } from './PurePortal';

import {
  getNodeFromSelector,
  createContainerNode,
  removeNodeFromDOMTree,
  isDescendant,
} from './util';

/*
  Portal的核心，只负责管理child。index.js实际export的不是这个component.
*/
export default class LayeredPortal extends PureComponent {
  static propTypes = {
    // visible
    visible: PropTypes.bool,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,

    // children
    children: PropTypes.node,
    render: PropTypes.func,

    // parent node
    selector: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,

    // layer
    layer: PropTypes.string, // the layer tag
    useLayerForClickAway: PropTypes.bool,
    onClickAway: PropTypes.func,
    onLayerReady: PropTypes.func,

    // layer style
    className: PropTypes.string,
    style: PropTypes.object,
    css: PropTypes.object, // deprecated
  };

  static defaultProps = {
    selector: 'body',
    layer: 'div',
    className: '',
    visible: true,
  };

  // DOM node, the container of the portal content
  layerNode = null;

  // DOM node, the parent node of portal content
  parentNode = null;

  // openPortal和closePortal之所以不暴露出去是因为这两个API的调用容易出BUG，有操作是异步的。
  componentDidMount() {
    this.renderLayer();
  }

  componentWillReceiveProps(nextProps) {
    // 如果selector变了的话，删除再重新打开
    const { selector } = this.props;
    if (selector !== nextProps.selector) {
      // 真正的工作是在componentDidUpdate里做的
      this.pendingDestroy = true;
    }
  }

  componentDidUpdate() {
    if (this.pendingDestroy) {
      // unrenderLayer是异步的（原因看unstable_unrenderPortal的代码），所以用callback的形式调用renderLayer
      this.unrenderLayer.call(this, () => {
        this.pendingDestroy = false;
        this.renderLayer.call(this);
      });
    } else {
      this.renderLayer.call(this);
    }
  }

  componentWillUnmount() {
    this.unrenderLayer.call(this);
  }

  getLayer = () => this.layerNode;

  onClickAway = event => {
    if (
      event.defaultPrevented ||
      !this.props.onClickAway ||
      !this.props.visible
    ) {
      return;
    }

    const layerNode = this.layerNode;
    if (
      !(event.target instanceof Node) ||
      (event.target !== layerNode && event.target === window) ||
      (document.documentElement.contains(event.target) &&
        !isDescendant(layerNode, event.target))
    ) {
      this.props.onClickAway(event);
    }
  };

  undecorateLayer = layerNode => {
    if (this.props.useLayerForClickAway) {
      layerNode.style.position = 'relative';
      layerNode.removeEventListener('touchstart', this.onClickAway);
      layerNode.removeEventListener('click', this.onClickAway);
    } else {
      window.removeEventListener('touchstart', this.onClickAway);
      window.removeEventListener('click', this.onClickAway);
    }
  };

  decorateLayer = (layerNode, props = this.props) => {
    const { onLayerReady, className, css, style } = props;

    // 1, Customize the className and style for layer node.
    layerNode.className = className || '';
    let cssKeys = Object.keys(css || {});
    if (css && cssKeys.length) {
      // Setting css is only for compatibility
      layerNode.style.cssText = cssKeys.map(k => `${k}: ${css[k]}`).join('; ');
    }
    Object.keys(style || {}).forEach(k => {
      layerNode.style[k] = style[k];
    });

    // 2, Predefined layer decorations
    if (this.props.useLayerForClickAway) {
      layerNode.addEventListener('touchstart', this.onClickAway);
      layerNode.addEventListener('click', this.onClickAway);
      layerNode.style.position =
        this.parentNode === document.body ? 'fixed' : 'absolute';
      layerNode.style.top = 0;
      layerNode.style.bottom = 0;
      layerNode.style.left = 0;
      layerNode.style.right = 0;
    } else if (this.props.onClickAway) {
      setTimeout(() => {
        window.addEventListener('touchstart', this.onClickAway);
        window.addEventListener('click', this.onClickAway);
      }, 0);
    }

    // 3, Callback when layer node is ready
    onLayerReady && onLayerReady(this.layerNode);
  };

  unrenderLayer = callback => {
    const layerNode = this.layerNode;
    if (!layerNode) {
      return;
    }
    if (layerNode) {
      this.undecorateLayer(layerNode);

      unstable_unrenderPortal.call(
        this,
        layerNode,
        () => {
          removeNodeFromDOMTree(layerNode);

          // Reset
          this.layerNode = null;
          this.parentNode = null;

          isFunction(callback) && callback();
        },
        this.props.onUnmount
      );
    }
  };

  renderLayer = (props = this.props) => {
    if (props.visible) {
      // Cache the parentNode
      if (!this.parentNode) {
        const { selector } = props;
        this.parentNode = getNodeFromSelector(selector);
      }

      // Create the layer DOM node for portal content
      const { layer } = props;
      if (!layer || (layer && typeof layer === 'string')) {
        if (!this.layerNode) {
          this.layerNode = createContainerNode(this.parentNode, layer);
        }
      }

      // customize the container, e.g. style, event listener
      this.decorateLayer(this.layerNode);

      // Render the portal content to container node or parent node
      const { children, render } = props;
      const content = render ? render() : Children.only(children);

      unstable_renderPortal.call(
        this,
        content,
        this.layerNode,
        this.props.onMount
      );
    } else {
      this.unrenderLayer();
    }
  };

  render() {
    return null;
  }
}
