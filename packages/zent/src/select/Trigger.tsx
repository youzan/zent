import * as React from 'react';
import cx from 'classnames';
import { Popover } from '../popover';

export interface ISelectTriggerProps {
  inline?: boolean;
  keyword: string;
  onKeywordChange(e: React.ChangeEvent<HTMLInputElement>): void;
  children?: React.ReactNode;
  placeholder?: string;
  searchPlaceholder?: string;
  visible: boolean;
  active: boolean;
}

export function SelectTrigger({
  keyword,
  onKeywordChange,
  children,
  inline,
  placeholder,
  searchPlaceholder,
  visible,
  active,
}: ISelectTriggerProps) {
  return (
    <Popover.Trigger.Click toggle>
      <div
        className={cx('zent-select', {
          'zent-select-inline': inline,
          'zent-select-active': active,
        })}
      >
        {visible ? (
          <input
            className="zent-select-search"
            value={keyword}
            onChange={onKeywordChange}
            placeholder={searchPlaceholder}
            autoFocus
          />
        ) : (
          placeholder
        )}
      </div>
    </Popover.Trigger.Click>
  );
}

export default SelectTrigger;
