import React, { PropTypes, Component } from 'react';

export default class DropdownContent extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  static defaultProps = {

  };

  render() {
    const { children } = this.props;
    console.log('11111');
    return (
      <div className="content">
        {children}
      </div>
    )
  }
}
