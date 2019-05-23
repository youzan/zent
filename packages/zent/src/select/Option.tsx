import * as React from 'react';
import cx from 'classnames';
import { SelectOptionGroup } from './Group';
import { useSelectContext } from './context';
import { OPTION } from './symbol';

export interface ISelectOptionProps<Value> {
  value: Value;
  className?: string;
  active?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
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
  active,
  disabled,
}: ISelectOptionProps<Value>) {
  const ctx = useSelectContext();
  const { isEqual, onSelect, onMouseEnterOption } = ctx;
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
  const elementRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    // active && elementRef.current && elementRef.current.scrollIntoView(false);
  }, [active]);
  return (
    <div
      ref={elementRef}
      className={cx('zent-select-option', className, {
        'zent-select-option-active': active,
        'zent-select-option-selected': selected,
        'zent-select-option-disabled': disabled,
      })}
      onMouseEnter={onMouseEnterOption}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

SelectOption.Group = SelectOptionGroup;
SelectOption.selectOption = OPTION;
