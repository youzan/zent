import * as React from 'react';
import cx from 'classnames';
import { ISelectItem } from './Select';

export interface IOptionProps<Item extends ISelectItem> {
  value: Item;
  active: boolean;
  selected: boolean;
  index: number;
  onSelect(item: Item): void;
  onMouseEnter(index: number): void;
  onMouseLeave(index: number): void;
}

function SelectOption<Item extends ISelectItem>({
  value,
  active,
  selected,
  onSelect,
  index,
  onMouseEnter,
  onMouseLeave,
}: IOptionProps<Item>) {
  return (
    <div
      className={cx('zent-select-option', {
        'zent-select-option-active': active,
        'zent-select-option-selected': selected,
        'zent-select-option-disabled': value.disabled,
        'zent-select-option-header': value.type === 'header',
      })}
      onClick={e => {
        e.preventDefault();
        onSelect(value);
      }}
      onMouseEnter={() => !value.type && onMouseEnter(index)}
      onMouseLeave={() => !value.type && onMouseLeave(index)}
    >
      {value.text}
    </div>
  );
}

export default React.memo(SelectOption);
