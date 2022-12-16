import cx from 'classnames';
import { PropsWithChildren, useContext } from 'react';
import { FormContext } from './context';

export interface ILabelProps {
  required?: boolean;
}

export const Label: React.FunctionComponent<PropsWithChildren<ILabelProps>> = ({
  children,
  required,
}) => {
  const { labelStyle } = useContext(FormContext);

  return (
    <label
      className={cx('zent-form-label', {
        'zent-form-label-required': required,
        'zent-form-label-empty': !children,
      })}
      style={labelStyle}
    >
      {children}
    </label>
  );
};
