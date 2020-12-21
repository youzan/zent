import { memo } from 'react';
import cx from 'classnames';
import { ISelectItem } from './Select';
import Icon from '../icon';
import { InlineLoading } from '../loading/InlineLoading';

export interface IOptionProps<
  Key extends string | number = string | number,
  Item extends ISelectItem<Key> = ISelectItem<Key>
> {
  value: Item;
  active: boolean;
  selected: boolean;
  index: number;
  onSelect(item: Item): void;
  onMouseEnter(index: number): void;
  onMouseLeave(index: number): void;
  multiple: boolean;
  children?: React.ReactNode;
  loading: boolean;
}

function SelectOption<
  Key extends string | number = string | number,
  Item extends ISelectItem<Key> = ISelectItem<Key>
>({
  value,
  active,
  selected,
  onSelect,
  index,
  onMouseEnter,
  onMouseLeave,
  multiple,
  children,
  loading,
}: IOptionProps<Key, Item>) {
  return (
    <div
      className={cx('zent-select-v2-option', {
        'zent-select-v2-option-active': active,
        'zent-select-v2-option-selected': !multiple && selected,
        'zent-select-v2-option-disabled': value.disabled,
        'zent-select-v2-option-header': value.type === 'header',
      })}
      onClick={e => {
        e.preventDefault();
        onSelect(value);
      }}
      onMouseEnter={() => !value.type && onMouseEnter(index)}
      onMouseLeave={() => !value.type && onMouseLeave(index)}
      title={typeof value.text === 'string' ? value.text : ''}
    >
      <div className="zent-select-v2-option-text">
        <p className="zent-select-v2-option-text-content">{children}</p>
        {multiple && selected && (
          <Icon
            className="zent-select-v2-option-selected-multiple"
            type="check"
          />
        )}
        {loading && (
          <InlineLoading
            loading
            icon="circle"
            iconSize={18}
            className="zent-select-v2-option-loading"
          />
        )}
      </div>
    </div>
  );
}

export default memo(SelectOption);
