import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';

class Simple extends (PureComponent || Component) {
  render() {
    const { prefixCls, onClick, text, placeholder, contentVisible } = this.props;
    const activeCls = contentVisible ? 'active' : '';
    return (
      <div className={`${prefixCls}-text ${activeCls}`} onClick={onClick}>
        {text || placeholder}
      </div>
    );
  }
}

Simple.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default Simple;
