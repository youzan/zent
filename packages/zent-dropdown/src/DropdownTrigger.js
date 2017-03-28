import React, { PropTypes, Component } from 'react';

export default class DropdownTrigger extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  static defaultProps = {

  };

  render() {
    const { children } = this.props;
    return (
      <div className="trigger">
        {children}
      </div>
    )
  }
}
