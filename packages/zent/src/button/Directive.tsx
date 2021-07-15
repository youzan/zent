import cx from 'classnames';
import { isElement, isFragment } from 'react-is';
import { Children, cloneElement, useCallback, useContext, useRef } from 'react';

import Icon, { IconType } from '../icon';
import { DisabledContext } from '../disabled';
import { PopoverHoverTriggerContext } from '../popover';
import { renderCompatibleChildren } from './utils';

export interface IButtonDirectiveChildProps {
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  'data-zv'?: string;
  onClick?: React.MouseEventHandler;
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
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

export function ButtonDirective<ChildProps extends IButtonDirectiveChildProps>(
  props: IButtonDirectiveProps<ChildProps>
) {
  const disabledContext = useContext(DisabledContext);
  const popoverHoverTriggerContext = useContext(PopoverHoverTriggerContext);
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
    onMouseEnter,
    onMouseLeave,
  } = props;
  if (!isElement(children) || isFragment(children)) {
    throw new Error(
      'Button Directive child must be a non fragment element, string | number | boolean | null is not accepted'
    );
  }
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;
  const propsRef = useRef(props);
  propsRef.current = props;

  const childElement = children as React.ReactElement<ChildProps>;

  const onClick = useCallback((e: React.MouseEvent) => {
    const { loading, children } = propsRef.current;
    const { onClick } = children.props;
    const disabled = disabledRef.current;
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
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
    childElement.props.className
  );

  const commonChildren = cloneElement<ChildProps>(
    children,
    {
      className,
      disabled: !!(disabled || loading),
      onClick,
      'data-zv': __ZENT_VERSION__,
    } as Partial<ChildProps>,
    iconNode,
    // Wrap text in a `span`, or we won't be able to control icon margins
    ...(Children.map(childElement.props.children, child =>
      typeof child === 'string' ? <span>{child}</span> : child
    ) || [])
  );

  return renderCompatibleChildren(commonChildren, {
    disabled: popoverHoverTriggerContext.fixMouseEventsOnDisabledChildren,
    onMouseEnter,
    onMouseLeave,
  });
}
