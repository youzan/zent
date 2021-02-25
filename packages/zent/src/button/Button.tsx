import { Component } from 'react';

import { Omit } from 'utility-types';
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

  /**
   * Why fixTooltipOnDisabledChildren?
   * Mouse events don't trigger on disabled button
   * https://github.com/react-component/tooltip/issues/18
   *
   * Workaround
   * 1. Wrap the disabled button/input in another element.
   * 2. Add {pointer-events: none} style to the disabled button/input.
   */
  renderCompatibleChildren(children: React.ReactNode) {
    return this.context.fixTooltipOnDisabledChildren ? (
      <span
        className="zent-btn-disabled-wrapper"
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        {children}
      </span>
    ) : (
      children
    );
  }

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

    return this.renderCompatibleChildren(
      <ButtonDirective
        type={type}
        size={size}
        block={block}
        disabled={disabled}
        loading={loading}
        outline={outline}
        bordered={bordered}
        icon={icon}
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
