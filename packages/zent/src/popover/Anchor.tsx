import * as React from 'react';
import { isElement } from 'react-is';
import { findDOMNode } from 'react-dom';
import Context, { IPopoverContext } from './Context';

class PopoverAnchor extends React.Component {
  static contextType = Context;
  context!: IPopoverContext;
  element: Element | null = null;

  updateElement() {
    this.element = findDOMNode(this) as Element;
    this.context.anchor$.next(this.element);
  }

  componentDidMount() {
    this.updateElement();
  }

  componentDidUpdate() {
    this.updateElement();
  }

  render() {
    const { children } = this.props;
    if (isElement(children)) {
      return children;
    }
    return <div>{children}</div>;
  }
}

export default PopoverAnchor;
