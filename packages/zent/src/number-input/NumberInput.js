import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import Input from 'input';
import Icon from 'icon';

export default class NumberInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    showStepper: PropTypes.bool,
    decimal: PropTypes.number,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func
  };

  static defaultProps = {
    prefix: 'zent',
    showStepper: false,
    value: 0,
    decimal: 0,
    disabled: false,
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    const { value, decimal } = props;
    let { num, minArrow, maxArrow } = this.adjustFixed(value, decimal);
    this.state = {
      value: num,
      minArrow,
      maxArrow
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    const { decimal } = this.props;
    let { num, minArrow, maxArrow } = this.adjustFixed(value, decimal);
    this.setState({
      value: num,
      minArrow,
      maxArrow
    });
  }

  adjustFixed(num, len) {
    // 检查min与max范围
    const { min, max } = this.props;
    let maxArrow = false;
    let minArrow = false;
    maxArrow = Math.round(num * 10 ** len) <= Math.round(min * 10 ** len);
    minArrow = Math.round(num * 10 ** len) >= Math.round(max * 10 ** len);
    num = maxArrow ? min : num;
    num = minArrow ? max : num;

    // 四舍五入, 切保留几位小数， 此四舍五入修正了js原生toFixed保留小数点的BUG问题
    num = (Math.round(num * 10 ** len) / 10 ** len).toFixed(len);
    return {
      num,
      minArrow,
      maxArrow
    };
  }

  countFied(num, len, count) {
    // 步进器加减的计算
    let result = ((Math.round(num * 10 ** len) + count) / 10 ** len).toFixed(
      len
    );
    // 检查范围
    return this.adjustFixed(result, len);
  }

  onChange(ev) {
    let value = ev.target.value;
    if (!value) {
      this.setState({ value });
    } else if (
      /^(\-|\+)?\d+(\.)?$/g.test(value) ||
      /^(\-|\+)?\d+(\.\d+)?$/g.test(value) ||
      /^\d+\.$/g.test(value) ||
      /^(\-|\+)?$/g.test(value)
    ) {
      this.setState({ value });
    }
  }

  onBlur(ev) {
    const { decimal } = this.props;
    let { value } = this.state;
    if (/^(\-|\+)?$/g.test(value)) {
      value = value.replace(/^(\-|\+)?$/g, '');
    }
    value = value.replace(/\.$/g, '');
    let { num, minArrow, maxArrow } = this.adjustFixed(value, decimal);
    this.setState({
      value: num,
      minArrow,
      maxArrow
    });
    this.onPropChange(ev, num);
  }

  onArrow(ev, disabled, count) {
    if (disabled) return;
    const { value } = this.state;
    const { decimal } = this.props;
    let { num, minArrow, maxArrow } = this.countFied(value, decimal, count);
    this.setState({
      value: num,
      minArrow,
      maxArrow
    });
    this.onPropChange(ev, num);
  }

  onPropChange(evt, result) {
    const props = this.props;
    props.onChange({
      target: {
        ...props,
        type: 'number',
        value: result
      },

      preventDefault() {
        evt.preventDefault();
      },

      stopPropagation() {
        evt.stopPropagation();
      }
    });
  }

  render() {
    const { prefix, className, showStepper, disabled } = this.props;
    const { value, minArrow, maxArrow } = this.state;

    // 箭头状态
    let minArrowState = disabled || minArrow;
    let maxArrowState = disabled || maxArrow;

    // 最外层样式
    const wrapClass = classNames(
      {
        [`${prefix}-number-input-wrapper`]: true,
        [`${prefix}-number-input-count-wrapper`]: showStepper
      },
      className
    );

    // 上arrow样式
    const upArrowClass = classNames({
      [`${prefix}-number-input-arrow`]: true,
      [`${prefix}-number-input-arrowup`]: true,
      [`${prefix}-number-input-arrow-disable`]: minArrowState
    });

    // 下arrow样式
    const downArrowClass = classNames({
      [`${prefix}-number-input-arrow`]: true,
      [`${prefix}-number-input-arrowdown`]: true,
      [`${prefix}-number-input-arrow-disable`]: maxArrowState
    });

    // 可传入Input组件的属性
    let inputProps = pick(this.props, ['placeholder', 'disabled', 'readOnly']);
    return (
      <div className={wrapClass}>
        {showStepper &&
          <span
            className={upArrowClass}
            onClick={e => {
              this.onArrow(e, minArrowState, 1);
            }}
          >
            <Icon type="right" />
          </span>}
        <Input
          {...inputProps}
          value={value}
          onChange={e => {
            this.onChange(e);
          }}
          onBlur={e => {
            this.onBlur(e);
          }}
        />
        {showStepper &&
          <span
            className={downArrowClass}
            onClick={e => {
              this.onArrow(e, maxArrowState, -1);
            }}
          >
            <Icon type="right" />
          </span>}
      </div>
    );
  }
}
