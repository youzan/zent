import React, { Component, PropTypes, Children } from 'react';

export const PopoverTriggerPropTypes = {
  children: PropTypes.node,

  onTriggerRefChange: PropTypes.func,

  getTriggerNode: PropTypes.func,
  getContentNode: PropTypes.func,

  contentVisible: PropTypes.bool,
  open: PropTypes.func,
  close: PropTypes.func
};

export default class PopoverTrigger extends Component {
  static propTypes = {
    ...PopoverTriggerPropTypes
  };

  // Override this function to add custom event handlers
  getAddtionalProps() {
    return {};
  }

  validateChildren() {
    const child = Children.only(this.props.children);

    if (child.ref) {
      throw new Error('ref is not allowed on PopoverTrigger');
    }

    return child;
  }

  render() {
    const child = this.validateChildren();

    return React.cloneElement(child, {
      ref: this.props.onTriggerRefChange,
      ...this.getAddtionalProps(child)
    });
  }
}
