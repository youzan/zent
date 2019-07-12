import * as React from 'react';
import { Component, ReactNode } from 'react';
import noop from 'lodash-es/noop';
import { Omit } from 'utility-types';

import GroupContext, { IRadioContext } from './GroupContext';
import { IDisabledContext, DisabledContext } from '../disabled';

export interface IRadioEvent<Value>
  extends Omit<React.ChangeEvent<HTMLInputElement>, 'target'> {
  target: {
    type: 'radio';
    checked: boolean;
  } & IRadioProps<Value>;
}

export interface IRadioProps<Value> {
  value?: Value;
  disabled?: boolean;
  readOnly?: boolean;
  width?: number | string;
  className?: string;
  prefix?: string;
  checked?: boolean;
  onChange: (e: IRadioEvent<Value>) => void;
  style?: React.CSSProperties;
}

abstract class AbstractRadio<Value> extends Component<IRadioProps<Value>> {
  static defaultProps = {
    prefix: 'zent',
    onChange: noop,
  };

  static contextType = GroupContext;
  context!: IRadioContext<Value>;

  abstract renderImpl(cx: IDisabledContext): ReactNode;

  handleChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const { props, context } = this;
    const e: IRadioEvent<Value> = Object.create(evt);
    e.target = {
      ...props,
      type: 'radio',
      checked: evt.target.checked,
    };

    if (context.onRadioChange) {
      context.onRadioChange(e);
    } else {
      props.onChange(e);
    }
  };

  getRadioState(cx: IDisabledContext) {
    let { checked, disabled = cx.value, readOnly, value } = this.props;
    const { context } = this;

    if (context.onRadioChange) {
      checked = context.isValueEqual(context.value, value);
      disabled = context.disabled || disabled;
      readOnly = context.readOnly || readOnly;
    }

    return {
      checked,
      disabled,
      readOnly,
    };
  }

  renderWrap = (cx: IDisabledContext) => {
    return this.renderImpl(cx);
  };

  render() {
    return (
      <DisabledContext.Consumer>{this.renderWrap}</DisabledContext.Consumer>
    );
  }
}

export default AbstractRadio;
