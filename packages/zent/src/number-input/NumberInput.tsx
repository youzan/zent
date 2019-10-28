import * as React from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import Decimal from 'big.js';
import Icon from '../icon';
import Input, { IInputClearEvent, IInputCoreProps } from '../input';
import { InputContext, IInputContext } from '../input/context';
import { DisabledContext, IDisabledContext } from '../disabled';
import * as Integers from './integer';
import * as Decimals from './decimal';
import { trimLeadingPlus } from './utils';

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
  value?: number | null;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  onInput?: (value: string) => void;
}

export type INumberInputProps =
  | INumberInputDecimalProps
  | INumberInputIntegerProps;

export interface INumberInputIntegerState {
  prevProps: INumberInputIntegerProps;
  value: number | null;
  input: string;
  min: number;
  max: number;
}

export interface INumberInputDecimalState {
  prevProps: INumberInputDecimalProps;
  value: Decimal;
  input: string;
  min: Decimal | null;
  max: Decimal | null;
  delta: Decimal;
}

export type INumberInputState =
  | INumberInputIntegerState
  | INumberInputDecimalState;

const is = Object.is;

function getStateFromProps(props: INumberInputProps): INumberInputState {
  if (props.integer === true) {
    const { min, max } = Integers.normalizeMinMax(props);
    const state: INumberInputIntegerState = {
      prevProps: props,
      min,
      max,
      ...Integers.normalizeValue(props.value, min, max),
    };
    return state;
  } else {
    const { min, max } = Decimals.normalizeMinMax(props);
    const state: INumberInputDecimalState = {
      prevProps: props,
      min,
      max,
      delta: Decimals.getDelta(props.decimal),
      ...Decimals.normalizeValue(props.value, min, max, props.decimal),
    };
    return state;
  }
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
  focused = false;
  inputRef = React.createRef<Input>();

  private inputContext: IInputContext = {
    renderInner: children => this.renderChild(children),
  };

  constructor(props: INumberInputProps) {
    super(props);
    this.state = getStateFromProps(props);
  }

  private onUserInput = (
    e: IInputClearEvent | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (this.props.integer === false) {
      const { onInput } = this.props;
      if (Decimals.isPotentialValue(value)) {
        this.setState({
          input: value,
          value: Decimals.EMPTY_DECIMAL,
        });
      } else if (Decimals.isDecimal(value)) {
        this.setState({
          input: value,
          value: new Decimal(trimLeadingPlus(value)),
        });
        onInput && onInput(value);
      }
    } else {
      const { onInput } = this.props;
      if (Integers.isPotentialValue(value)) {
        this.setState({
          input: value,
          value: null,
        });
        onInput && onInput(value);
      } else if (Integers.isInteger(value)) {
        const num = parseInt(value, 10) || 0;
        this.setState({
          input: value,
          value: num,
        });
        onInput && onInput(value);
      }
    }
  };

  private onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    this.focused = true;
    const { onFocus } = this.props;
    onFocus && onFocus(e);
  };

  private onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.focused = false;
    if (this.props.integer === true) {
      const { onChange } = this.props;
      const { value, min, max } = this.state as INumberInputIntegerState;
      const normalized = Integers.normalizeValue(value, min, max);
      if (onChange) {
        onChange(normalized.value);
      } else {
        this.setState(normalized);
      }
      const { onBlur } = this.props;
      onBlur && onBlur(e);
    } else {
      const { onChange, decimal } = this.props;
      const { input, min, max } = this.state as INumberInputDecimalState;
      const normalized = Decimals.normalizeValue(input, min, max, decimal);
      if (onChange) {
        onChange(normalized.input);
      } else {
        this.setState(normalized);
      }
      const { onBlur } = this.props;
      onBlur && onBlur(e);
    }
  };

  private step(type: 'inc' | 'dec') {
    if (this.props.disabled) {
      return;
    }
    if (this.props.integer === true) {
      const { value, min, max } = this.state as INumberInputIntegerState;
      const { canInc, canDec } = Integers.calculateLimit(value, min, max);
      if (
        value === null ||
        (type === 'inc' && !canInc) ||
        (type === 'dec' && !canDec)
      ) {
        return;
      }
      const { onChange } = this.props;
      let nextValue: number;
      if (type === 'inc') {
        nextValue = value + 1;
      } else {
        nextValue = value - 1;
      }
      if (onChange) {
        onChange(nextValue);
      } else {
        this.setState({
          value: nextValue,
          input: String(nextValue),
        });
      }
    } else {
      const { onChange, decimal } = this.props;
      const { value, min, max, delta } = this.state as INumberInputDecimalState;
      const { canInc, canDec } = Decimals.calculateLimit(value, min, max);
      if ((type === 'inc' && !canInc) || (type === 'dec' && !canDec)) {
        return;
      }
      let nextValue: Decimal;
      if (type === 'inc') {
        nextValue = value.plus(delta);
      } else {
        nextValue = value.minus(delta);
      }
      const input = nextValue.toFixed(decimal);
      if (onChange) {
        onChange(input);
      } else {
        this.setState({
          value: nextValue,
          input,
        });
      }
    }
  }

  private inc = () => {
    this.step('inc');
  };

  private dec = () => {
    this.step('dec');
  };

  static getDerivedStateFromProps(
    props: INumberInputProps,
    prevState: INumberInputState
  ): Partial<INumberInputState> | null {
    const { prevProps } = prevState;
    if (props === prevProps) {
      return null;
    }
    if (props.integer !== prevProps.integer) {
      return getStateFromProps(props);
    }
    if (props.integer === true) {
      const nextState: INumberInputIntegerState = {
        ...(prevState as INumberInputIntegerState),
        prevProps: props,
      };
      if (!is(props.min, prevProps.min) || !is(props.max, prevProps.max)) {
        const { min, max } = Integers.normalizeMinMax(props);
        nextState.min = min;
        nextState.max = max;
      }
      const { value, input } = Integers.normalizeValue(
        props.value,
        nextState.min,
        nextState.max
      );
      nextState.value = value;
      nextState.input = input;
      return nextState;
    }
    const nextState: INumberInputDecimalState = {
      ...(prevState as INumberInputDecimalState),
      prevProps: props,
    };
    if (!is(props.min, prevProps.min) || !is(props.max, prevProps.max)) {
      const { min, max } = Decimals.normalizeMinMax(props);
      nextState.min = min;
      nextState.max = max;
    }
    const { value, input } = Decimals.normalizeValue(
      props.value,
      nextState.min,
      nextState.max,
      props.decimal
    );
    nextState.value = value;
    nextState.input = input;
    return nextState;
  }

  private checkPropsValue() {
    if (this.props.integer === true) {
      if (this.props.value !== this.state.value) {
        const { onChange } = this.props;
        onChange && onChange(this.state.value as number);
      }
    } else {
      const { onChange, decimal } = this.props;
      const { value } = this.state as INumberInputDecimalState;
      if (onChange && this.props.value !== '' && this.state.input !== '') {
        try {
          if (!new Decimal(this.props.value!).eq(value)) {
            onChange(value.toFixed(decimal));
          }
        } catch (error) {
          onChange(value.toFixed(decimal));
        }
      }
    }
  }

  componentDidMount() {
    if ('value' in this.props && !this.focused) {
      this.checkPropsValue();
    }
  }

  componentDidUpdate(prevProps: INumberInputProps) {
    if (prevProps !== this.props && 'value' in this.props && !this.focused) {
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
    let limits: { canDec: boolean; canInc: boolean };
    if (this.props.integer === true) {
      const { min, max, value } = this.state as INumberInputIntegerState;
      limits = Integers.calculateLimit(value, min, max);
    } else {
      const { value, min, max } = this.state as INumberInputDecimalState;
      limits = Decimals.calculateLimit(value, min, max);
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
              <Icon type="up" />
            </div>
            <div className={downArrowClass} onClick={this.dec}>
              <Icon type="down" />
            </div>
          </div>
        )}
      </>
    );
  }

  render() {
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
    const { input } = this.state;
    if (showStepper && showCounter) {
      throw new Error(
        'NumberInput: showStepper、 showCounter cannot exist at the same time'
      );
    }
    return (
      <InputContext.Provider value={this.inputContext}>
        <Input
          ref={this.inputRef}
          autoComplete="off"
          {...inputProps}
          readOnly={readOnly}
          disabled={disabled}
          className={cx('zent-number-input', className)}
          value={input}
          onChange={this.onUserInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </InputContext.Provider>
    );
  }
}

export default NumberInput;
