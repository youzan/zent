/**
 * SelectTrigger
 */

import React, { Component, PropTypes } from 'react';

class SelectTrigger extends Component {

  render() {
    let { prefixCls } = this.props;

    return <div {...this.props} className={`${prefixCls}-text`}>{this.props.text || this.props.placeholder}</div>;
  }
}

SelectTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default SelectTrigger;
