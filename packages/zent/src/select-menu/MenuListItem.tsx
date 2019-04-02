import * as React from 'react';
import cx from 'classnames';
import isString from 'lodash-es/isString';
import isNumber from 'lodash-es/isNumber';

export interface IMenuListItem {
  value?: any;
  content?: React.ReactNode;
  isGroup?: boolean;
  isDivider?: boolean;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  icon?: string;
  disabled?: string;
  active?: boolean | ((val: any) => boolean);
  hoverable?: boolean;
  className?: string;
}

export interface IMenuListItemProps {
  item: IMenuListItem;
  index: number;
  hover: boolean;
  focusTo: (focusIdx: number | null, autoScroll?: boolean) => void;
  onRequestClose: () => void;
}

export class MenuListItem extends React.Component<IMenuListItemProps> {
  onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { item, onRequestClose } = this.props;

    return handleItemClick({ item, onRequestClose, event: e });
  };

  onMouseEnter = () => {
    const { focusTo, index } = this.props;
    focusTo(index, false);
  };

  onMouseLeave = () => {
    this.props.focusTo(null);
  };

  render() {
    const { item, hover } = this.props;

    if (!item) {
      return null;
    }

    const { className, isDivider, isGroup, content } = item;

    if (isDivider) {
      return <div className={cx('zent-divider-line', className)} />;
    }

    if (isGroup) {
      return (
        <li className={cx('zent-menu-item-group-header', className)}>
          <span>{content}</span>
        </li>
      );
    }

    const title =
      isNumber(content) || isString(content) ? `${content}` : undefined;
    const active =
      typeof item.active === 'function'
        ? item.active(item.value)
        : !!item.active;
    const hoverable = item.hoverable === undefined ? true : !!item.hoverable;

    return (
      <li
        className={cx(
          'zent-popup-menu-item',
          {
            hoverable,
            disabled: item.disabled,
            active,
            hover,
          },
          className
        )}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {item.icon ? <i className={cx('zent-popup-menu-item-icon')} /> : null}
        <span title={title}>{content}</span>
      </li>
    );
  }
}

export function handleItemClick({
  event,
  item,
  onRequestClose,
}: {
  event: React.MouseEvent<HTMLLIElement>;
  item: IMenuListItem;
  onRequestClose: () => void;
}) {
  const { disabled, onClick } = item;

  if (disabled) {
    return;
  }

  if (onClick) {
    // Item has a touch tap handler, Close it when it's done
    onClick(event);
    if (!event.defaultPrevented) {
      event.preventDefault();
      event.stopPropagation();
      onRequestClose && onRequestClose();
    }
  }
}
