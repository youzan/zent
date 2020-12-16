import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Context, { IPopoverContext } from './Context';

export type PopoverAnchorGetElementFn = (
  node: Element | Text | null
) => Element | Text | null;

export interface IPopoverAnchorProps {
  onClick?: () => void;

  /**
   * Anchor on some internal node.
   *
   * e.g. Always anchor in the <input> node when using <Input> with prefix/suffix
   */
  getElement?: PopoverAnchorGetElementFn;
}

export class PopoverAnchor extends Component<IPopoverAnchorProps> {
  static contextType = Context;
  declare context: IPopoverContext;

  getElement() {
    const { getElement } = this.props;
    const node = findDOMNode(this);

    return getElement ? getElement(node) : node;
  }

  componentDidMount() {
    this.context.popover.getAnchor = () => this.getElement();
  }

  componentWillUnmount() {
    this.context.popover.getAnchor = null;
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.props.children) {
        throw new Error('Popover Anchor requires a child');
      }
    }
    return this.props.children;
  }
}

export default PopoverAnchor;
