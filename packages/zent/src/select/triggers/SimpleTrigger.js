import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';

class SimpleTrigger extends (PureComponent || Component) {
  render() {
    const { prefixCls, onClick } = this.props;

    return (
      <div className={`${prefixCls}-simple`} onClick={onClick}>
        {this.props.text || this.props.placeholder}
      </div>
    );
  }
}

SimpleTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default SimpleTrigger;
