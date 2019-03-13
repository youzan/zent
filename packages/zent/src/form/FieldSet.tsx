import * as React from 'react';
import { Component, createRef } from 'react';
import {
  FieldSet as FormFieldSet,
  IFieldSetChildProps as IFormFieldSetChildProps,
} from 'formulr';
import { FormContext, IFormContext } from './context';
import { makeValidator, IFormCommonProps, ensureContext } from './utils';
import ZentFormError from './Error';
import { scrollToNode } from './utils';

export interface IFieldSetChildProps {
  error?: unknown;
  ref: React.RefObject<unknown>;
}

type ChildFunc = (props: IFieldSetChildProps) => React.ReactNode;

export interface IFormSetProps<T> extends IFormCommonProps<T> {
  children?: React.ReactNode | ChildFunc;
}

function isFunctionChild(
  value: React.ReactNode | ChildFunc
): value is ChildFunc {
  return typeof value === 'function';
}

export class FieldSet<T = any> extends Component<IFormSetProps<T>> {
  static contextType = FormContext;
  context!: IFormContext;

  readonly childRef = createRef<unknown>();
  readonly fieldSetRef = createRef<FormFieldSet>();
  private readonly validator = makeValidator(this);

  scrollTo() {
    const el = this.childRef.current;
    el && el instanceof Element && scrollToNode(el);
  }

  getModel = () => {
    const field = this.fieldSetRef.current;
    if (!field) {
      return null;
    }
    return field.getModel();
  };

  componentDidMount() {
    const { children } = ensureContext(this);
    children.push(this);
  }

  componentWillUnmount() {
    const { children } = ensureContext(this);
    const index = children.indexOf(this);
    if (index !== -1) {
      children.splice(index, 1);
    }
  }

  children = ({ error }: IFormFieldSetChildProps): React.ReactNode => {
    const { children, validationErrors = {}, className, style } = this.props;
    if (isFunctionChild(children)) {
      return children({
        ref: this.childRef,
        error,
      });
    }
    return (
      <div
        ref={this.childRef as React.RefObject<HTMLDivElement>}
        className={className}
        style={style}
      >
        {children}
        <ZentFormError
          errors={error as any}
          display={validationErrors}
          data-dummy="true"
          style={{ color: '#f44' }}
        />
      </div>
    );
  };

  render() {
    const { name } = this.props;
    return (
      <FormFieldSet
        ref={this.fieldSetRef}
        name={name}
        validator={this.validator}
      >
        {this.children}
      </FormFieldSet>
    );
  }
}
