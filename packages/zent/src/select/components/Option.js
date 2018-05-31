import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Option extends PureComponent {
  constructor(props) {
    super(props);
    this.optionClickHandler = this.optionClickHandler.bind(this);
  }

  optionClickHandler(ev) {
    this.props.onClick(ev, this.props.cid);
  }

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

Option.propTypes = {
  prefixCls: PropTypes.string,
  cid: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string,
  onMouseEnter: PropTypes.func,
};

export default Option;
