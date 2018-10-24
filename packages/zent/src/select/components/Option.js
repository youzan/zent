import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Option extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    cid: PropTypes.string,
    value: PropTypes.any,
    text: PropTypes.any,
    isActive: PropTypes.bool,
    placeholder: PropTypes.string,
    onMouseEnter: PropTypes.func,
  };

  static defaultProps = {
    isActive: false,
  };

  optionClickHandler = ev => {
    const { onClick, cid, isActive } = this.props;
    onClick && onClick(ev, cid, isActive);
  };

  render() {
    const { className, text, value } = this.props;
    return (
      <span
        value={value}
        className={className}
        onClick={this.optionClickHandler}
        onMouseEnter={this.props.onMouseEnter}
      >
        {text}
      </span>
    );
  }
}

export default Option;
