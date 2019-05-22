import * as React from 'react';
import cx from 'classnames';
import { ISelectSingleValueProps, ISelectMultiValueProps } from './type';
import Tag from '../tag';
import Popover from '../popover';
import { getContext, IPopoverContext } from '../popover/PopoverContext';

export interface ISelectTriggerCommonProps<Value> {
  className?: string;
  search: string;
  onSearchChange(value: string, e: React.ChangeEvent<HTMLInputElement>): void;
  renderSelectedValue(value: Value): React.ReactNode;
  placeholder?: string;
  onDelete: (value: Value) => void;
}

export type ISelectTriggerProps<Value> = ISelectTriggerCommonProps<Value> &
  Required<ISelectSingleValueProps<Value> | ISelectMultiValueProps<Value>>;

/**
 * can't use function with hooks here for now
 * react hot loader wraps function in a class
 * which destroys SelectTrigger.prototype.isPopoverTrigger magic
 */
export class SelectTrigger<Value> extends React.Component<
  ISelectTriggerProps<Value>
> {
  static contextType = Popover.Context;
  context!: IPopoverContext;

  isPopoverTrigger!: true;

  private elementRef = React.createRef<HTMLDivElement>();
  private inputRef = React.createRef<HTMLInputElement>();

  onFocus = (e: React.MouseEvent | React.FocusEvent) => {
    if (e.target === e.currentTarget) {
      const { popover } = getContext(this);
      popover.setVisible(true);
    }
  };

  onSearchChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const {} = this.props;
  };

  onGlobalClickImpl(e: MouseEvent) {
    const { portalRef, popover } = getContext(this);
    const portal = portalRef.current;
    const element = this.elementRef.current;
    if (!(e.target instanceof Node)) {
      return;
    }
    if (element && element.contains(e.target)) {
      return;
    }
    if (portal && portal.contains(e.target)) {
      return;
    }
    popover.setVisible(false);
  }

  onGlobalClick = (e: MouseEvent) => {
    this.onGlobalClickImpl(e);
  };

  componentDidMount() {
    window.addEventListener('click', this.onGlobalClick);
  }

  componentDidUpdate() {
    const { visible } = getContext(this);
    if (visible && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onGlobalClick);
  }

  renderValue() {
    const { props } = this;
    if (props.multi) {
      const { onDelete } = props;
      return props.value.map(item => (
        <Tag color="red" closable onClose={() => onDelete(item)}>
          {props.renderSelectedValue(item)}
        </Tag>
      ));
    }
    if (!props.value) {
      return props.placeholder;
    }
    return <>{props.renderSelectedValue(props.value as Value)}</>;
  }

  render() {
    const { search, className } = this.props;
    const { visible } = getContext(this);
    return (
      <div
        ref={this.elementRef}
        className={cx('zent-select', className, {
          'zent-select-active': visible,
        })}
        onClick={this.onFocus}
      >
        {this.renderValue()}
        {focus ? (
          <input
            ref={this.inputRef}
            className="zent-select-search"
            value={search}
            onChange={this.onSearchChange}
            onFocus={this.onFocus}
          />
        ) : null}
      </div>
    );
  }
}

SelectTrigger.prototype.isPopoverTrigger = true;
