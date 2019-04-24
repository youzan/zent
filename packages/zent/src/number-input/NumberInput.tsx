import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import Decimal from 'big.js';
import Icon from '../icon';
import Input, { IInputProps } from '../input';

function isDecimal(value: string | number): boolean {
  if (typeof value === 'number') {
    return true;
  }
  return /^-?\d*\.?\d*$/.test(value.toString());
}

function verifyProps({ showStepper, showCounter }: INumberInputProps) {
  if (showStepper && showCounter) {
    throw new Error(
      'NumberInput: showStepper、 showCounter cannot exist at the same time'
    );
  }
}

function isPotentialValue(value: string) {
  return value === '.' || value === '-' || value === '+';
}

function trimLeadingPlus(value: string) {
  if (value.startsWith('+')) {
    return value.substring(1);
  }
  return value;
}

function getCorrectedValue({
  min,
  max,
  value,
  decimalPlaces,
}: {
  min: number | string | undefined;
  max: number | string | undefined;
  value: number | string;
  decimalPlaces: number;
}) {
  if (value === '' || isPotentialValue(value.toString())) {
    return '';
  }
  let decimal = new Decimal(value);
  if (min !== null && min !== undefined) {
    const minDec = new Decimal(min);
    if (minDec.cmp(decimal) === 1) {
      decimal = minDec;
    }
  }
  if (max !== null && max !== undefined) {
    const maxDec = new Decimal(max);
    if (maxDec.cmp(decimal) === -1) {
      decimal = maxDec;
    }
  }
  return decimal.toFixed(decimalPlaces);
}

export interface INumberInputTarget extends INumberInputProps {
  type: 'number';
  value: string;
}

export interface INumberInputProps
  extends Omit<IInputProps, 'onChange' | 'type' | 'value'> {
  type: 'number';
  value: number | string;
  onChange: (e: string) => any;
  showStepper: boolean;
  showCounter: boolean;
  decimal: number;
  min?: number | string;
  max?: number | string;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

export interface INumberInputState {
  prevValue: number | string;
  value: string;
}

export class NumberInput extends PureComponent<
  INumberInputProps,
  INumberInputState
> {
  static defaultProps = {
    prefix: 'zent',
    type: 'number',
    showStepper: false,
    showCounter: false,
    value: '',
    decimal: 0,
    disabled: false,
    onChange: () => {},
  };

  constructor(props: INumberInputProps) {
    super(props);
    const { min, max, decimal: decimalPlaces } = props;
    const value = getCorrectedValue({
      value: props.value,
      min,
      max,
      decimalPlaces,
    });
    this.state = {
      value,
      prevValue: value,
    };
  }

  private calculateLimit(value: string) {
    const { min, max } = this.props;
    let canDec = true;
    let canInc = true;
    if (!value || isPotentialValue(value)) {
      return {
        canDec: false,
        canInc: false,
      };
    }
    const dec = new Decimal(value);
    if (min !== null && min !== undefined && isDecimal(min)) {
      const minDec = new Decimal(min);
      canDec = minDec.cmp(dec) === -1;
    }
    if (max !== null && max !== undefined && isDecimal(max)) {
      const maxDec = new Decimal(max);
      canInc = maxDec.cmp(dec) === 1;
    }
    return {
      canDec,
      canInc,
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isPotentialValue(value) || isDecimal(value)) {
      this.setState({
        value,
      });
    }
  };

  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { decimal: decimalPlaces, onChange, min, max } = this.props;
    const { value } = this.state;
    const nextValue = getCorrectedValue({
      min,
      max,
      value,
      decimalPlaces,
    });
    this.setState({
      value: nextValue,
    });
    onChange(nextValue);
    const { onBlur } = this.props;
    onBlur && onBlur(e);
  };

  inc = () => {
    const { disabled, decimal: decimalPlaces } = this.props;
    const { value } = this.state;
    const { canInc } = this.calculateLimit(value);
    if (disabled || !canInc) {
      return;
    }
    this.setState(state => {
      const decimal = new Decimal(state.value);
      return {
        value: decimal.plus(this.getDelta()).toFixed(decimalPlaces),
      };
    });
  };

  dec = () => {
    const { disabled, decimal: decimalPlaces } = this.props;
    const { value } = this.state;
    const { canDec } = this.calculateLimit(value);
    if (disabled || !canDec) {
      return;
    }
    this.setState(state => {
      const decimal = new Decimal(state.value);
      return {
        value: decimal.minus(this.getDelta()).toFixed(decimalPlaces),
      };
    });
  };

  private getDelta() {
    const { decimal } = this.props;
    return decimal ? '.' + '1'.padStart(decimal, '0') : '1';
  }

  static getDerivedStateFromProps(
    { value, min, max, decimal: decimalPlaces }: INumberInputProps,
    { prevValue }: INumberInputState
  ): Partial<INumberInputState> | null {
    if (value !== prevValue) {
      const nextValue = getCorrectedValue({
        value: trimLeadingPlus(value.toString()),
        min,
        max,
        decimalPlaces,
      });
      return {
        value: nextValue,
        prevValue: value,
      };
    }
    return null;
  }

  componentDidMount() {
    if (this.props.value !== this.state.value) {
      this.props.onChange(this.state.value);
    }
  }

  componentDidUpdate(prevProps: INumberInputProps) {
    if (
      this.props.value !== prevProps.value &&
      this.state.value !== this.props.value
    ) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    verifyProps(this.props);
    const {
      prefix,
      className,
      disabled,
      readOnly,

      type,

      onChange,
      // width,

      showStepper,
      showCounter,
      min,
      max,
      decimal,

      addonBefore: addonBeforeProp,
      addonAfter: addonAfterProp,

      ...inputProps
    } = this.props;
    const { value } = this.state;
    const { canDec, canInc } = this.calculateLimit(value);
    // 箭头状态
    const addState = disabled || readOnly || !canInc;
    const reduceState = disabled || readOnly || !canDec;

    // 上arrow样式
    const upArrowClass = cx({
      [`${prefix}-number-input-arrow`]: true,
      [`${prefix}-number-input-arrowup`]: true,
      [`${prefix}-number-input-arrow-disable`]: addState,
    });

    // // 下arrow样式
    const downArrowClass = cx({
      [`${prefix}-number-input-arrow`]: true,
      [`${prefix}-number-input-arrowdown`]: true,
      [`${prefix}-number-input-arrow-disable`]: reduceState,
    });

    // // 减号样式
    const reduceCountClass = cx({
      [`${prefix}-number-input-count`]: true,
      [`${prefix}-number-input-countreduce`]: true,
      [`${prefix}-number-input-count-disable`]: reduceState,
    });

    // // 加号样式
    const addCountClass = cx({
      [`${prefix}-number-input-count`]: true,
      [`${prefix}-number-input-countadd`]: true,
      [`${prefix}-number-input-count-disable`]: addState,
    });

    let addonBefore: React.ReactNode = null;
    if (addonBeforeProp || showCounter) {
      addonBefore = (
        <>
          {showCounter && (
            <div className={reduceCountClass} onClick={this.dec}>
              –
            </div>
          )}
          {addonBeforeProp}
        </>
      );
    }

    let addonAfter: React.ReactNode = null;
    if (addonAfterProp || showCounter || showStepper) {
      addonAfter = (
        <>
          {addonAfterProp}
          {showCounter && (
            <div className={addCountClass} onClick={this.inc}>
              +
            </div>
          )}
          {showStepper && (
            <div className={`${prefix}-number-input-arrows`}>
              <div className={upArrowClass} onClick={this.inc}>
                <Icon type="right" />
              </div>
              <div className={downArrowClass} onClick={this.dec}>
                <Icon type="right" />
              </div>
            </div>
          )}
        </>
      );
    }

    return (
      <Input
        autoComplete="off"
        {...inputProps}
        prefix={prefix}
        readOnly={readOnly}
        disabled={disabled}
        className={cx(`${prefix}-number-input`, className)}
        value={value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
      />
    );
  }
}

export default NumberInput;
