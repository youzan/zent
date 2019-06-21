import * as React from 'react';
import cx from 'classnames';

import Icon, { IconType } from '../icon';

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
  | 'success';

export type IButtonHtmlType = 'button' | 'submit' | 'reset';

export interface IButtonDirectiveProps<
  ChildProps extends IButtonDirectiveChildProps
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
  children?: React.ReactElement<ChildProps>;
}

export function ButtonDirective<ChildProps extends IButtonDirectiveChildProps>(
  props: IButtonDirectiveProps<ChildProps>
) {
  const {
    outline,
    type = 'default',
    size = 'medium',
    block,
    loading,
    disabled,
    bordered,
    icon,
    children,
  } = props;
  const child = React.Children.only(children);
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
    child.props.className
  );
  return React.cloneElement<ChildProps>(
    child,
    {
      className,
      onClick,
    } as Partial<ChildProps>,
    iconNode,
    ...React.Children.toArray(child.props.children)
  );
}
