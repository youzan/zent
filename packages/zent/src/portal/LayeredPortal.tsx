import * as React from 'react';
import { Component } from 'react';
import * as keycode from 'keycode';

import PurePortal, { IPurePortalProps } from './PurePortal';
import {
  removeNodeFromDOMTree,
  isDescendant,
  getNodeFromSelector,
  hasScrollbarY,
} from './util';
import { SCROLLBAR_WIDTH } from '../utils/getScrollbarWidth';

interface IRelatedStyle {
  overflowY: string | null;
  paddingRight: string | null;
}

export interface ILayeredPortalProps extends IPurePortalProps {
  visible?: boolean;
  layer: string;
  useLayerForClickAway?: boolean;
  onClickAway?: (e: TouchEvent | MouseEvent) => void;
  onLayerReady?: (node: HTMLElement) => void;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  withNonScrollable?: boolean;
}

export interface ILayeredPortalState {
  prevLayer: string;
  prevSelector: string | HTMLElement;
  layer: HTMLElement;
  parent: Element;
}

/*
  Portal的核心，只负责管理child。index.js实际export的不是这个component.
*/
export class LayeredPortal extends Component<
  ILayeredPortalProps,
  ILayeredPortalState
> {
  static defaultProps = {
    selector: 'body',
    layer: 'div',
    className: '',
    visible: true,
  };

  static LayeredPortal = LayeredPortal;
  static PurePortal = PurePortal;

  private originalStyle: IRelatedStyle | null = null;

  purePortalRef = React.createRef<PurePortal>();

  constructor(props: ILayeredPortalProps) {
    super(props);
    const layer = document.createElement(props.layer);
    const parent = getNodeFromSelector(props.selector);
    this.state = {
      prevLayer: props.layer,
      prevSelector: props.selector,
      layer,
      parent,
    };
  }

  contains(el: Element) {
    const purePortal = this.purePortalRef.current;
    if (!purePortal) {
      return false;
    }
    return purePortal.contains(el);
  }

  onKeyDown = (e: KeyboardEvent) => {
    const { withEscToClose, onClose } = this.props;
    if (!withEscToClose || !onClose) {
      return;
    }
    if (keycode(e) === 'esc') {
      onClose(e);
    }
  };

  onClickAway = (event: TouchEvent | MouseEvent) => {
    const { onClickAway, visible } = this.props;
    if (event.defaultPrevented || !onClickAway || !visible) {
      return;
    }

    const { layer: layerNode } = this.state;
    if (
      !(event.target instanceof Node) ||
      (event.target !== layerNode &&
        event.target === ((window as unknown) as Node)) ||
      (document.documentElement.contains(event.target) &&
        !isDescendant(layerNode, event.target))
    ) {
      onClickAway(event);
    }
  };

  undecorateLayer = (layerNode: HTMLElement) => {
    if (this.props.useLayerForClickAway) {
      layerNode.style.position = 'relative';
      layerNode.removeEventListener('touchstart', this.onClickAway);
      layerNode.removeEventListener('click', this.onClickAway);
    } else {
      window.removeEventListener('touchstart', this.onClickAway);
      window.removeEventListener('click', this.onClickAway);
    }
  };

  decorateLayer = (layerNode: HTMLElement, parent: Element) => {
    const { onLayerReady, className, style, useLayerForClickAway } = this.props;

    // 1, Customize the className and style for layer node.
    layerNode.className = className;
    const cssMap = style || (this.props as any).css || {};
    const cssKeys = Object.keys(cssMap);
    if (cssMap && cssKeys.length) {
      layerNode.style.cssText = cssKeys
        .map(k => `${k}: ${cssMap[k]}`)
        .join('; ');
    }

    // 2, Predefined layer decorations
    if (useLayerForClickAway) {
      layerNode.addEventListener('touchstart', this.onClickAway);
      layerNode.addEventListener('click', this.onClickAway);
      layerNode.style.position =
        parent === document.body ? 'fixed' : 'absolute';
      layerNode.style.top = '0';
      layerNode.style.bottom = '0';
      layerNode.style.left = '0';
      layerNode.style.right = '0';
    } else if (this.props.onClickAway) {
      setTimeout(() => {
        window.addEventListener('touchstart', this.onClickAway);
        window.addEventListener('click', this.onClickAway);
      }, 0);
    }

    // 3, Callback when layer node is ready
    onLayerReady && onLayerReady(layerNode);
  };

  mountLayer() {
    const { layer, parent } = this.state;
    parent.appendChild(layer);
    this.decorateLayer(layer, parent);
    this.patchScroll();
  }

  unmountLayer() {
    const { layer } = this.state;
    this.restoreScroll();
    this.undecorateLayer(layer);
    removeNodeFromDOMTree(layer);
  }

  patchScroll() {
    const { withNonScrollable } = this.props;
    if (!withNonScrollable) {
      return;
    }
    const { parent: target } = this.state;
    /**
     * this.originalStyle !== null means it's already patched
     */
    if (
      hasScrollbarY(target) &&
      this.originalStyle === null &&
      target instanceof HTMLElement
    ) {
      this.originalStyle = {
        overflowY: target.style.overflowY,
        paddingRight: target.style.paddingRight,
      };
      const originalPadding = getComputedStyle(target).paddingRight;
      const newPadding = parseFloat(originalPadding || '0') + SCROLLBAR_WIDTH;
      target.style.overflowY = 'hidden';
      target.style.paddingRight = `${newPadding}px`;
    }
  }

  restoreScroll() {
    const { parent: target } = this.state;
    const { originalStyle } = this;
    if (target instanceof HTMLElement && originalStyle) {
      target.style.overflowY = originalStyle.overflowY;
      target.style.paddingRight = originalStyle.paddingRight;
      this.originalStyle = null;
    }
  }

  static getDerivedStateFromProps(
    { layer, selector }: ILayeredPortalProps,
    { prevLayer, prevSelector }: ILayeredPortalState
  ): Partial<ILayeredPortalState> | null {
    const state: Partial<ILayeredPortalState> = {};
    if (layer !== prevLayer) {
      state.layer = document.createElement(layer);
      state.prevLayer = layer;
    }
    if (selector !== prevSelector) {
      state.parent = getNodeFromSelector(selector);
      state.prevSelector = selector;
    }
    return state;
  }

  componentDidMount() {
    if (this.props.visible) {
      this.mountLayer();
    }
  }

  componentDidUpdate(prevProps: ILayeredPortalProps) {
    if (
      prevProps.selector !== this.props.selector ||
      prevProps.layer !== this.props.layer ||
      !this.props.visible
    ) {
      this.unmountLayer();
    }
    if (this.props.visible) {
      this.mountLayer();
    }
  }

  componentWillUnmount() {
    this.unmountLayer();
  }

  render() {
    // Render the portal content to container node or parent node
    const { render, visible, ...otherProps } = this.props;
    const { layer } = this.state;

    return visible ? (
      <PurePortal ref={this.purePortalRef} {...otherProps} selector={layer} />
    ) : null;
  }
}

export default LayeredPortal;
