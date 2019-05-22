import * as React from 'react';
import cx from 'classnames';
import { ISelectOptionProps } from './Option';

export interface ISelectOptionGroupProps<Value> {
  label: React.ReactNode;
  className?: string;
  children: React.ReactElement<ISelectOptionProps<Value>>;
}

export function SelectOptionGroup<Value>({
  label,
  children,
  className,
}: ISelectOptionGroupProps<Value>) {
  return (
    <div className={cx('zent-select-option-group', className)}>
      <div className="zent-select-option-group-label">{label}</div>
      {children}
    </div>
  );
}
