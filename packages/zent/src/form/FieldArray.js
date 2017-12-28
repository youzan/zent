/* eslint-disable no-underscore-dangle */

import { Component, createElement } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import map from 'lodash/map';
import set from 'lodash/set';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { prefixName } from './utils';
import unknownProps from './unknownProps';

class FieldArray extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
      .isRequired
  };

  static defaultProps = {};

  static contextTypes = {
    zentForm: PropTypes.object
  };

  static childContextTypes = {
    zentForm: PropTypes.object.isRequired
  };

  getChildContext() {
    const { zentForm } = this.context;
    return {
      zentForm: {
        ...zentForm,
        prefix: this._name,
        onChangeFieldArray: this.onChangeFieldArray
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    if (!context.zentForm) {
      throw new Error('FieldArray must be in zent-form');
    }

    this.state = {
      fieldArray: []
    };
    this._name = prefixName(context.zentForm, props.name);
    this._uniqueKey = 0;
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

  forEachFields = callback => {
    const { fieldArray } = this.state;
    const fieldArrayValues = get(
      this.context.zentForm.getFormValues(),
      this._name,
      []
    );
    fieldArray.forEach((item, index) => {
      callback(
        `[${index}]`,
        index,
        item._fieldInternalKey,
        fieldArrayValues[index],
        fieldArrayValues
      );
    });
  };

  getField = index => {
    const { fieldArray } = this.state;
    if (index >= fieldArray.length) {
      throw Error('The index for getField is invalid');
    }
    const fieldArrayValues = get(
      this.context.zentForm.getFormValues(),
      this._name,
      []
    );
    return fieldArrayValues[index];
  };

  getAllFields = () => {
    const fieldArrayValues = get(
      this.context.zentForm.getFormValues(),
      this._name,
      []
    );
    return fieldArrayValues;
  };

  mapFields = callback => {
    const { fieldArray } = this.state;
    const fieldArrayValues = get(
      this.context.zentForm.getFormValues(),
      this._name,
      []
    );
    return map(fieldArray, (item, index) => {
      return callback(
        `[${index}]`,
        index,
        item._fieldInternalKey,
        fieldArrayValues[index],
        fieldArrayValues
      );
    });
  };

  moveFields = (fromPos, toPos) => {
    const fieldArray = assign([], this.state.fieldArray);
    const fieldLen = fieldArray.length;
    if (fromPos >= fieldLen || toPos >= fieldLen) {
      throw Error('The index for moveFields is invalid');
    }
    const fieldToMove = fieldArray.splice(fromPos, 1)[0];
    fieldArray.splice(toPos, 0, fieldToMove);
    this.setState({
      fieldArray
    });
  };

  popFields = () => {
    const fieldArray = assign([], this.state.fieldArray);
    fieldArray.pop();
    this.setState({
      fieldArray
    });
  };

  pushFields = value => {
    const fieldArray = assign([], this.state.fieldArray);
    fieldArray.push({
      _fieldInternalValue: value,
      _fieldInternalKey: this._uniqueKey++
    });
    this.setState({
      fieldArray
    });
  };

  removeFields = index => {
    const fieldArray = assign([], this.state.fieldArray);
    if (index >= fieldArray.length) {
      throw Error('The index for removeFields is invalid');
    }
    fieldArray.splice(index, 1);
    this.setState({
      fieldArray
    });
  };

  removeAllFields = () => {
    this.setState({
      fieldArray: []
    });
  };

  shiftFields = () => {
    const fieldArray = assign([], this.state.fieldArray);
    fieldArray.shift();
    this.setState({
      fieldArray
    });
  };

  swapFields = (indexA, indexB) => {
    const fieldArray = assign([], this.state.fieldArray);
    const fieldLen = fieldArray.length;
    if (indexA >= fieldLen || indexB >= fieldLen) {
      throw Error('The index to swap in invalid');
    }
    const fieldA = assign({}, fieldArray[indexA]);
    fieldArray[indexA] = fieldArray[indexB];
    fieldArray[indexB] = fieldA;
    this.setState({
      fieldArray
    });
  };

  unshiftFields = value => {
    const fieldArray = assign([], this.state.fieldArray);
    fieldArray.unshift({
      _fieldInternalValue: value,
      _fieldInternalKey: this._uniqueKey++
    });
    this.setState({
      fieldArray
    });
  };

  render() {
    const { component, ...rest } = this.props;
    const passableProps = {
      ...rest,
      ref: ref => {
        this.wrappedComponent = ref;
      },
      fields: {
        name: this._name,
        length: this.state.fieldArray.length,
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
        unshift: this.unshiftFields
      }
    };

    // 原生的标签不能传非标准属性进去
    if (typeof component === 'string') {
      return createElement(component, {
        ...omit(passableProps, unknownProps)
      });
    }

    return createElement(component, passableProps);
  }
}

export default FieldArray;
