/**
 * SelectTrigger
 */

import React, { Component, PropTypes } from 'react';

class SelectTrigger extends Component {

  render() {
    let { prefixCls, value, open, onClick, onChange } = this.props;

    return <div {...{ value, open, onClick, onChange }} className={`${prefixCls}-text`}>{this.props.text || this.props.placeholder}</div>;
  }
}

SelectTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default SelectTrigger;
