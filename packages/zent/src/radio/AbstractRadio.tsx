import * as React from 'react';
import { ReactNode } from 'react';
import { Omit } from 'utility-types';

import { IRadioContext } from './GroupContext';
import { IDisabledContext } from '../disabled';

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
  checked?: boolean;
  onChange?: (e: IRadioEvent<Value>) => void;
  style?: React.CSSProperties;
  children?: ReactNode;
}

function makeEvent<Value>(
  event: React.ChangeEvent<HTMLInputElement>,
  props: IRadioProps<Value>
) {
  const e: IRadioEvent<Value> = Object.create(event);
  e.target = {
    ...props,
    type: 'radio',
    checked: event.target.checked,
  };
  return e;
}

export function useRadioHandler<Value>(
  { onRadioChange }: IRadioContext<Value>,
  props: IRadioProps<Value>
) {
  const propsRef = React.useRef(props);
  propsRef.current = props;
  return React.useCallback(
    event => {
      const e = makeEvent(event, propsRef.current);
      if (onRadioChange) {
        onRadioChange(e);
      } else {
        const { onChange } = propsRef.current;
        onChange && onChange(e);
      }
    },
    [onRadioChange]
  );
}

function getDisabled<Value>(
  disabledCx: IDisabledContext,
  groupCx: IRadioContext<Value>,
  props: IRadioProps<Value>
): boolean {
  if (typeof props.disabled === 'boolean') {
    return props.disabled;
  }
  if (typeof groupCx.disabled === 'boolean') {
    return groupCx.disabled;
  }
  return disabledCx.value;
}

function getReadOnly<Value>(
  groupCx: IRadioContext<Value>,
  props: IRadioProps<Value>
) {
  if (typeof props.readOnly === 'boolean') {
    return props.readOnly;
  }
  return groupCx.readOnly;
}

export function getRadioState<Value>(
  disabledCx: IDisabledContext,
  groupCx: IRadioContext<Value>,
  props: IRadioProps<Value>
) {
  const disabled = getDisabled(disabledCx, groupCx, props);
  const readOnly = getReadOnly(groupCx, props);
  const checked = groupCx.isValueEqual(groupCx.value, props.value);
  return {
    checked,
    disabled,
    readOnly,
  };
}

// abstract class AbstractRadio<Value> extends Component<IRadioProps<Value>> {
//   static defaultProps = {
//     prefix: 'zent',
//     onChange: noop,
//   };

//   static contextType = GroupContext;
//   context!: IRadioContext<Value>;

//   abstract renderImpl(cx: IDisabledContext): ReactNode;

//   handleChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
//     const { props, context } = this;
//     const e: IRadioEvent<Value> = Object.create(evt);
//     e.target = {
//       ...props,
//       type: 'radio',
//       checked: evt.target.checked,
//     };

//     if (context.onRadioChange) {
//       context.onRadioChange(e);
//     } else {
//       props.onChange(e);
//     }
//   };

//   getRadioState(cx: IDisabledContext) {
//     let { checked, disabled = cx.value, readOnly, value } = this.props;
//     const { context } = this;

//     if (context.onRadioChange) {
//       checked = context.isValueEqual(context.value, value);
//       disabled = context.disabled !== undefined ? context.disabled : disabled;
//       readOnly = context.readOnly || readOnly;
//     }

//     return {
//       checked,
//       disabled,
//       readOnly,
//     };
//   }

//   renderWrap = (cx: IDisabledContext) => {
//     return this.renderImpl(cx);
//   };

//   render() {
//     return (
//       <DisabledContext.Consumer>{this.renderWrap}</DisabledContext.Consumer>
//     );
//   }
// }
