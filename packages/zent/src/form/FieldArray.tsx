import * as React from 'react';
import { Component, createRef } from 'react';
import {
  FieldArray as FormFieldArray,
  IFieldArrayChildProps as IFormFieldArrayChildProps,
} from 'formulr';
import FormError from './Error';
import { makeValidator, IFormCommonProps, scrollToNode } from './utils';
import { FormContext, IFormContext } from './context';

export interface IFields<T> {
  readonly name: string;
  readonly length: number;
  forEach(callback: (item: T) => void): void;
  get(index: number): T;
  getAll(): T[];
  map(
    callback: (name: string, index: number, key: string) => React.ReactNode
  ): React.ReactNode;
  move(fromPos: number, toPos: number): void;
  pop(): void;
  push(value: T): void;
  remove(index: number): void;
  removeAll(): void;
  shift(): T;
  swap(indexA: number, indexB: number): void;
  unshift(...values: T[]): void;
  concat(values: T[]): void;
  replaceAll(values: T[]): void;
}

function makeFields(comp: FieldArray<any, any>): IFields<any> {
  let uniqueId = 1;
  function getUniqueKey() {
    return `${comp.props.name}[${uniqueId++}]`;
  }
  const getModel = comp.getModel;
  return {
    get name() {
      return comp.props.name;
    },
    get length() {
      return getModel().keys.length;
    },
    forEach(callback) {
      const values = getModel().getRawValue();
      values.forEach(callback);
    },
    get(i) {
      const values = getModel().getRawValue();
      return values[i];
    },
    getAll() {
      return getModel().getRawValue();
    },
    map(callback) {
      return getModel().keys.map((key, index) => callback(key, index, key));
    },
    move(i, j) {
      const model = getModel();
      const keys = model.keys.slice();
      if (i <= 0 || i >= keys.length || j <= 0 || j >= keys.length) {
        throw new Error(`Invalid arguments ${i}, ${j}`);
      }
      const it = keys[i];
      keys.splice(i, 1);
      keys.splice(j, 0, it);
      model.keys = keys;
    },
    pop() {
      const model = getModel();
      const keys = model.keys.slice();
      return keys.pop();
    },
    push<T>(...args: T[]) {
      const model = getModel();
      const keys = model.keys.slice();
      model.shadowValue = model.shadowValue || {};
      if (!args.length) {
        keys.push(getUniqueKey());
      }
      model.keys = keys;
    },
    remove(index) {
      const model = getModel();
      const keys = model.keys.slice();
      const ret = keys.splice(index, 1);
      model.keys = keys;
      return ret;
    },
    removeAll() {
      const model = getModel();
      model.keys = [];
    },
    shift() {
      const model = getModel();
      const keys = model.keys.slice();
      const ret = keys.shift();
      model.keys = keys;
      return ret;
    },
    swap(i, j) {
      const model = getModel();
      const keys = model.keys.slice();
      if (i <= 0 || i >= keys.length || j <= 0 || j >= keys.length) {
        throw new Error(`Invalid arguments ${i}, ${j}`);
      }
      const temp = keys[i];
      keys[i] = keys[j];
      keys[j] = temp;
      model.keys = keys;
    },
    unshift() {},
    concat() {
      // deprecate('concat', 'push');
    },
    replaceAll() {},
  };
}

export interface IFieldArrayChildProps<T> {
  fields: IFields<T>;
  error: { [key: string]: boolean | Promise<boolean> };
  ref: React.RefObject<HTMLElement>;
}

export interface IFieldArrayProps<T, P extends {}>
  extends IFormCommonProps<T[]> {
  name: string;
  defaultValue?: T[];
  component?: React.ComponentType<P>;
  children?: (props: IFieldArrayChildProps<T>) => React.ReactNode;
}

export class FieldArray<T, ChildProps extends {}> extends Component<
  IFieldArrayProps<T, ChildProps> & ChildProps
> {
  static contextType = FormContext;
  context!: IFormContext;

  readonly arrayRef = createRef<FormFieldArray<T>>();
  readonly childRef = createRef<unknown>();
  validator = makeValidator(this);
  fields = makeFields(this);

  scrollTo() {
    const el = this.childRef.current;
    el && el instanceof Element && scrollToNode(el);
  }

  getModel = () => {
    const field = this.arrayRef.current;
    if (!field) {
      return null;
    }
    return field.getModel();
  };

  children = ({ error }: IFormFieldArrayChildProps) => {
    const {
      name,
      defaultValue,
      component: Child,
      children,
      validationErrors,
      ...props
    } = this.props as any;
    let ch = null;
    if (children) {
      ch = children({ fields: this.fields, ref: this.childRef, error });
    }
    if (Child) {
      ch = <Child ref={this.childRef} {...props} fields={this.fields} />;
    }
    return (
      <>
        {ch}
        <FormError
          errors={error as any}
          display={validationErrors}
          style={{ color: '#f44' }}
        />
      </>
    );
  };

  render() {
    const { name } = this.props;
    return (
      <FormFieldArray
        ref={this.arrayRef}
        name={name}
        validator={this.validator}
      >
        {this.children}
      </FormFieldArray>
    );
  }
}
