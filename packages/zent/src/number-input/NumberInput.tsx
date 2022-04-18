import { Component, createRef } from 'react';
import cx from 'classnames';
import { I18nReceiver as Receiver } from '../i18n';
import Decimal from 'big.js';
import Icon from '../icon';
import Input, { IInputClearEvent, IInputCoreProps } from '../input';
import Pop from '../pop';
import { InputContext, IInputContext } from '../input/context';
import { DisabledContext, IDisabledContext } from '../disabled';
import * as Integers from './integer';
import * as Decimals from './decimal';
import { trimLeadingPlus } from './utils';
import { hasOwnProperty } from '../utils/hasOwn';

export interface INumberInputCommonProps
  extends Omit<IInputCoreProps, 'onChange' | 'type' | 'value' | 'onInput'> {
  type?: 'number';
  showStepper?: boolean;
  showCounter?: boolean;
  step?: number;
  showTooltip?: boolean;
}

export interface INumberInputDecimalProps extends INumberInputCommonProps {
  integer?: false;
  value?: string | number;
  onChange?: (value: string) => void;
  decimal?: number;
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
  delta: number;
  pop?: {
    visible: boolean;
    text: string;
    type: string;
  };
}

export interface INumberInputDecimalState {
  prevProps: INumberInputDecimalProps;
  value: Decimal;
  input: string;
  min: Decimal | null;
  max: Decimal | null;
  delta: Decimal;
  pop?: {
    visible: boolean;
    text: string | number;
    type: string;
  };
}

export type INumberInputState =
  | INumberInputIntegerState
  | INumberInputDecimalState;

const is = Object.is;

function getStateFromProps(
  props: INumberInputProps,
  updateValueInState: true
): INumberInputState;
function getStateFromProps(
  props: INumberInputProps,
  updateValueInState: false
): Partial<INumberInputState>;
function getStateFromProps(
  props: INumberInputProps,
  updateValueInState: boolean
): Partial<INumberInputState>;
function getStateFromProps(
  props: INumberInputProps,
  updateValueInState: boolean
): Partial<INumberInputState> {
  // state中增加pop
  const pop = {
    visible: false,
    type: '',
    text: '',
  };
  const state = props.showTooltip ? { pop } : {};
  if (props.integer === true) {
    const { min, max } = Integers.normalizeMinMax(props);
    return {
      ...state,
      prevProps: props,
      min,
      max,
      delta: Integers.getDelta(props.step),
      ...(updateValueInState
        ? Integers.normalizeValue(props.value, min, max)
        : {}),
    };
  } else {
    const { min, max } = Decimals.normalizeMinMax(props);
    return {
      ...state,
      prevProps: props,
      min,
      max,
      delta: Decimals.getDelta(props.decimal, props.step),
      ...(updateValueInState
        ? Decimals.normalizeValue(props.value, min, max, props.decimal)
        : {}),
    };
  }
}

export class NumberInput extends Component<
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
  timer = null;
  inputRef = createRef<Input>();

  private inputContext: IInputContext = {
    renderInner: children => this.renderChild(children),
  };

  constructor(props: INumberInputProps) {
    super(props);
    this.state = getStateFromProps(props, true);
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
  private hideTooltip = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        pop: { visible: false, text: '', type: '' },
      });
    }, 1500);
  };
  private onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.focused = false;
    if (this.props.integer === true) {
      const { onChange, showTooltip } = this.props;
      const { value, min, max } = this.state as INumberInputIntegerState;
      const normalized = Integers.normalizeValue(value, min, max, showTooltip);
      onChange?.(normalized.value);
      this.setState(normalized, () => {
        if (showTooltip && this.state.pop.visible) {
          this.hideTooltip();
        }
      });
      const { onBlur } = this.props;
      onBlur?.(e);
    } else {
      const { onChange, decimal, showTooltip } = this.props;
      const { input, min, max } = this.state as INumberInputDecimalState;
      const normalized = Decimals.normalizeValue(
        input,
        min,
        max,
        decimal,
        showTooltip
      );
      onChange?.(normalized.input);
      this.setState(normalized, () => {
        if (showTooltip && this.state.pop.visible) {
          this.hideTooltip();
        }
      });
      const { onBlur } = this.props;
      onBlur && onBlur(e);
    }
  };

  private step(type: 'inc' | 'dec') {
    if (this.props.disabled) {
      return;
    }
    if (this.props.integer === true) {
      const { value, min, max, delta } = this.state as INumberInputIntegerState;
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
        nextValue = value + delta;
      } else {
        nextValue = value - delta;
      }
      onChange?.(nextValue);
      this.setState({
        value: nextValue,
        input: String(nextValue),
      });
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
      onChange?.(input);
      this.setState({
        value: nextValue,
        input,
      });
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

    const updateValueInState = isControlled(props);

    if (props.integer !== prevProps.integer) {
      return getStateFromProps(props, updateValueInState);
    }

    if (props.integer === true) {
      const nextState: INumberInputIntegerState = {
        ...(prevState as INumberInputIntegerState),
        prevProps: props,
      };

      let minMaxChanged = false;
      if (!is(props.min, prevProps.min) || !is(props.max, prevProps.max)) {
        const { min, max } = Integers.normalizeMinMax(props);
        nextState.min = min;
        nextState.max = max;
        minMaxChanged = true;
      }

      if (
        updateValueInState &&
        (minMaxChanged || !is(props.value, prevProps.value))
      ) {
        const { value, input } = Integers.normalizeValue(
          props.value,
          nextState.min,
          nextState.max
        );
        nextState.value = value;
        nextState.input = input;
      }

      return nextState;
    }

    // decimal mode
    const nextState: INumberInputDecimalState = {
      ...(prevState as INumberInputDecimalState),
      prevProps: props,
    };

    let minMaxChanged = false;
    if (!is(props.min, prevProps.min) || !is(props.max, prevProps.max)) {
      const { min, max } = Decimals.normalizeMinMax(props);
      nextState.min = min;
      nextState.max = max;
      minMaxChanged = true;
    }

    if (
      updateValueInState &&
      (minMaxChanged ||
        !is(props.value, prevProps.value) ||
        !is(props.decimal, (prevProps as INumberInputDecimalProps).decimal))
    ) {
      const { value, input } = Decimals.normalizeValue(
        props.value,
        nextState.min,
        nextState.max,
        props.decimal
      );
      nextState.value = value;
      nextState.input = input;
    }

    if (
      !is(props.step, prevProps.step) ||
      !is(props.decimal, (prevProps as INumberInputDecimalProps).decimal)
    ) {
      nextState.delta = Decimals.getDelta(props.decimal, props.step);
    }

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
          if (!new Decimal(this.props.value).eq(value)) {
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
    // 输入框无输入值时，上下箭头禁用
    const { input } = this.state;
    // 箭头状态
    const addState = disabled || readOnly || !canInc || input === '';
    const reduceState = disabled || readOnly || !canDec || input === '';
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

  renderInput() {
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
      showTooltip,
      ...inputProps
    } = this.props as INumberInputProps & { decimal?: number }; // make tsc happy
    const { input } = this.state;
    if (showStepper && showCounter) {
      throw new Error(
        'NumberInput: showStepper、 showCounter cannot exist at the same time'
      );
    }
    return (
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
    );
  }
  render() {
    const { pop } = this.state;
    return this.props.showTooltip ? (
      <Receiver componentName={'NumberInput'}>
        {i18n => (
          <InputContext.Provider value={this.inputContext}>
            <Pop
              trigger={'none'}
              content={pop.visible ? i18n[pop.type] + pop.text : ''}
              visible={pop.visible}
              position="bottom-left"
            >
              {this.renderInput()}
            </Pop>
          </InputContext.Provider>
        )}
      </Receiver>
    ) : (
      <InputContext.Provider value={this.inputContext}>
        {this.renderInput()}
      </InputContext.Provider>
    );
  }
}

function isControlled(props: INumberInputProps): boolean {
  return hasOwnProperty(props, 'value') && hasOwnProperty(props, 'onChange');
}

export default NumberInput;
