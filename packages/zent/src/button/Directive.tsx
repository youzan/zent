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
  'data-zv'?: string;
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

export interface IButtonDirectiveRenderProps {
  disabled: boolean;
  loading: boolean;
}

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
  children:
    | React.ReactElement<ChildProps>
    | ((props: IButtonDirectiveRenderProps) => React.ReactElement<ChildProps>);
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
    bordered = true,
    icon,
    children,
  } = props;
  if (!isElement(children) && typeof children !== 'function') {
    throw new Error(
      'Button Directive child must be element or function, string | number | boolean | null | undefined is not accepted'
    );
  }
  const disabledRef = React.useRef(disabled);
  disabledRef.current = disabled;
  const propsRef = React.useRef(props);
  propsRef.current = props;
  const innerChildren =
    typeof children === 'function'
      ? children({
          disabled,
          loading,
        })
      : children;

  const innerChildrenRef = React.useRef(innerChildren);
  innerChildrenRef.current = innerChildren;

  const onClick = React.useCallback((e: React.MouseEvent) => {
    const { loading } = propsRef.current;
    const { onClick } = innerChildrenRef.current.props;
    const disabled = disabledRef.current;
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
    innerChildren.props.className
  );

  return React.cloneElement<ChildProps>(
    innerChildren,
    {
      className,
      onClick,
      'data-zv': __ZENT_VERSION__,
    } as Partial<ChildProps>,
    iconNode,
    // Wrap text in a `span`, or we won't be able to control icon margins
    ...(React.Children.map(innerChildren.props.children, child =>
      typeof child === 'string' ? <span>{child}</span> : child
    ) || [])
  );
}
