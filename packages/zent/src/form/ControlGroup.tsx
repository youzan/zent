import * as React from 'react';
import { forwardRef } from 'react';
import cx from 'classnames';
import { FormError } from './Error';
import { shouldShowError } from './utils';

export interface IControlGroupProps {
  label?: React.ReactNode;
  required?: boolean;
  helpDesc?: React.ReactNode;
  notice?: React.ReactNode;
  className?: string;
  displayError?: boolean;
  isDirty?: boolean;
  error?: { [key: string]: Promise<any> | boolean } | null;
  isActive?: boolean;
  validationErrors?: { [key: string]: React.ReactNode };
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const ControlGroup = forwardRef<
  HTMLDivElement,
  IControlGroupProps
>(
  (
    {
      required = false,
      helpDesc = '',
      notice = '',
      label = '',
      className = '',
      displayError = true,
      validationErrors = {},
      isActive,
      error,
      children,
      ...props
    },
    ref
  ) => {
    const showError = displayError && shouldShowError(error);
    const groupClassName = cx({
      'zent-form__control-group': true,
      'zent-form__control-group--active': isActive,
      'has-error': showError,
      [className]: true,
    });
    return (
      <div ref={ref} className={groupClassName} {...props}>
        <label className="zent-form__control-label">
          {required ? <em className="zent-form__required">*</em> : null}
          {label}
        </label>
        <div className="zent-form__controls">
          {children}
          {showError && (
            <FormError errors={error} display={validationErrors} />
          )}
          {notice && <div className="zent-form__notice-desc">{notice}</div>}
          {helpDesc && <div className="zent-form__help-desc">{helpDesc}</div>}
        </div>
      </div>
    );
  }
);

ControlGroup.displayName = 'ZentFormControlGroup';

export function getControlGroup<P>(Child: React.ComponentType<P>) {
  const comp = forwardRef<HTMLDivElement, P & IControlGroupProps>(
    (props, ref) => {
      const {
        required = false,
        helpDesc = '',
        notice = '',
        label = '',
        className = '',
        displayError = true,
        validationErrors = {},
        isActive,
        error,
        ...otherProps
      } = props;
      return (
        <ControlGroup
          ref={ref}
          className={className}
          label={label}
          error={error}
          required={required}
          helpDesc={helpDesc}
          notice={notice}
          validationErrors={validationErrors}
          displayError={displayError}
          isActive={isActive}
        >
          <Child {...otherProps as P} />
        </ControlGroup>
      );
    }
  );
  const componentName = Child.displayName || Child.name || 'Component';
  comp.displayName = `getControlGroup(${componentName})`;
  return comp;
}

export default ControlGroup;
