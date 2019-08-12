import * as React from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import Decimal from 'big.js';
import Icon from '../icon';
import Input, { IInputClearEvent, IInputCoreProps } from '../input';
import { InputContext, IInputContext } from '../input/context';
import { DisabledContext, IDisabledContext } from '../disabled';

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

function normalizeDecimalValue(
  value: string | number | undefined,
  props: INumberInputDecimalProps
) {
  const { min, max, decimal: decimalPlaces } = props;
  if (
    !isValidValue(value) ||
    value === '' ||
    isPotentialValue(value.toString())
  ) {
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

function normalizeIntegerValue(
  value: string | number | undefined,
  min: number | undefined,
  max: number | undefined
): number {
  max =
    typeof max === 'number'
      ? Math.min(Number.MAX_SAFE_INTEGER, max)
      : Number.MAX_SAFE_INTEGER;
  min =
    typeof min === 'number'
      ? Math.max(Number.MIN_SAFE_INTEGER, min)
      : Number.MIN_SAFE_INTEGER;
  let num: number;
  if (typeof value === 'number') {
    num = value;
  } else if (value === undefined || value === null) {
    num = 0;
  } else {
    num = parseInt(value, 10);
  }
  num = Math.min(max, num);
  num = Math.max(min, num);
  return num;
}

export interface INumberInputCommonProps
  extends Omit<IInputCoreProps, 'onChange' | 'type' | 'value' | 'onInput'> {
  type: 'number';
  showStepper?: boolean;
  showCounter?: boolean;
}

export interface INumberInputDecimalProps extends INumberInputCommonProps {
  integer: false;
  value?: string | number;
  onChange?: (value: string) => void;
  decimal: number;
  onInput?: (value: string) => void;
  min?: number | string;
}

export interface INumberInputIntegerProps extends INumberInputCommonProps {
  integer: true;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  onInput?: (value: number) => void;
}

export type INumberInputProps =
  | INumberInputDecimalProps
  | INumberInputIntegerProps;

export interface INumberInputState {
  prevProps: INumberInputProps;
  value: string | number;
}

function isValidValue(value: unknown): value is string | number {
  const type = typeof value;
  return (
    (type === 'string' && isDecimal(value as string)) ||
    (type === 'number' && Number.isFinite(value as number))
  );
}

function getDelta({ decimal }: INumberInputDecimalProps) {
  return decimal ? `0.${'1'.padStart(decimal, '0')}` : '1';
}

const EMPTY_DECIMAL = new Decimal(0);

function calculateDecimalLimit(
  value: number | string,
  { min, max }: INumberInputDecimalProps
): { canInc: boolean; canDec: boolean; num: Decimal } {
  let canDec = true;
  let canInc = true;
  if (!value || (typeof value === 'string' && isPotentialValue(value))) {
    return {
      canDec: false,
      canInc: false,
      num: EMPTY_DECIMAL,
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
    num: dec,
  };
}

function calculateIntegerLimit(
  value: number | string,
  props: INumberInputIntegerProps
): { canInc: boolean; canDec: boolean; num: number } {
  let canDec = true;
  let canInc = true;
  if (!value) {
    return {
      canDec: false,
      canInc: false,
      num: 0,
    };
  }
  const num = typeof value === 'number' ? value : parseInt(value, 10);
  const min =
    typeof props.min === 'number'
      ? Math.max(props.min, Number.MIN_SAFE_INTEGER)
      : Number.MIN_SAFE_INTEGER;
  const max =
    typeof props.max === 'number'
      ? Math.min(props.max, Number.MAX_SAFE_INTEGER)
      : Number.MAX_SAFE_INTEGER;
  if (min >= num) {
    canDec = false;
  }
  if (max <= num) {
    canInc = false;
  }
  return {
    canDec,
    canInc,
    num,
  };
}

export class NumberInput extends React.Component<
  INumberInputProps,
  INumberInputState
> {
  static defaultProps = {
    integer: false,
    type: 'number',
    decimal: 0,
    size: 'normal',
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  inputRef = React.createRef<Input>();

  private inputContext: IInputContext = {
    renderInner: children => this.renderChild(children),
  };

  constructor(props: INumberInputProps) {
    super(props);
    let value: string | number;
    if (props.integer === false) {
      value = normalizeDecimalValue(props.value, props);
    } else {
      value = normalizeIntegerValue(props.value, props.min, props.max);
    }
    this.state = {
      value,
      prevProps: props,
    };
  }

  onChange = (e: IInputClearEvent | React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (this.props.integer === false) {
      const { onInput } = this.props;
      if (isPotentialValue(value) || isDecimal(value)) {
        this.setState({
          value,
        });
        onInput && onInput(value);
      }
    } else {
      const { onInput } = this.props;
      const num = parseInt(value, 10) || 0;
      this.setState({
        value: num,
      });
      onInput && onInput(num);
    }
  };

  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.integer === true) {
      const { onChange, min, max } = this.props;
      const { value } = this.state;
      const num = normalizeIntegerValue(value, min, max);
      if (onChange) {
        onChange(num);
      } else {
        this.setState({
          value: num,
        });
      }
      const { onBlur } = this.props;
      onBlur && onBlur(e);
    } else {
      const { onChange } = this.props;
      const { value } = this.state;
      const nextValue = normalizeDecimalValue(value, this.props);
      if (onChange) {
        onChange(nextValue);
      } else {
        this.setState({
          value: nextValue,
        });
      }
      const { onBlur } = this.props;
      onBlur && onBlur(e);
    }
  };

  inc = () => {
    if (this.props.disabled) {
      return;
    }
    const { value } = this.state;
    if (this.props.integer === true) {
      const { canInc, num } = calculateIntegerLimit(value, this.props);
      if (!canInc) {
        return;
      }
      const { onChange } = this.props;
      if (onChange) {
        onChange(num + 1);
      } else {
        this.setState({
          value: num + 1,
        });
      }
    } else {
      const { decimal: decimalPlaces, onChange } = this.props;
      const { canInc, num: decimal } = calculateDecimalLimit(value, this.props);
      if (!canInc) {
        return;
      }
      const nextValue = decimal
        .plus(getDelta(this.props))
        .toFixed(decimalPlaces);
      if (onChange) {
        onChange(nextValue);
      } else {
        this.setState({
          value: nextValue,
        });
      }
    }
  };

  dec = () => {
    if (this.props.disabled) {
      return;
    }
    const { value } = this.state;
    if (this.props.integer === true) {
      const { onChange } = this.props;
      const { canDec, num } = calculateIntegerLimit(value, this.props);
      if (!canDec) {
        return;
      }
      if (onChange) {
        onChange(num - 1);
      } else {
        this.setState({
          value: num - 1,
        });
      }
    } else {
      const { decimal: decimalPlaces, onChange } = this.props;

      const { canDec, num: decimal } = calculateDecimalLimit(value, this.props);
      if (!canDec) {
        return;
      }
      const nextValue = decimal
        .minus(getDelta(this.props))
        .toFixed(decimalPlaces);
      if (onChange) {
        onChange(nextValue);
      } else {
        this.setState({
          value: nextValue,
        });
      }
    }
  };

  static getDerivedStateFromProps(
    props: INumberInputProps,
    { prevProps }: INumberInputState
  ): Partial<INumberInputState> | null {
    const { value } = props;
    if (props === prevProps) {
      return null;
    }
    if (isValidValue(value)) {
      const nextValue =
        props.integer === false
          ? normalizeDecimalValue(trimLeadingPlus(value.toString()), props)
          : normalizeIntegerValue(value, props.min, props.max);
      return {
        value: nextValue,
        prevProps: props,
      };
    }
    return {
      prevProps: props,
    };
  }

  private checkPropsValue() {
    if (this.props.integer === true) {
      if (this.props.value !== this.state.value) {
        const { onChange } = this.props;
        onChange && onChange(this.state.value as number);
      }
    } else {
      const { onChange } = this.props;
      if (
        onChange &&
        this.props.value !== '' &&
        this.state.value !== '' &&
        !new Decimal(this.props.value || 0).eq(new Decimal(this.state.value))
      ) {
        onChange(this.state.value as (string & number));
      }
    }
  }

  componentDidMount() {
    if ('value' in this.props) {
      this.checkPropsValue();
    }
  }

  componentDidUpdate(prevProps: INumberInputProps) {
    if (prevProps !== this.props && 'value' in this.props) {
      this.checkPropsValue();
    }
  }

  renderChild(children: React.ReactNode) {
    const {
      disabled = this.context.value,
      readOnly,
      showCounter,
      showStepper,
    } = this.props;
    const { value } = this.state;
    let limits: { canDec: boolean; canInc: boolean };
    if (this.props.integer === true) {
      limits = calculateIntegerLimit(value, this.props);
    } else {
      limits = calculateDecimalLimit(value, this.props);
    }
    const { canDec, canInc } = limits;
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
      integer,
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
      onInput,

      ...inputProps
    } = this.props as INumberInputDecimalProps & INumberInputIntegerProps;
    const { value } = this.state;

    return (
      <InputContext.Provider value={this.inputContext}>
        <Input
          ref={this.inputRef}
          autoComplete="off"
          {...inputProps}
          readOnly={readOnly}
          disabled={disabled}
          className={cx('zent-number-input', className)}
          value={value as string}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </InputContext.Provider>
    );
  }
}

export default NumberInput;
