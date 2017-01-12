/**
 * SelectTrigger
 */

import React, { Component, PropTypes } from 'react';

class SimpleTrigger extends Component {

  render() {
    let { prefixCls } = this.props;

    return <div {...this.props} className={`${prefixCls}-simple`}>{this.props.text || this.props.placeholder}</div>;
  }
}

SimpleTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default SimpleTrigger;
