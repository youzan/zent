import { Component } from 'react';
import * as React from 'react';
import isEqual from 'lodash-es/isEqual';
import omit from 'lodash-es/omit';
import assign from 'lodash-es/assign';
import set from 'lodash-es/set';
import isEmpty from 'lodash-es/isEmpty';
import memoize from '../utils/memorize-one';

import { prefixName, unliftFieldArrayValue } from './utils';
import unknownProps from './unknownProps';
import { FieldArrayMutatorAction } from './constants';
import FormContext from './FormContext';

export interface IFieldArrayStateValue {
  _fieldInternalValue: any;
  _fieldInternalKey: number;
}

export interface IFieldArrayProps {
  name: string;
  value?: any[];
  component: React.ElementType;
}

export interface IFieldArrayState {
  fieldArray: IFieldArrayStateValue[];
}

function fieldValueReader(callback, fieldArrayValues, item, index) {
  const name = `[${index}]`;
  return callback(
    name,
    index,

    // make sure key changes when its name changes
    `${name}-${item._fieldInternalKey}`,

    fieldArrayValues[index],
    fieldArrayValues
  );
}

class FieldArray extends Component<IFieldArrayProps, IFieldArrayState> {
  static contextType = FormContext;

  context!: React.ContextType<typeof FormContext>;

  _uniqueKey: number;
  _name: string;
  _mutatorAction: FieldArrayMutatorAction;
  wrappedComponent: React.ReactInstance;

  getFormContext = memoize(name => {
    const { zentForm } = this.context;

    return {
      zentForm: {
        ...zentForm,
        // prefix: this._name,
        prefix: name,
        onChangeFieldArray: this.onChangeFieldArray,
      },
    };
  });

  constructor(props, context) {
    super(props, context);
    if (!context.zentForm) {
      throw new Error('FieldArray must be in zent-form');
    }

    this._uniqueKey = 0;
    this._name = prefixName(context.zentForm, props.name);

    // 标记触发 FieldArray 值改变的操作是什么类型
    this._mutatorAction = FieldArrayMutatorAction.Initialize;

    this.state = {
      fieldArray: (props.value || []).map(this.createInternalFieldValue),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state) || !isEqual(nextProps, this.props);
  }

  componentWillMount() {
    if (!this.props.name) {
      throw new Error('FieldArray requires a name property when used');
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('name' in nextProps) {
      this._name = prefixName(this.context.zentForm, nextProps.name);
    }

    if (nextProps.value !== this.props.value) {
      this.setState(nextProps.value.map(this.createInternalFieldValue));
    }
  }

  componentDidMount() {
    const { zentForm } = this.context;
    zentForm.attachToForm(this, { isFieldContainer: true });

    if (!isEmpty(this.state.fieldArray)) {
      this.context.zentForm.setFieldArrayMembers(
        this._name,
        this.getFieldArrayValues()
      );
      this.setMutatorAction(FieldArrayMutatorAction.Unknown);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fieldArray !== this.state.fieldArray) {
      this.context.zentForm.setFieldArrayMembers(
        this._name,
        this.getFieldArrayValues()
      );
      this.setMutatorAction(FieldArrayMutatorAction.Unknown);
    }
  }

  onChangeFieldArray = (name, value) => {
    const fieldArray = assign([], this.state.fieldArray);
    let fieldPath = name.replace(this._name, '');
    fieldPath =
      fieldPath.indexOf('.') >= 0
        ? fieldPath.replace(/\./, '._fieldInternalValue.')
        : `${fieldPath}._fieldInternalValue`;
    set(fieldArray, fieldPath, value);
    this.context.zentForm.onChangeFieldArray &&
      this.context.zentForm.onChangeFieldArray(this._name, fieldArray);
  };

  getWrappedComponent = () => {
    return this.wrappedComponent;
  };

  saveWrappedComponent = ref => {
    this.wrappedComponent = ref;
  };

  // Propagate field array change to containing field array
  guardFieldArrayChange(fieldArray) {
    this.context.zentForm.onChangeFieldArray &&
      this.context.zentForm.onChangeFieldArray(this._name, fieldArray);
  }

  getField = index => {
    const { fieldArray } = this.state;
    if (index >= fieldArray.length) {
      throw Error('The index for getField is invalid');
    }
    const fieldArrayValues = this.getFieldArrayValues();
    return fieldArrayValues[index];
  };

  getAllFields = () => {
    const fieldArrayValues = this.getFieldArrayValues();
    return fieldArrayValues;
  };

  forEachFields = callback => {
    const { fieldArray } = this.state;
    const fieldArrayValues = this.getFieldArrayValues();
    fieldArray.forEach((item, index) => {
      return fieldValueReader(callback, fieldArrayValues, item, index);
    });
  };

  mapFields = callback => {
    const { fieldArray } = this.state;
    const fieldArrayValues = this.getFieldArrayValues();
    return (fieldArray || []).map((item, index) => {
      return fieldValueReader(callback, fieldArrayValues, item, index);
    });
  };

  moveFields = (fromPos, toPos) => {
    this.setState(state => {
      const fieldArray = assign([], state.fieldArray);
      const fieldLen = fieldArray.length;
      if (fromPos >= fieldLen || toPos >= fieldLen) {
        throw Error('The index for moveFields is invalid');
      }
      const fieldToMove = fieldArray.splice(fromPos, 1)[0];
      fieldArray.splice(toPos, 0, fieldToMove);

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  popFields = () => {
    this.setState(state => {
      const fieldArray = assign([], state.fieldArray);
      fieldArray.pop();

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  pushFields = value => {
    this.setState(state => {
      const fieldArray = assign([], state.fieldArray);
      fieldArray.push(this.createInternalFieldValue(value));

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  removeFields = index => {
    this.setState(state => {
      const fieldArray = assign([], state.fieldArray);
      if (index >= fieldArray.length) {
        throw Error('The index for removeFields is invalid');
      }
      fieldArray.splice(index, 1);

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  removeAllFields = () => {
    this.setState(() => {
      const fieldArray = [];
      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  shiftFields = () => {
    this.setState(state => {
      const fieldArray = assign([], state.fieldArray);
      fieldArray.shift();

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  swapFields = (indexA, indexB) => {
    this.setState(state => {
      const fieldArray = assign([], state.fieldArray);
      const fieldLen = fieldArray.length;
      if (indexA >= fieldLen || indexB >= fieldLen) {
        throw Error('The index to swap in invalid');
      }
      const fieldA = assign({}, fieldArray[indexA]);
      fieldArray[indexA] = fieldArray[indexB];
      fieldArray[indexB] = fieldA;

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  unshiftFields = value => {
    this.setState(state => {
      const fieldArray = assign([], state.fieldArray);
      fieldArray.unshift(this.createInternalFieldValue(value));

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  concatFields = values => {
    this.setState(state => {
      let fieldArray = assign([], state.fieldArray);

      if (!Array.isArray(values)) {
        values = [values];
      }
      fieldArray = fieldArray.concat(values.map(this.createInternalFieldValue));

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  replaceAllFields = values => {
    this.setState(() => {
      if (!Array.isArray(values)) {
        values = [values];
      }

      const fieldArray = values.map(this.createInternalFieldValue);

      this.guardFieldArrayChange(fieldArray);

      return {
        fieldArray,
      };
    });
  };

  getName() {
    return this._name;
  }

  setMutatorAction(action = FieldArrayMutatorAction.Unknown) {
    this._mutatorAction = action;
  }

  getMutatorAction() {
    return this._mutatorAction;
  }

  createInternalFieldValue = value => {
    return {
      _fieldInternalValue: value,
      _fieldInternalKey: this._uniqueKey++,
    };
  };

  getFieldArrayValues() {
    const { fieldArray } = this.state;

    return (fieldArray || []).map(unliftFieldArrayValue);
  }

  getFieldOperations = memoize((name, fieldArray) => ({
    name,
    length: fieldArray.length,
    forEach: this.forEachFields,
    get: this.getField,
    getAll: this.getAllFields,
    map: this.mapFields,
    move: this.moveFields,
    pop: this.popFields,
    push: this.pushFields,
    remove: this.removeFields,
    removeAll: this.removeAllFields,
    shift: this.shiftFields,
    swap: this.swapFields,
    unshift: this.unshiftFields,
    concat: this.concatFields,
    replaceAll: this.replaceAllFields,
  }));

  componentWillUnmount() {
    const { zentForm } = this.context;
    zentForm.detachFromForm(this, { isFieldContainer: true });
  }

  render() {
    const { component: Comp, ...rest } = this.props;
    let passableProps: any = {
      ...rest,
      ref: this.saveWrappedComponent,
      fields: this.getFieldOperations(this._name, this.state.fieldArray),
    };

    // 原生的标签不能传非标准属性进去
    if (typeof Comp === 'string') {
      passableProps = omit(passableProps, unknownProps);
    }

    return (
      <FormContext.Provider value={this.getFormContext(this._name)}>
        <Comp {...passableProps} />
      </FormContext.Provider>
    );
  }
}

export default FieldArray;
