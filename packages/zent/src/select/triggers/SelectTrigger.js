import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';

class SelectTrigger extends (PureComponent || Component) {
  render() {
    const { prefixCls, onClick } = this.props;

    return (
      <div className={`${prefixCls}-text`} onClick={onClick}>
        {this.props.text || this.props.placeholder}
      </div>
    );
  }
}

SelectTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default SelectTrigger;
