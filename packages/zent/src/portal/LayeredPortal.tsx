import * as React from 'react';
import { Component } from 'react';

import PurePortal, { IPurePortalProps } from './PurePortal';
import {
  removeNodeFromDOMTree,
  isDescendant,
  getNodeFromSelector,
} from './util';

export interface ILayeredPortalProps extends IPurePortalProps {
  visible?: boolean;
  layer: string;
  useLayerForClickAway?: boolean;
  onClickAway?: (e: TouchEvent | MouseEvent) => void;
  onLayerReady?: (node: HTMLElement) => void;
  className?: string;
  style?: React.CSSProperties;
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

  decorateLayer = (
    layerNode: HTMLElement,
    parent: Element,
    props = this.props
  ) => {
    const { onLayerReady, className, style } = props;

    // 1, Customize the className and style for layer node.
    layerNode.className = className || '';
    const cssMap = style || (props as any).css || {};
    const cssKeys = Object.keys(cssMap);
    if (cssMap && cssKeys.length) {
      layerNode.style.cssText = cssKeys
        .map(k => `${k}: ${cssMap[k]}`)
        .join('; ');
    }

    // 2, Predefined layer decorations
    if (this.props.useLayerForClickAway) {
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
  }

  unmountLayer() {
    const { layer } = this.state;
    this.undecorateLayer(layer);
    removeNodeFromDOMTree(layer);
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
    const { children, render, visible } = this.props;
    const { layer } = this.state;
    const content = render ? render() : children;

    return visible ? (
      <PurePortal ref={this.purePortalRef} selector={layer}>
        {content}
      </PurePortal>
    ) : null;
  }
}

export default LayeredPortal;
