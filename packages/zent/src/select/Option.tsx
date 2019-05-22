import * as React from 'react';
import cx from 'classnames';
import { SelectOptionGroup } from './Group';
import { useSelectContext } from './context';

export interface ISelectOptionProps<Value> {
  value: Value;
  className?: string;
  children?: React.ReactNode;
}

function includes(
  a: unknown,
  v: unknown[],
  isEqual: (a: unknown, b: unknown) => boolean
) {
  return v.find(b => isEqual(a, b)) !== undefined;
}

export function SelectOption<Value>({
  children,
  value,
  className,
}: ISelectOptionProps<Value>) {
  const ctx = useSelectContext();
  const { isEqual, onSelect } = ctx;
  const active = isEqual(ctx.active, value);
  let selected = false;
  if (ctx.multi) {
    selected = includes(value, ctx.value, isEqual);
  } else {
    selected = isEqual(ctx.value, value);
  }
  const onClick = React.useCallback(
    (e: React.MouseEvent) => onSelect(value, e),
    [value]
  );
  return (
    <div
      className={cx('zent-select-option', className, {
        'zent-select-option-active': active,
        'zent-select-option-selected': selected,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

SelectOption.Group = SelectOptionGroup;
