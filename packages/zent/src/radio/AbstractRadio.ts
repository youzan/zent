import { Component } from 'react';
import noop from 'lodash-es/noop';

import GroupContext from './GroupContext';

export interface IRadioEvent {
  target: {
    type: 'radio';
    checked: boolean;
  } & IRadioProps;
  preventDefault(): void;
  stopPropagation(): void;
}

export interface IRadioProps {
  value?: any;
  disabled?: boolean;
  readOnly?: boolean;
  width?: number | string;
  className?: string;
  prefix?: string;
  checked?: boolean;
  onChange: (e: IRadioEvent) => void;
  style?: React.CSSProperties;
}

abstract class AbstractRadio extends Component<IRadioProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    disabled: false,
    readOnly: false,
    onChange: noop,
  };

  // static Button: typeof Button;
  // static Group: typeof Group;

  static contextType = GroupContext;
  context!: React.ContextType<typeof GroupContext>;

  // event liftup
  // link: https://facebook.github.io/react/docs/lifting-state-up.html
  handleChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const { props, context } = this;
    const e: IRadioEvent = {
      target: {
        ...props,
        type: 'radio',
        checked: evt.target.checked,
      },

      preventDefault() {
        evt.preventDefault();
      },

      stopPropagation() {
        evt.stopPropagation();
      },
    };

    if (context.onRadioChange) {
      context.onRadioChange(e);
    } else {
      props.onChange(e);
    }
  };

  getRadioState() {
    let { checked, disabled, readOnly, value } = this.props;
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
}

export default AbstractRadio;
