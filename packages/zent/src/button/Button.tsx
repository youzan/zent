import { Component } from 'react';

import Group from './Group';
import { IButtonDirectiveProps, ButtonDirective } from './Directive';
import {
  IPopoverHoverTriggerContext,
  PopoverHoverTriggerContext,
} from '../popover';

export interface IButtonProps
  extends Omit<
      IButtonDirectiveProps<React.ButtonHTMLAttributes<HTMLButtonElement>>,
      'children'
    >,
    React.HTMLAttributes<HTMLElement> {
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  download?: string;
}

export class Button extends Component<IButtonProps> {
  static defaultProps = {
    type: 'default',
    size: 'medium',
    htmlType: 'button',
    bordered: true,
  };

  static Group = Group;
  static Directive = ButtonDirective;
  static contextType = PopoverHoverTriggerContext;
  context!: IPopoverHoverTriggerContext;

  render() {
    const {
      href,
      target,
      htmlType,
      type,
      size,
      block,
      disabled,
      loading,
      outline,
      bordered,
      icon,
      children,
      download,
      ...props
    } = this.props;

    return (
      <ButtonDirective
        type={type}
        size={size}
        block={block}
        disabled={disabled}
        loading={loading}
        outline={outline}
        bordered={bordered}
        icon={icon}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        {href || target ? (
          <a href={href || ''} target={target} download={download} {...props}>
            {children}
          </a>
        ) : (
          <button type={htmlType} {...props}>
            {children}
          </button>
        )}
      </ButtonDirective>
    );
  }
}

export default Button;
