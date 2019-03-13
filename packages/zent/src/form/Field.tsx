import * as React from 'react';
import { Component, createRef, RefObject, createElement } from 'react';
import { Field, IFormFieldChildProps } from 'formulr';
import { IFormCommonProps, ensureContext, makeValidator } from './utils';
import { FormContext, IFormContext } from './context';
import { scrollToNode } from './utils';

export interface IZentFormFieldChildProps<T, E>
  extends IFormFieldChildProps<T, E> {
  ref: RefObject<unknown>;
}

export interface IFormFieldProps<
  T,
  ChildProps extends {
    className?: string;
    style?: React.CSSProperties;
  },
  E
> extends IFormCommonProps<T> {
  children?: (props: IZentFormFieldChildProps<T, E>) => React.ReactNode;
  component?: React.ComponentType<IZentFormFieldChildProps<T, E> & ChildProps>;
  defaultValue: T;
  onChange?: (value: E) => T;
}

export class FormField<T, ChildProps extends {}, E = T> extends Component<
  IFormFieldProps<T, ChildProps, E>
> {
  static contextType = FormContext;
  context!: IFormContext;

  private readonly fieldRef = createRef<Field<T, E>>();
  private readonly validator = makeValidator(this);
  childRef = createRef<unknown>();

  scrollTo() {
    const el = this.childRef.current;
    el && el instanceof Element && scrollToNode(el);
  }

  getModel = () => {
    const field = this.fieldRef.current;
    if (!field) {
      return null;
    }
    return field.getModel();
  };

  componentDidMount() {
    const ctx = ensureContext(this);
    ctx.children.push(this);
  }

  componentWillUnmount() {
    const { children } = ensureContext(this);
    const index = children.indexOf(this);
    if (index !== -1) {
      children.splice(index, 1);
    }
  }

  render() {
    const {
      name,
      defaultValue = '',
      children,
      component,
      onChange,
      onBlur,
      onFocus,
      validateOnBlur,
      validateOnChange,
      validationErrors,
      validations,
      asyncValidation,
      relatedFields,
      ...otherProps
    } = this.props;
    let child = null;
    if (children) {
      child = (props: IFormFieldChildProps<T, E>) =>
        children({
          ...props,
          ref: this.childRef,
        });
    } else if (component) {
      child = (props: IFormFieldChildProps<T, E>) =>
        createElement(component, {
          ...otherProps,
          ...props,
          ref: this.childRef,
        } as any);
    }
    return (
      <Field
        ref={this.fieldRef}
        name={name}
        defaultValue={defaultValue}
        validator={this.validator}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {child}
      </Field>
    );
  }
}
