import * as React from 'react';
import cx from 'classnames';
import { isElement } from 'react-is';
import { Omit } from 'utility-types';

import Icon, { IconType } from '../icon';
import { DisabledContext } from '../disabled';

export interface IButtonDirectiveChildProps {
  className?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

export type IButtonSize = 'medium' | 'large' | 'small';

export type IButtonType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'error'
  | 'success';

export type IButtonHtmlType = 'button' | 'submit' | 'reset';

export interface IButtonDirectiveProps<
  ChildProps extends Omit<IButtonDirectiveChildProps, 'children'>
> {
  size?: IButtonSize;
  type?: IButtonType;
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
  bordered?: boolean;
  style?: React.CSSProperties;
  icon?: IconType;
  block?: boolean;
  children: React.ReactElement<ChildProps>;
}

export function ButtonDirective<ChildProps extends IButtonDirectiveChildProps>(
  props: IButtonDirectiveProps<ChildProps>
) {
  const disabledContext = React.useContext(DisabledContext);
  const {
    outline,
    type = 'default',
    size = 'medium',
    block,
    loading,
    disabled = disabledContext.value,
    bordered,
    icon,
    children,
  } = props;
  if (!isElement(children)) {
    throw new Error(
      'Button Directive child must be element, string | number | boolean | null | undefined is not accepted'
    );
  }
  const propsRef = React.useRef(props);
  propsRef.current = props;
  const onClick = React.useCallback((e: React.MouseEvent) => {
    const { loading, disabled, children } = propsRef.current;
    const { onClick } = children.props;
    if (!onClick || loading || disabled) {
      return;
    }
    onClick(e);
  }, []);
  const iconNode = icon ? <Icon type={icon} /> : null;
  const className = cx(
    {
      [`zent-btn-${type}${outline ? '-outline' : ''}`]: type !== 'default',
      [`zent-btn-${size}`]: size !== 'medium',
      'zent-btn-block': block,
      'zent-btn-loading': loading,
      'zent-btn-disabled': disabled,
      'zent-btn-border-transparent': !bordered,
    },
    'zent-btn',
    children.props.className
  );
  return React.cloneElement<ChildProps>(
    children,
    {
      className,
      onClick,
    } as Partial<ChildProps>,
    iconNode,
    ...React.Children.toArray(children.props.children)
  );
}
