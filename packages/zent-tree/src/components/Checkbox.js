import React, { Component } from 'react';
import classnames from 'zent-utils/classnames';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { disabled, onCheck } = this.props;
    if (!disabled) {
      onCheck();
    }
  }

  render() {
    const { disabled, type } = this.props;
    const classNames = classnames('checkbox', {
      disabled,
      'half-checked': type === 1,
      checked: type === 2
    });

    return (
      <span className={classNames} onClick={this.handleClick} />
    );
  }
}
