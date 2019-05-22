import * as React from 'react';
import cx from 'classnames';

export const SelectEmpty: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  return <div className={cx('zent-select-empty', className)} {...props} />;
};
