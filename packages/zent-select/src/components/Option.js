/**
 * Option
 */

import React, { Component, PropTypes } from 'react';

class Option extends Component {

  constructor(props) {
    super(props);
    this.optionClickHandler = this.optionClickHandler.bind(this);
  }

  optionClickHandler(ev) {
    this.props.onClick(ev, this.props.cid);
  }

  render() {
    return (
      <span
        {...this.props}
        onClick={this.optionClickHandler}
      >{this.props.text}</span>
    );
  }
}

Option.propTypes = {
  prefixCls: PropTypes.string,
  cid: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default Option;
