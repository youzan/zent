/* eslint-disable no-underscore-dangle */

import { Component, PureComponent, createElement } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';

import { prefixName } from './utils';
import unknownProps from './unknownProps';

class FieldArray extends (PureComponent || Component) {
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
        getSubFieldArray: this.getSubFieldArray,
        onChangeFieldArray: this.onChangeFieldArray
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    if (!context.zentForm) {
      throw new Error('FieldArray must be in zent-form');
    }
    this._name = prefixName(context.zentForm, props.name);
    if (context.zentForm.getSubFieldArray) {
      console.log('field array constructor');
      console.log(context.zentForm.getSubFieldArray(props.name));
    }
    this.state = {
      // fieldArray: this.props.value || []
      fieldArray: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.context.zentForm.getSubFieldArray) {
      console.log('field array update');
      console.log(this._name);
      console.log(this.context.zentForm.getSubFieldArray(this._name));
    }
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
    // if ('value' in nextProps) {
    //   this.setState({ fieldArray: nextProps.value || []});
    // }
  }

  getSubFieldArray = name => {
    console.log(this.state.fieldArray, this._name, name);
    map(this.state.fieldArray, (value, index) => {
      if (index === name) {
        return value;
      }
    });
  };

  onChangeFieldArray = (name, value) => {
    const fieldArray = assign([], this.state.fieldArray);
    const fieldPath = name.replace(this._name, '');
    const index = fieldPath.match(/\d+(?=\])/)[0];
    const path = fieldPath.split('.');
    if (path.length < 2) {
      fieldArray[index] = value;
    } else {
      fieldArray[index][path[1]] = value;
    }
    this.state = {
      fieldArray
    };
    this.context.zentForm.onChangeFieldArray &&
      this.context.zentForm.onChangeFieldArray(this._name, fieldArray);
  };

  getWrappedComponent = () => {
    return this.wrappedComponent;
  };

  getFieldsIndex = field => {
    return this.state.fieldArray.indexOf(field);
  };

  forEachFields = callback => {
    const { fieldArray } = this.state;
    forEach(fieldArray, (value, index) => {
      console.log(fieldArray);
      callback(`[${index}]`, index, value, fieldArray);
    });
  };

  getField = index => {
    const { fieldArray } = this.state;
    const fieldLen = fieldArray.length;
    if (index >= fieldLen) {
      throw Error('The index for getField is invalid');
    }
    return fieldArray[index];
  };

  getAllFields = () => {
    return this.state.fieldArray;
  };

  insertField = (index, value) => {
    const fieldArray = assign([], this.state.fieldArray);
    const fieldLen = fieldArray.length;
    if (index >= fieldLen) {
      throw Error('The index for insertField is invalid');
    }
    fieldArray.splice(index, 0, value);
    this.setState({
      fieldArray
    });
  };

  mapFields = callback => {
    const { fieldArray } = this.state;
    return map(fieldArray, (value, index) => {
      // console.log(fieldArray, value, index);
      return callback(`[${index}]`, index, value, fieldArray);
    });
  };

  moveFields = (fromPos, toPos) => {
    const fieldArray = assign([], this.state.fieldArray);
    const fieldLen = fieldArray.length;
    if (fromPos >= fieldLen || toPos >= fieldLen) {
      throw Error('The index for moveFields is invalid');
    }
    const fieldToMove = fieldArray.splice(fromPos, 1)[0];
    this.setState({
      fieldArray: fieldArray.splice(toPos + 1, 0, fieldToMove)
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
    fieldArray.push(value);
    this.setState({
      fieldArray
    });
  };

  removeFields = index => {
    const fieldArray = assign([], this.state.fieldArray);
    const fieldLen = fieldArray.length;
    if (index >= fieldLen) {
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
    fieldArray.unshift(value);
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
        forEach: this.forEachFields,
        get: this.getField,
        getAll: this.getAllFields,
        insert: this.insertField,
        length: this.state.fieldArray.length,
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
