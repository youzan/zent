import { Omit } from 'utility-types';
import { IconType } from '../icon';
import { CSSProperties } from 'react';

export type InputType = 'text' | 'number' | 'password' | 'textarea';

export type IInputProps = IInputCoreProps | ITextAreaProps;

export interface IInputClearEvent
  extends Omit<React.MouseEvent<HTMLElement>, 'target'> {
  target: IInputCoreProps & { value: string };
  fromClearButton?: boolean;
}

export type IInputChangeEvent =
  | IInputClearEvent
  | React.ChangeEvent<HTMLInputElement>;

export interface IInputCommonProps {
  className?: string;
  width?: number | string;
  size: 'large' | 'normal' | 'small';
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  autoSelect?: boolean;
  initSelectionStart?: number;
  initSelectionEnd?: number;
  inline?: boolean;
  style?: CSSProperties;
}

export interface IInputCoreProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'value' | 'onChange'
    >,
    IInputCommonProps {
  type: 'text' | 'number' | 'password';
  icon?: IconType;
  showClear?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  value?: string;
  inline?: boolean;
  onChange?: (e: IInputChangeEvent) => void;
  onIconClick?: React.MouseEventHandler<HTMLElement>;
}

export interface ITextAreaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'value' | 'onChange'
    >,
    IInputCommonProps {
  type: 'textarea';
  showCount?: boolean;
  autoSize?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
