import { Omit } from 'utility-types';

export type InputType = 'text' | 'number' | 'password' | 'textarea';

export type IInputProps = IInputCoreProps | ITextAreaProps;

export interface IInputClearEvent
  extends Omit<React.MouseEvent<HTMLElement>, 'target'> {
  target: IInputCoreProps & { value: string };
  fromClearButton?: boolean;
}

export interface IInputCommonProps {
  className?: string;
  width?: number | string;
  size: 'large' | 'normal' | 'small';
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  autoSelect?: boolean;
  initSelectionStart?: number;
  initSelectionEnd?: number;
}

export interface IInputCoreProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'value' | 'onChange'
    >,
    IInputCommonProps {
  type: 'text' | 'number' | 'password';
  showClear?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  onClear: React.MouseEventHandler<HTMLElement>;
  value?: string;
  onChange?: (
    e: IInputClearEvent | React.ChangeEvent<HTMLInputElement>
  ) => void;
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
