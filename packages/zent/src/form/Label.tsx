import * as React from 'react';
import cx from 'classnames';

export interface ILabelProps {
  required?: boolean;
}

export const Label: React.FunctionComponent<ILabelProps> = ({
  children,
  required,
}) => (
  <label
    className={cx('zent-form-label', {
      'zent-form-label-required': required,
    })}
  >
    {children}
  </label>
);
