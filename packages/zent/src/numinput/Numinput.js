import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { Input } from 'zent';

export default class Numinput extends Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.string,
    decimal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
  };

  static defaultProps = {
    prefix: 'zent',
    type: 'number',
    value: '',
    decimal: 0,
    disabled: false,
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    const { value, decimal } = props;
    let result = value ? this.adjustFixed(value, decimal) : value;
    this.state = {
      value: result,
      minArrow: false,
      maxArrow: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    const { decimal } = this.props;
    let result = value ? this.adjustFixed(value, decimal) : value;
    this.setState({ value: result });
  }

  checkRange(num, len) {
    const { min, max } = this.props;
    if (min) {
      if (Math.round(num * 10 ** len) < Math.round(min * 10 ** len)) {
        this.setState({ maxArrow: true });
        return min;
      }
      this.setState({ maxArrow: false });
    }
    if (max) {
      if (Math.round(num * 10 ** len) > Math.round(max * 10 ** len)) {
        this.setState({ minArrow: true });
        return max;
      }
      this.setState({ minArrow: false });
    }
    return num;
  }

  adjustFixed(num, len) {
    // 检查min与max范围
    num = this.checkRange(num, len);
    // 四舍五入, 切保留几位小数， 此四舍五入修正了js原生toFixed保留小数点的BUG问题
    return (Math.round(num * 10 ** len) / 10 ** len).toFixed(len);
  }

  countFied(num, len, count) {
    // 步进器加减的计算
    let result = ((Math.round(num * 10 ** len) + count) / 10 ** len).toFixed(
      len
    );
    if (+result < 0) {
      return this.adjustFixed(0, len);
    }
    // 检查范围
    return this.adjustFixed(result, len);
  }

  onChange(ev) {
    let value = ev.target.value;
    if (!value) {
      this.setState({ value });
    } else if (/^\d+(\.\d+)?$/g.test(value) || /^\d+\.$/g.test(value)) {
      this.setState({ value });
    }
  }

  onBlur() {
    const { decimal } = this.props;
    const { value } = this.state;
    let result = value.replace(/\.$/g, '');
    result = this.adjustFixed(value, decimal);
    this.setState({ value: result });
    this.props.onChange(result);
  }

  onArrow(disabled, count) {
    if (disabled) return;
    const { value } = this.state;
    const { decimal } = this.props;
    let result = this.countFied(value, decimal, count);
    this.setState({ value: result });
    this.props.onChange(result);
  }

  renderUpArrow() {
    return (
      <svg width="7px" height="4px" viewBox="0 0 7 4">
        <g stroke="none">
          <g
            id="数字输入框-InputNumber"
            transform="translate(-1253.000000, -1257.000000)"
          >
            <g
              id="Group-7-Copy-15"
              transform="translate(1188.000000, 1252.000000)"
            >
              <polygon
                id="Path"
                transform="translate(68.360000, 7.000000) rotate(90.000000) translate(-68.360000, -7.000000) "
                points="66.36 7 69.72 3.64 70.36 4.28 67.64 7 70.36 9.72 69.72 10.36"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  renderDownArrow() {
    return (
      <svg width="7px" height="4px" viewBox="0 0 7 4">
        <g stroke="none">
          <g
            id="数字输入框-InputNumber"
            transform="translate(-929.000000, -1272.000000)"
          >
            <g
              id="Group-7-Copy-13"
              transform="translate(864.000000, 1252.000000)"
            >
              <polygon
                id="Path"
                transform="translate(68.360000, 22.000000) rotate(-90.000000) translate(-68.360000, -22.000000) "
                points="66.36 22 69.72 18.64 70.36 19.28 67.64 22 70.36 24.72 69.72 25.36"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  render() {
    const { prefix, className, type, disabled } = this.props;
    const { value, minArrow, maxArrow } = this.state;

    // 箭头状态
    let minArrowState = disabled || minArrow;
    let maxArrowState = disabled || maxArrow;

    // 最外层样式
    const wrapClass = classNames(
      {
        [`${prefix}-numinput-wrapper`]: true,
        [`${prefix}-numinput-${type}-wrapper`]: type === 'count'
      },
      className
    );

    // 上arrow样式
    const upArrowClass = classNames({
      [`${prefix}-numinput-arrow`]: true,
      [`${prefix}-numinput-arrowup`]: true,
      [`${prefix}-numinput-arrow-disable`]: minArrowState
    });

    // 下arrow样式
    const downArrowClass = classNames({
      [`${prefix}-numinput-arrow`]: true,
      [`${prefix}-numinput-arrowdown`]: true,
      [`${prefix}-numinput-arrow-disable`]: maxArrowState
    });

    // 可传入Input组件的属性
    let inputProps = pick(this.props, ['placeholder', 'disabled', 'readOnly']);
    return (
      <div className={wrapClass}>
        {type === 'count' &&
          <span
            className={upArrowClass}
            onClick={() => {
              this.onArrow(minArrowState, 1);
            }}
          >
            {this.renderUpArrow()}
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
        {type === 'count' &&
          <span
            className={downArrowClass}
            onClick={() => {
              this.onArrow(maxArrowState, -1);
            }}
          >
            {this.renderDownArrow()}
          </span>}
      </div>
    );
  }
}
