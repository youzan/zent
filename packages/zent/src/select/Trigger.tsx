import * as React from 'react';
import cx from 'classnames';
import { ISelectSingleValueProps, ISelectMultiValueProps } from './shared';
import Tag from '../tag';
import Popover from '../popover';
import { getContext, IPopoverContext } from '../popover/PopoverContext';

export interface ISelectTriggerCommonProps<Value> {
  className?: string;
  search: string;
  onSearchChange(value: string, e: React.ChangeEvent<HTMLInputElement>): void;
  renderSelectedValue(value: Value): React.ReactNode;
  placeholder?: React.ReactNode;
  searchPlaceholder?: string;
  onSearchKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onDelete: (value: Value) => void;
}

export type ISelectTriggerProps<Value> = ISelectTriggerCommonProps<Value> &
  Required<ISelectSingleValueProps<Value> | ISelectMultiValueProps<Value>>;

function getSearchPlaceholder(
  searchPlaceholder: string | undefined,
  placeholder: React.ReactNode
) {
  if (typeof searchPlaceholder === 'string') {
    return searchPlaceholder;
  }
  if (typeof placeholder === 'string') {
    return placeholder;
  }
  return undefined;
}

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
    const { onSearchChange } = this.props;
    onSearchChange(e.target.value, e);
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

  onWindowBlur = () => {
    const { popover } = getContext(this);
    popover.setVisible(false);
  };

  onGlobalClick = (e: MouseEvent) => {
    this.onGlobalClickImpl(e);
  };

  componentDidMount() {
    window.addEventListener('click', this.onGlobalClick);
    // window.addEventListener('blur', this.onWindowBlur);
  }

  // componentDidUpdate() {
  //   const { visible } = getContext(this);
  //   const input = this.inputRef.current;
  //   if (input) {
  //     if (visible) {
  //       input.focus();
  //     } else {
  //       input.blur();
  //     }
  //   }
  // }

  componentWillUnmount() {
    window.removeEventListener('click', this.onGlobalClick);
    // window.removeEventListener('blur', this.onWindowBlur);
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
    const {
      search,
      className,
      onSearchKeyDown,
      searchPlaceholder,
      placeholder,
    } = this.props;
    const { visible } = getContext(this);
    return (
      <div
        ref={this.elementRef}
        className={cx('zent-select', className, {
          'zent-select-active': visible,
        })}
        onClick={this.onFocus}
      >
        {visible ? (
          <input
            ref={this.inputRef}
            className="zent-select-search"
            autoFocus
            placeholder={getSearchPlaceholder(searchPlaceholder, placeholder)}
            value={search}
            onChange={this.onSearchChange}
            onFocus={this.onFocus}
            onKeyDown={onSearchKeyDown}
          />
        ) : (
          this.renderValue()
        )}
      </div>
    );
  }
}

SelectTrigger.prototype.isPopoverTrigger = true;
