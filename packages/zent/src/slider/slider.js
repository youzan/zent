import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';

import Range from './range';
import InputField from './inputField';

/* eslint no-throw-literal: 0 */
function checkProps(props) {
  const { range, value, max, min, dots, marks } = props;
  if (range) {
    if (!isArray(value)) {
      throw 'has range props value must an array';
    }
    if (!(value.length === 2)) {
      throw "value' length must as 2";
    }
    if (!value.every(v => isNumber(v) && v >= min && v <= max)) {
      throw "value' each item must a number and between min to max";
    }
    if (!(value[0] <= value[1])) {
      throw 'value[0] must less than value[1]';
    }
  } else {
    if (!isNumber(value)) {
      throw 'not has range props value must an number';
    }
    if (value < min || value > max) {
      throw 'value must between min to max';
    }
  }
  if (dots) {
    if (!marks) {
      throw 'has dots props must has marks two';
    }
  }
}

export default class Slider extends (PureComponent || Component) {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    dots: PropTypes.bool,
    marks: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number)
    ]).isRequired,
    disabled: PropTypes.bool,
    range: PropTypes.bool,
    step: PropTypes.number,
    withInput: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    prefix: 'zent',
    disabled: false,
    withInput: true,
    range: false,
    value: 0
  };

  constructor(props) {
    super(props);
    checkProps(props);
  }

  componentWillReceiveProps = newProps => {
    checkProps(newProps);
  };

  onChange = value => {
    const { range, onChange } = this.props;
    value = range
      ? value.map(v => Number(v)).sort((a, b) => a - b)
      : Number(value);
    onChange && onChange(value);
  };

  render() {
    const { withInput, className, ...restProps } = this.props;
    const wrapClass = classNames(`${restProps.prefix}-slider`, className);
    return (
      <div className={wrapClass}>
        <Range {...restProps} onChange={this.onChange} />
        {withInput &&
          !restProps.dots &&
          <InputField onChange={this.onChange} {...restProps} />}
      </div>
    );
  }
}
