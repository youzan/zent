import * as React from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import Decimal from 'big.js';
import Icon from '../icon';
import Input, { IInputClearEvent, IInputCoreProps } from '../input';
import { InputContext, IInputContext } from '../input/context';

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
  extends Omit<IInputCoreProps, 'onChange' | 'type' | 'value'> {
  type: 'number';
  value?: number | string;
  onChange?: (e: string) => void;
  showStepper?: boolean;
  showCounter?: boolean;
  decimal: number;
  min?: number | string;
  max?: number | string;
}

export interface INumberInputState {
  prevProps: INumberInputProps;
  value: string;
}

function isValidValue(value: unknown): value is string | number {
  const type = typeof value;
  return (
    (type === 'string' && isDecimal(value as string)) ||
    (type === 'number' && Number.isFinite(value as number))
  );
}

export class NumberInput extends React.PureComponent<
  INumberInputProps,
  INumberInputState
> {
  static defaultProps = {
    type: 'number',
    decimal: 0,
    size: 'normal',
  };

  private inputContext: IInputContext = {
    renderInner: children => this.renderChild(children),
  };

  constructor(props: INumberInputProps) {
    super(props);
    const { min, max, decimal: decimalPlaces } = props;
    const value = getCorrectedValue({
      value: isValidValue(props.value) ? props.value : '',
      min,
      max,
      decimalPlaces,
    });
    this.state = {
      value,
      prevProps: props,
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

  onChange = (e: IInputClearEvent | React.ChangeEvent<HTMLInputElement>) => {
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
    if (onChange) {
      onChange(nextValue);
    } else {
      this.setState({
        value: nextValue,
      });
    }
    const { onBlur } = this.props;
    onBlur && onBlur(e);
  };

  inc = () => {
    const { disabled, decimal: decimalPlaces, onChange } = this.props;
    const { value } = this.state;
    const { canInc } = this.calculateLimit(value);
    if (disabled || !canInc) {
      return;
    }
    const decimal = new Decimal(value);
    const nextValue = decimal.plus(this.getDelta()).toFixed(decimalPlaces);
    if (onChange) {
      onChange(nextValue);
    } else {
      this.setState({
        value: nextValue,
      });
    }
  };

  dec = () => {
    const { disabled, decimal: decimalPlaces, onChange } = this.props;
    const { value } = this.state;
    const { canDec } = this.calculateLimit(value);
    if (disabled || !canDec) {
      return;
    }
    const decimal = new Decimal(value);
    const nextValue = decimal.minus(this.getDelta()).toFixed(decimalPlaces);
    if (onChange) {
      onChange(nextValue);
    } else {
      this.setState({
        value: nextValue,
      });
    }
  };

  private getDelta() {
    const { decimal } = this.props;
    return decimal ? '.' + '1'.padStart(decimal, '0') : '1';
  }

  static getDerivedStateFromProps(
    props: INumberInputProps,
    { prevProps }: INumberInputState
  ): Partial<INumberInputState> | null {
    const { value, min, max, decimal: decimalPlaces } = props;
    if (props === prevProps) {
      return null;
    }
    if (isValidValue(value)) {
      const nextValue = getCorrectedValue({
        value: trimLeadingPlus(value.toString()),
        min,
        max,
        decimalPlaces,
      });
      return {
        value: nextValue,
        prevProps: props,
      };
    }
    return {
      prevProps: props,
    };
  }

  componentDidMount() {
    if ('value' in this.props && this.props.value !== this.state.value) {
      const { onChange } = this.props;
      onChange && onChange(this.state.value);
    }
  }

  componentDidUpdate(prevProps: INumberInputProps) {
    if (
      this.props !== prevProps &&
      'value' in this.props &&
      this.state.value !== this.props.value
    ) {
      const { onChange } = this.props;
      onChange && onChange(this.state.value);
    }
  }

  renderChild(children: React.ReactNode) {
    const { disabled, readOnly, showCounter, showStepper } = this.props;
    const { value } = this.state;
    const { canDec, canInc } = this.calculateLimit(value);
    // 箭头状态
    const addState = disabled || readOnly || !canInc;
    const reduceState = disabled || readOnly || !canDec;
    // 上arrow样式
    const upArrowClass = cx({
      'zent-number-input-arrow': true,
      'zent-number-input-arrowup': true,
      'zent-number-input-arrow-disable': addState,
    });

    // // 下arrow样式
    const downArrowClass = cx({
      'zent-number-input-arrow': true,
      'zent-number-input-arrowdown': true,
      'zent-number-input-arrow-disable': reduceState,
    });

    // // 减号样式
    const reduceCountClass = cx({
      'zent-number-input-count': true,
      'zent-number-input-countreduce': true,
      'zent-number-input-count-disable': reduceState,
    });

    // // 加号样式
    const addCountClass = cx({
      'zent-number-input-count': true,
      'zent-number-input-countadd': true,
      'zent-number-input-count-disable': addState,
    });

    return (
      <>
        {showCounter && (
          <div className={reduceCountClass} onClick={this.dec}>
            –
          </div>
        )}
        {children}
        {showCounter && (
          <div className={addCountClass} onClick={this.inc}>
            +
          </div>
        )}
        {showStepper && (
          <div className={'zent-number-input-arrows'}>
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

  render() {
    verifyProps(this.props);
    const {
      className,
      disabled,
      readOnly,

      type,

      onChange,

      showStepper,
      showCounter,
      min,
      max,
      decimal,

      ...inputProps
    } = this.props;
    const { value } = this.state;

    return (
      <InputContext.Provider value={this.inputContext}>
        <Input
          autoComplete="off"
          {...inputProps}
          readOnly={readOnly}
          disabled={disabled}
          className={cx('zent-number-input', className)}
          value={value}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </InputContext.Provider>
    );
  }
}

export default NumberInput;
